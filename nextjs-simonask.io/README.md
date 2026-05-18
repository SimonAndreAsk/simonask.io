# simonask.io — Website

Next.js blog for [simonask.io](https://simonask.io). Content is loaded from Sanity (project `au2uzesy`, dataset `production`).

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

For **draft preview** locally, set in `.env.local`:

- `SANITY_API_READ_TOKEN` — Viewer token from [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens
- `NEXT_PUBLIC_SITE_ENV=staging` — show drafts and staging banner
- `SANITY_REVALIDATE_SECRET` — any random string (matches Sanity webhook)
- `NEXT_PUBLIC_SANITY_STUDIO_URL` — `http://localhost:3333` (or deployed studio URL)

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
| `SANITY_API_READ_TOKEN` | — | Viewer token |
| `NEXT_PUBLIC_SITE_ENV` | — | `staging` |
| `SANITY_REVALIDATE_SECRET` | ✓ | ✓ |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | optional | optional |

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

## Project layout

```
src/
  app/
    page.tsx              # Home + article list
    [slug]/page.tsx       # Article pages
    api/draft-mode/       # Draft preview
    api/revalidate/       # Webhook handler
  components/             # Header, footer, post list, theme, etc.
  lib/                    # Contact email, date formatting
  sanity/
    client.ts             # Sanity client
    load.ts               # Draft-aware fetch helper
    queries.ts            # GROQ queries
    env.ts                # Project config + staging flag
```

## Contact

Public email: `hello@simonask.io` — defined in `src/lib/contact.ts`.
