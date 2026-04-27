# DC PDF Editor (A→Z SaaS Starter)

A production-ready starter architecture for an AI-first PDF web platform with responsive frontend, SEO/legal page content, ad placement zones, and Python APIs for auth + AI/PDF processing.

## What is implemented now

- FastAPI backend with JWT email/password auth.
- OAuth provider stubs for Google, Facebook, and Apple login.
- AI endpoints (chat, summarize, rewrite) with OpenAI integration and local fallback logic.
- PDF text extraction endpoint (using pdfplumber).
- Contact email API via Resend: `POST /api/contact/send`.
- Responsive animated pages with colorful UI.
- SEO foundations: canonical links, OpenGraph, JSON-LD schema (Organization + geo), Search Console and Bing verification tags.
- Legal pages: privacy policy, terms, cookie policy, disclaimer, refund policy.
- Google Ads placeholders + API-based ad click/download event tracking.
- Integrations page for GTM/GA/Search Console/Bing setup.
- Deploy-ready Vercel serverless entrypoint + GitHub Actions deploy workflow.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

- Home: http://127.0.0.1:8000/
- SEO Article: http://127.0.0.1:8000/articles/pdf-ai-seo-guide
- Integrations: http://127.0.0.1:8000/integrations
- Legal: `/legal/*`
- Healthcheck: `/health`

## Deploy from GitHub

See `DEPLOYMENT.md` for complete Vercel + Neon + Resend setup.

Required environment variables are listed in `.env.example`.

## Suggested next build phases

1. Real OAuth flow via Authlib callbacks.
2. Document storage with S3/R2 and signed URLs.
3. WebSocket collaboration and inline comments.
4. E-sign workflow + audit trails.
5. OCR pipeline (Tesseract/Textract), table extraction, and conversion microservices.
6. Team billing and entitlement gates.
