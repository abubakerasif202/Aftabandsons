from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
import ipaddress
import logging
import os
from pathlib import Path
import re
from typing import Literal
from urllib.parse import urlparse
import uuid

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

MONGO_URL = os.getenv("MONGO_URL", "").strip()
DB_NAME = os.getenv("DB_NAME", "").strip()
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.getenv("EMERGENT_EMAIL_KEY", "").strip()
EMAIL_FROM_NAME = os.getenv("EMAIL_FROM_NAME", "Aftab & Sons Transport").strip()
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "").strip()

mongo_client = None
db = None

if MONGO_URL and DB_NAME:
    try:
        mongo_client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        db = mongo_client[DB_NAME]
    except Exception:
        logger.exception("MongoDB configuration could not be initialized")
else:
    logger.warning("MongoDB is not configured; enquiry writes will return 503")

app = FastAPI(title="Aftab & Sons Transport API")
api_router = APIRouter(prefix="/api")

_SHORTENERS = (
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "is.gd",
    "cutt.ly",
    "goo.gl",
    "rebrand.ly",
)
_CRED_ASK = (
    "reply with your password",
    "reply with the code",
    "send your password",
    "cvv",
    "send us your password",
    "enter your password below",
    "confirm your card number",
    "your full card number",
    "seed phrase",
    "recovery phrase",
    "verify your card",
    "social security number",
    "confirm your bank details",
)
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False

    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass

    return not any(host == shortener or host.endswith("." + shortener) for shortener in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = set()
        self.urls = []
        self.anchors = []
        self._href = None
        self._text = []

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        self.tags.add(tag)
        self.urls += [
            value
            for key, value in attrs
            if key.lower() in ("href", "src") and value
        ]

        if tag == "a":
            self._href = dict((key.lower(), value) for key, value in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href = None
            self._text = []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)

    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields are allowed in email")

    body = f"{subject}\n{html}".lower()
    for phrase in _CRED_ASK:
        if phrase in body:
            raise ValueError("Email content asks the recipient for sensitive credentials")

    for url in scan.urls:
        normalized = url.strip().lower()

        if normalized.startswith(("mailto:", "tel:", "cid:", "#")):
            continue

        if not normalized.startswith("https://"):
            raise ValueError("Email links and assets must use absolute HTTPS URLs")

        parsed = urlparse(normalized)
        host = parsed.hostname or ""

        if not _host_ok(host) or parsed.username is not None:
            raise ValueError("Email contains a shortened, numeric or credential-bearing URL")

    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue

        for match in _HOSTISH.finditer(text):
            if not _same_site(match.group(1).lower(), real):
                raise ValueError("Visible link host does not match the destination host")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    if not EMAIL_KEY:
        raise RuntimeError("Email integration is not configured")

    _assert_safe_email(subject, html)

    payload = {
        "to": [to],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }

    async with httpx.AsyncClient(timeout=30) as client_http:
        response = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )

    response.raise_for_status()
    return response.json().get("id")


ServiceName = Literal[
    "Truck Transport",
    "B-Double Freight",
    "Local Deliveries",
    "Interstate Freight",
    "Other / Not Sure",
]


class EnquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    service: ServiceName
    message: str = Field(min_length=10, max_length=4000)
    website: str = Field(default="", max_length=0)


def _database():
    if db is None:
        raise HTTPException(status_code=503, detail="Enquiry service is temporarily unavailable")
    return db


@api_router.get("/")
async def root():
    return {"message": "Aftab & Sons Transport API"}


@api_router.get("/health", include_in_schema=False)
async def health():
    database = _database()

    try:
        await database.command("ping")
    except Exception as exc:
        logger.error("Database health check failed: %s", type(exc).__name__)
        raise HTTPException(status_code=503, detail="Database unavailable") from exc

    return {"status": "ok"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(input: EnquiryCreate):
    database = _database()

    doc = {
        "id": str(uuid.uuid4()),
        "name": input.name,
        "email": str(input.email).lower(),
        "phone": input.phone or "",
        "service": input.service,
        "message": input.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    try:
        await database.enquiries.insert_one(doc)
    except Exception as exc:
        logger.error("Enquiry persistence failed: %s", type(exc).__name__)
        raise HTTPException(
            status_code=503,
            detail="Enquiry service is temporarily unavailable",
        ) from exc

    if OWNER_EMAIL and EMAIL_KEY:
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
            "</table>"
            '<p style="margin:16px 0 4px"><strong>Message</strong></p>'
            f'<p style="margin:0;white-space:pre-line">{escape(doc["message"])}</p>'
            f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by the '
            f'{escape(EMAIL_FROM_NAME)} website enquiry form.</p>'
            "</td></tr></table>"
        )

        try:
            await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        except Exception:
            logger.exception("Enquiry email failed for enquiry %s", doc["id"])

    return {"status": "received", "id": doc["id"]}


app.include_router(api_router)

cors_raw = os.getenv("CORS_ORIGINS", "").strip()
cors_origins = [origin.strip().rstrip("/") for origin in cors_raw.split(",") if origin.strip()]

if cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=False,
        allow_origins=cors_origins,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type"],
    )


@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers.setdefault("Cache-Control", "no-store")
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    return response


@app.on_event("shutdown")
async def shutdown_db_client():
    if mongo_client is not None:
        mongo_client.close()
