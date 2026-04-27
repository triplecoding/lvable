# HeyMariner: Full Frontend + Backend Platform

Professional maritime platform with:
- Next.js App Router frontend
- Unified backend API (`/api/v1`) with MongoDB
- AI-ready chatbot + internal article suggestions
- SEO/AEO/GEO metadata and schema architecture
- Port/harbour pages, FAQ, mariner wiki, and dashboard
- Resend email integration for onboarding

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open: `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1`
- `MONGODB_URI=...`
- `MONGODB_DB=heymariner`
- `RESEND_API_KEY=...`
- `RESEND_FROM_EMAIL=HeyMariner <no-reply@heymariner.com>`

## Unified API (One API)

All frontend requests use one endpoint: `GET/POST /api/v1` with `action`.

### GET actions
- `slides`
- `articles`, `articles_latest`, `article_by_slug&slug=...`
- `pdfs`, `pdfs_featured`, `pdf_by_id&id=...`
- `calculators`
- `ports`, `port_by_slug&slug=...`
- `news`
- `impa_codes` (daily listing target: 150)
- `dashboard`

### POST actions
- `register`
- `login`
- `chat`

## SEO / AEO / GEO Implementation

- Central metadata helper in `lib/seo.ts`
- JSON-LD schema injection via `components/SchemaScript.tsx`
- Auto metadata on homepage, article pages, ports, FAQ, mariner wiki
- FAQ rich schema generated from content
- Article rich schema generated per article
- Internal linking and related articles on article detail pages

## Maritime Content Automation

- Data model supports ports, maritime news, IMPA codes, and chat logs.
- Seed loads initial content from `lib/mockData.ts`.
- IMPA dataset includes 150 records ready for listing and expansion.
- Chatbot persists conversation intent and returns article links after answers.

## Verification & Mariner Wiki

- `/mariner-wiki` provides professional profile cards.
- Backend user schema supports `verified` status and `badge` fields for seaman-book verification workflows.

## Brand / UI

- Mobile-first responsive header/footer/menu
- Maritime visual tone and professional CTA blocks
- Ready for ad slots and enterprise dashboards
