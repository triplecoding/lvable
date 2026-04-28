import logging
from pathlib import Path

from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlmodel import Session, select

from app.auth import create_access_token, hash_password, verify_password
from app.config import settings
from app.database import create_db_and_tables, get_session
from app.models import AdEvent, User
from app.schemas import (
    AIChatRequest,
    AIRewriteRequest,
    AdEventRequest,
    ContactEmailRequest,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from app.services.ai_engine import ai_engine
from app.services.emailer import send_support_email
from app.services.pdf_tools import extract_text

app = FastAPI(title="DC PDF Editor")
logger = logging.getLogger(__name__)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))


def render_template(request: Request, template_name: str, title: str, **kwargs):
    base_context = {
        "request": request,
        "title": title,
        "app_name": settings.app_name,
        "site_url": settings.site_url,
        "company_name": settings.company_name,
        "support_email": settings.support_email,
        "gtm_id": settings.gtm_id,
        "ga_measurement_id": settings.ga_measurement_id,
        "google_site_verification": settings.google_site_verification,
        "bing_site_verification": settings.bing_site_verification,
    }
    base_context.update(kwargs)
    return templates.TemplateResponse(template_name, base_context)


@app.on_event("startup")
def startup() -> None:
    if not settings.run_migrations_on_startup:
        return
    try:
        create_db_and_tables()
    except Exception as exc:  # pragma: no cover
        logger.exception("Database startup migration failed: %s", exc)




@app.get("/health")
def healthcheck():
    return {"status": "ok", "service": "dc-pdf-editor"}

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return render_template(request, "index.html", "DC PDF Editor - AI PDF Platform")


@app.get("/articles/pdf-ai-seo-guide", response_class=HTMLResponse)
def article(request: Request):
    return render_template(request, "article.html", "How AI PDF Tools Improve Team Productivity")


@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    return render_template(request, "dashboard.html", "Dashboard")


@app.get("/legal/privacy-policy", response_class=HTMLResponse)
def privacy_policy(request: Request):
    return render_template(request, "legal_privacy.html", "Privacy Policy")


@app.get("/legal/terms-and-conditions", response_class=HTMLResponse)
def terms_and_conditions(request: Request):
    return render_template(request, "legal_terms.html", "Terms and Conditions")


@app.get("/legal/cookie-policy", response_class=HTMLResponse)
def cookie_policy(request: Request):
    return render_template(request, "legal_cookie.html", "Cookie Policy")


@app.get("/legal/disclaimer", response_class=HTMLResponse)
def disclaimer(request: Request):
    return render_template(request, "legal_disclaimer.html", "Disclaimer")


@app.get("/legal/refund-policy", response_class=HTMLResponse)
def refund_policy(request: Request):
    return render_template(request, "legal_refund.html", "Refund Policy")


@app.get("/integrations", response_class=HTMLResponse)
def integrations(request: Request):
    return render_template(request, "integrations.html", "Integrations & Tracking")


@app.get("/ads.txt", response_class=PlainTextResponse)
def ads_txt():
    return "google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"


@app.post("/api/auth/register", response_model=TokenResponse)
def register(payload: RegisterRequest, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already in use")
    user = User(email=payload.email, full_name=payload.full_name, password_hash=hash_password(payload.password))
    session.add(user)
    session.commit()
    token = create_access_token(payload.email)
    return TokenResponse(access_token=token)


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == payload.email)).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(user.email)
    return TokenResponse(access_token=token)


@app.get("/api/auth/oauth/{provider}")
def oauth_start(provider: str):
    if provider not in {"google", "facebook", "apple"}:
        raise HTTPException(status_code=404, detail="Provider not supported")
    return {
        "provider": provider,
        "status": "stub",
        "message": "Wire this endpoint to Authlib OAuth flow with provider credentials in .env",
    }


@app.post("/api/ai/chat")
def ai_chat(payload: AIChatRequest, _: str = Depends(oauth2_scheme)):
    return {"answer": ai_engine.chat_with_pdf(payload.prompt, payload.pdf_text)}


@app.post("/api/ai/summarize")
def ai_summarize(pdf_text: str = Form(...), _: str = Depends(oauth2_scheme)):
    return {"summary": ai_engine.summarize(pdf_text)}


@app.post("/api/ai/rewrite")
def ai_rewrite(payload: AIRewriteRequest, _: str = Depends(oauth2_scheme)):
    return {"rewritten": ai_engine.rewrite(payload.text, payload.mode)}


@app.post("/api/pdf/extract-text")
async def pdf_extract_text(file: UploadFile = File(...), _: str = Depends(oauth2_scheme)):
    data = await file.read()
    return {"text": extract_text(data)}


@app.post("/api/analytics/ad-event")
def track_ad_event(payload: AdEventRequest, session: Session = Depends(get_session)):
    event = AdEvent(placement=payload.placement, action=payload.action, source_page=payload.source_page)
    session.add(event)
    session.commit()
    return {"status": "ok"}


@app.post("/api/contact/send")
async def send_contact_email(payload: ContactEmailRequest):
    return await send_support_email(payload.name, payload.email, payload.message)
