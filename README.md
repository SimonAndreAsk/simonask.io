# simonask.io

Monorepo: **website** (Next.js), **cms** (Sanity Studio), **analytics** (dataLayer contracts).

| Folder | Purpose |
|--------|---------|
| [`website/`](./website/) | Public site — `npm run dev` → http://localhost:3000 |
| [`cms/`](./cms/) | Content studio — `npm run dev` → http://localhost:3333 |
| [`analytics/contracts/`](./analytics/contracts/) | JSON schemas ([Analytics repo](https://github.com/SimonAndreAsk/Analytics)) |

## Setup

```bash
cd website && npm install && cp .env.example .env.local && npm run dev
cd cms && npm install && cp .env.example .env.local && npm run dev
```

Copy `.env.example` → `.env.local` in each app. Do not commit secrets.

## Deploy

- **Vercel** — Root Directory: `website`
- **Studio** — `cd cms && npm run deploy`

Tracking implementation: `website/src/lib/tracking/datalayer.ts` — keep aligned with `analytics/contracts/dataLayer/`.

## Code layout

```text
website/src/
  app/                 routes, API, global CSS
  components/
    layout/            shell, consent, GTM
    home/              homepage sections and lists
    article/           post body, TOC, mermaid
    contact/           form and contact links
    shared/            icons, pills, section links
  lib/
    sanity/            GROQ, fetch, images
    tracking/          datalayer, cookie consent
    article/           heading helpers, mermaid theme
    …                  contact, format, profile, sections, …

cms/
  config/              project env (env.ts, studioEnv.ts)
  schemaTypes/
    documents/         post, project, experience, …
    objects/           block content (portable text)
    blocks/            figure, callout, code, mermaid
  presentation/        preview URL resolution
  migrations/          one-off Sanity migrations
  structure.ts         desk sidebar
  sanity.config.ts     Studio entry

analytics/
  contracts/
    dataLayer/         event JSON schemas
```
