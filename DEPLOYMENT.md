# Deployment Guide (GitHub → Vercel + Neon + Resend)

## Common Vercel 500 Crash Causes (and fixes)

1. **Missing `email-validator`** while using `EmailStr` in Pydantic schemas.
   - Fixed in `requirements.txt`.
2. **Invalid default `DATABASE_URL`** causing startup crashes.
   - App now defaults to SQLite and avoids forced DB migrations on startup.
3. **Startup migration failure** in serverless runtime.
   - Controlled by `RUN_MIGRATIONS_ON_STARTUP` (default: `false`).

## 1) Neon PostgreSQL
1. Create a Neon project and copy the pooled connection string.
2. Set `DATABASE_URL` in Vercel Project Environment Variables.
3. Ensure `sslmode=require` is included in the URL.

## 2) Resend Email
1. Create a Resend API key.
2. Verify your sending domain in Resend.
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `SUPPORT_EMAIL` in Vercel env vars.

## 3) Vercel Setup
1. Import this GitHub repository in Vercel.
2. Framework preset: **Other** (Python serverless).
3. Confirm `vercel.json` routes all traffic to `api/index.py`.
4. Set all variables from `.env.example` in Vercel.

## 4) GitHub Auto Deploy
1. Add repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
2. Push to `main` to trigger `.github/workflows/vercel-deploy.yml`.

## 5) Verify
- `GET /health` should return `{"status":"ok"...}`
- `GET /ads.txt` should return publisher line.
- `POST /api/contact/send` should return `status: sent` when Resend is configured.
