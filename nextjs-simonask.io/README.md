# simonask.io — Website

← [Repo root README](../README.md)

Next.js site for [simonask.io](https://simonask.io). Content is loaded from Sanity — configure project ID and dataset via environment variables (see below).

| Environment | URL | Git branch |
|-------------|-----|------------|
| Production | [simonask.io](https://simonask.io) | `main` |
| Staging | [stage.simonask.io](https://stage.simonask.io) | `staging` |

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from [sanity.io/manage](https://www.sanity.io/manage) → Project settings
- `NEXT_PUBLIC_SANITY_DATASET` — usually `production`

For **draft preview** locally, also set:

- `SANITY_API_READ_TOKEN` — Viewer token from [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens
- `NEXT_PUBLIC_SITE_ENV=staging` — show drafts and staging banner
- `SANITY_REVALIDATE_SECRET` — any random string (matches Sanity webhook)
- `NEXT_PUBLIC_SANITY_STUDIO_URL` — `http://localhost:3333` (or deployed studio URL)

For the **contact form**, also set `RESEND_API_KEY` (see `.env.example`). Without it, the form returns “not configured yet.”

**Never commit** `.env.local`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Content and preview

- **Production** reads **published** posts only (no Viewer token on Vercel Production).
- **Staging** reads **drafts + published** when `SANITY_API_READ_TOKEN` and `NEXT_PUBLIC_SITE_ENV=staging` are set on the Preview / `staging` deployment.
- **Publish** in Sanity triggers `POST /api/revalidate` (webhook) to refresh pages within seconds.

## Deploy on Vercel

1. Connect the repository; set **Root Directory** to `nextjs-simonask.io`.
2. **Production** (`main`): `simonask.io`, `www.simonask.io`
3. **Preview** (`staging`): `stage.simonask.io`

### Environment variables (Vercel)

| Variable | Production | Preview (`staging`) |
|----------|:----------:|:-------------------:|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✓ | ✓ |
| `NEXT_PUBLIC_SANITY_DATASET` | ✓ | ✓ |
| `SANITY_API_READ_TOKEN` | — | Viewer token |
| `NEXT_PUBLIC_SITE_ENV` | — | `staging` |
| `NEXT_PUBLIC_GTM_WEB_CONTAINER_ID` | ✓ | ✓ (`GTM-KR894J8P`) |
| `SANITY_REVALIDATE_SECRET` | ✓ | ✓ |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | optional | optional |
| `RESEND_API_KEY` | ✓ | ✓ |
| `CONTACT_FROM_EMAIL` | optional (`hello@mail.simonask.io`) | optional |

Redeploy after changing env vars.

### Sanity webhook

- **URL:** `https://simonask.io/api/revalidate`
- **Filter:** `_type == "post"`
- **Secret:** same as `SANITY_REVALIDATE_SECRET`

## API routes

| Route | Purpose |
|-------|---------|
| `/api/draft-mode/enable` | Presentation tool / draft preview |
| `/api/draft-mode/disable` | Exit draft preview |
| `/api/revalidate` | Sanity webhook — refresh cached pages |
| `/api/contact` | Contact form — sends mail via Resend to `hello@simonask.io` |

## Project layout

```
src/
  app/
    page.tsx              # Home (projects, writing, experience, education)
    [slug]/page.tsx       # Article pages
    layout.tsx            # Shell: header, footer, fonts, staging banner
    globals.css           # Design tokens + article typography
    api/draft-mode/       # Draft preview (Presentation)
    api/revalidate/       # Webhook handler
    api/contact/          # Contact form (Resend)
  components/             # site-header/footer, post-list, project-list, contact-aside, etc.
  lib/
    contact.ts            # Public email / phone
    profile.ts            # Education copy; experience types
    experience.ts         # Sanity experience → profile timeline
    sections.ts           # Home section ids + hash links
    format.ts             # Dates
    scroll-to-section.ts  # Hash navigation helper
  sanity/
    client.ts             # Sanity client
    load.ts               # Draft-aware fetch helper
    queries.ts            # GROQ queries
    env.ts                # Project config + staging flag
    image.ts              # Image URL builder
```

## Contact

Public email and phone: `src/lib/contact.ts`.

Contact form on the home page uses [Resend](https://resend.com). Set `RESEND_API_KEY` and verify your sending domain (`mail.simonask.io`); see `.env.example` (`CONTACT_FROM_EMAIL` defaults to `hello@mail.simonask.io`).
