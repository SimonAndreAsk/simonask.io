# simonask.io — Sanity Studio

Content studio for the simonask.io blog.

Project ID and dataset are set in `.env.local` (see `.env.example`). Use the same project ID as the Next.js app.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

For **local dev**, copy `.env.example` → `.env.local` (optional — defaults live in `studioEnv.ts`).

**Hosted deploy** (`npm run deploy`) bakes env at build time; `studioEnv.ts` supplies public project ID/dataset if no `.env` file is present.

Open [http://localhost:3333](http://localhost:3333).

Optional: `SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000` (or `https://stage.simonask.io` for staging preview).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local studio |
| `npm run build` | Production build |
| `npm run deploy` | Host studio on `*.sanity.studio` (run from **this folder**, not repo root) |
| `npm run start` | Serve production build |

### Deploy hosted Studio

This package is **not** at the monorepo root. From PowerShell:

```powershell
cd studio-simonask.io
npm run deploy
```

- **Schema or Studio UI changed** → `npm run deploy` (updates `*.sanity.studio`)
- **Next.js site only** → push `main` / `staging` (Vercel); no Studio deploy needed

## Studio navigation

| Section | Purpose |
|---------|---------|
| **Drafts** | Unpublished posts |
| **Published** | Live on simonask.io |
| **All posts** | Full list |
| **Presentation** | Live preview of the website in an iframe |

## Writing workflow

| Step | Action |
|------|--------|
| 1 | **Content → Drafts → Create** (or open a draft) |
| 2 | **Article** group: title, slug, then write in **Article** body |
| 3 | In **Article**: click **⋯** on a text line (or use the block picker) → choose **Image**, **Callout**, or **Code** — not `/callout` in the text (Sanity has no shortcodes) |
| 4 | **Presentation** tab — preview on the site while editing (draft mode on the Next app) |
| 5 | **Publishing** group: **Cover image** (card/social only), **Published at** |
| 6 | Check **stage.simonask.io** for draft visibility (staging deployment only) |
| 7 | **Publish** — post appears on **simonask.io** (webhook revalidates the site) |

**Cover vs in-article images:** **Cover image** is for the post list and social preview. Photos inside the article use **Image** blocks in the body (not the cover field).

Unpublished drafts do **not** appear on production.

## Content model

**Post** — `schemaTypes/postType.ts`

- `title`, `slug`, `body` (`blockContent`), `image` (cover), `publishedAt`

## CORS

In [sanity.io/manage](https://www.sanity.io/manage) → API → **CORS origins**, allow with **credentials**:

- `http://localhost:3000`
- `http://localhost:3333`
- `https://simonask.io`
- `https://www.simonask.io`
- `https://stage.simonask.io`
- `https://simonask.sanity.studio` (hosted Studio — use this URL; run `npm run deploy` from this folder after schema changes)

Do not use `simonaskio.sanity.studio` (created by mistake during an early deploy; you can remove it in [sanity.io/manage](https://www.sanity.io/manage) → Studios).

## Presentation tool

Configured in `sanity.config.ts` with:

- `structure.ts` — desk structure (Drafts / Published)
- `presentation/resolve.ts` — maps posts to `/{slug}` and home to `/`
- Preview enable URL: `/api/draft-mode/enable` on the Next.js site

## Related docs

- Repo root `README.md` — overview
- `nextjs-simonask.io/README.md` — env vars, Vercel, webhooks
