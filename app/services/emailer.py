import httpx

from app.config import settings


async def send_support_email(name: str, email: str, message: str) -> dict:
    if not settings.resend_api_key:
        return {
            "status": "skipped",
            "message": "RESEND_API_KEY is not configured.",
        }

    payload = {
        "from": settings.resend_from_email,
        "to": [settings.support_email],
        "subject": f"New contact request from {name}",
        "html": f"<p><b>Name:</b> {name}</p><p><b>Email:</b> {email}</p><p>{message}</p>",
        "reply_to": email,
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.resend_api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
        )

    if response.status_code >= 400:
        return {"status": "error", "detail": response.text}
    return {"status": "sent", "provider_response": response.json()}
