from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone

import httpx
from pydantic import BaseModel, EmailStr, Field

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Emergent managed email (Resend proxy). EMAIL_BASE_URL is a constant on purpose.
# ---------------------------------------------------------------------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]  # this app's OWN brand (G1)
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")      # server-side recipient only (G4)

# ------------------------- guardrail gate (G2/G3) --------------------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    async with httpx.AsyncClient(timeout=30) as client_http:
        resp = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# ------------------------------- enquiries ---------------------------------
class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    service: str = Field(min_length=2, max_length=80)
    message: str = Field(min_length=10, max_length=4000)


@api_router.get("/")
async def root():
    return {"message": "Aftab & Sons Transport API"}


@api_router.post("/enquiries")
async def create_enquiry(input: EnquiryCreate):
    """Public quote/enquiry form. Stores the enquiry, then emails the owner.
    Recipient, subject and body are server-side only (G4); caller fields are escaped."""
    doc = {
        "id": str(uuid.uuid4()),
        "name": input.name.strip(),
        "email": input.email.strip().lower(),
        "phone": (input.phone or "").strip(),
        "service": input.service.strip(),
        "message": input.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.enquiries.insert_one(doc)

    email_sent = False
    if OWNER_EMAIL:
        subject = "New Quote Request - Aftab & Sons Transport"
        html = (
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            '<tr><td style="padding:24px;font-family:Arial,sans-serif;color:#111">'
            '<h2 style="margin:0 0 16px;color:#C81010">New Quote Request</h2>'
            '<table role="presentation" cellpadding="6" cellspacing="0" style="font-size:14px">'
            f'<tr><td><strong>Name</strong></td><td>{escape(doc["name"])}</td></tr>'
            f'<tr><td><strong>Email</strong></td><td>{escape(doc["email"])}</td></tr>'
            f'<tr><td><strong>Phone</strong></td><td>{escape(doc["phone"]) or "-"}</td></tr>'
            f'<tr><td><strong>Service</strong></td><td>{escape(doc["service"])}</td></tr>'
            '</table>'
            f'<p style="margin:16px 0 4px"><strong>Message</strong></p>'
            f'<p style="margin:0;white-space:pre-line">{escape(doc["message"])}</p>'
            f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by the '
            f'{escape(EMAIL_FROM_NAME)} website enquiry form.</p>'
            '</td></tr></table>'
        )
        try:
            await send_email(to=OWNER_EMAIL, subject=subject, html=html)
            email_sent = True
        except Exception as e:  # enquiry is safely stored; never lose it over email
            logger.error(f"Enquiry email failed: {e}")

    return {"status": "received", "id": doc["id"], "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
