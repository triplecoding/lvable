# HeyMariner: Vercel + Neon Ready Platform

This project supports two database modes:
1. **Neon Postgres (recommended for Vercel production)** via `DATABASE_URL`
2. **Mongo fallback** for local/testing if `DATABASE_URL` is not set

---

## Activate site on Vercel with GitHub + Neon (full checklist)

### 1) Prepare GitHub repository
- Push this codebase to your GitHub repository.
- Confirm the root contains: `package.json` and `app/` (this repo also ships `pages/health.tsx` compatibility route).

### 2) Create Neon database
- Sign in to [neon.com](https://neon.com)
- Create project + database
- Copy connection string (`postgresql://...sslmode=require`)

### 3) Import project in Vercel
- In [vercel.com](https://vercel.com), click **Add New Project**
- Import your GitHub repo
- Framework preset: **Next.js**
- **Important:** Project Root Directory must be `.` (repo root)

### 4) Add Environment Variables in Vercel
Set in **Project → Settings → Environment Variables**:
- `DATABASE_URL` = your Neon connection string
- `NEXT_PUBLIC_API_BASE_URL` = `https://<your-domain>/api/v1`
- `RESEND_API_KEY` (optional for emails)
- `RESEND_FROM_EMAIL` (optional)

> Keep `MONGODB_URI` unset in Vercel if you want pure Neon mode.

### 5) Deploy
- Click **Deploy**.
- First request auto-creates tables and seeds content into Neon.

### 6) Verify live endpoints
After deploy, test:
- `https://<your-domain>/api/v1?action=slides`
- `https://<your-domain>/api/v1?action=articles_latest`
- `https://<your-domain>/api/v1?action=ports`

If these return JSON, site is activated.

---

## Fix for "Couldn't find any `pages` or `app` directory"

If Vercel shows this error:
- Ensure Vercel **Root Directory** is `.` and not a subfolder.
- Confirm repository has `app/` in root.
- This repo includes a non-conflicting `pages/health.tsx` compatibility route (no `/` route conflict with App Router).
- Ensure the deployed branch is the one with latest commits.

---

## Local Development

```bash
cp .env.example .env.local
npm install
npm run dev
```

For local Neon mode, set `DATABASE_URL` in `.env.local`.
For Mongo mode, leave `DATABASE_URL` empty and set `MONGODB_URI`.

---

## Unified API (One API)
All frontend requests use `GET/POST /api/v1` with `action`.

GET actions:
- `slides`
- `articles`, `articles_latest`, `article_by_slug&slug=...`
- `pdfs`, `pdfs_featured`, `pdf_by_id&id=...`
- `calculators`
- `ports`, `port_by_slug&slug=...`
- `news`
- `impa_codes` (150 listing)
- `dashboard`

POST actions:
- `register`
- `login`
- `chat`

---

## SEO / AEO / GEO
- Metadata helper: `lib/seo.ts`
- JSON-LD component: `components/SchemaScript.tsx`
- FAQ schema + article schema
- `app/sitemap.ts` and `app/robots.ts`
