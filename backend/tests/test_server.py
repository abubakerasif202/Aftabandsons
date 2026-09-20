import pytest
from pydantic import ValidationError

from server import EnquiryCreate, _assert_safe_email


def valid_enquiry(**overrides):
    data = {
        "name": "Business Customer",
        "email": "customer@example.com",
        "phone": "+61 400 000 000",
        "service": "B-Double Freight",
        "message": "Palletised freight from Sydney to Melbourne.",
        "website": "",
    }
    data.update(overrides)
    return data


def test_enquiry_accepts_supported_service():
    enquiry = EnquiryCreate(**valid_enquiry())
    assert enquiry.service == "B-Double Freight"
    assert enquiry.email == "customer@example.com"


def test_enquiry_rejects_unknown_service():
    with pytest.raises(ValidationError):
        EnquiryCreate(**valid_enquiry(service="Guaranteed Same Day"))


def test_enquiry_rejects_bot_honeypot():
    with pytest.raises(ValidationError):
        EnquiryCreate(**valid_enquiry(website="https://spam.example"))


def test_enquiry_strips_surrounding_whitespace():
    enquiry = EnquiryCreate(
        **valid_enquiry(
            name="  Business Customer  ",
            email="  customer@example.com  ",
            message="  Palletised freight from Sydney to Melbourne.  ",
        )
    )
    assert enquiry.name == "Business Customer"
    assert enquiry.message == "Palletised freight from Sydney to Melbourne."


def test_email_guard_allows_normal_https_link():
    _assert_safe_email(
        "Quote received",
        '<p>Thanks.</p><a href="https://aftabandsons.com.au/contact">Contact us</a>',
    )


@pytest.mark.parametrize(
    "html",
    [
        '<a href="http://example.com">example.com</a>',
        '<a href="https://bit.ly/example">Open link</a>',
        '<form><input name="password"></form>',
        '<a href="https://safe.example">evil.example</a>',
    ],
)
def test_email_guard_rejects_unsafe_markup(html):
    with pytest.raises(ValueError):
        _assert_safe_email("Quote", html)


def test_email_guard_rejects_credential_request():
    with pytest.raises(ValueError):
        _assert_safe_email("Security", "<p>Reply with your password</p>")
