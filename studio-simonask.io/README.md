# simonask.io — Sanity Studio

← [Repo root README](../README.md)

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
| `npm run migration:technologies` | Migrate `projectTag` / `project.tags` → `projectTechnology` / `technologies` |
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
| **Writing → Drafts** | Unpublished posts |
| **Writing → Published** | Live on simonask.io |
| **Writing → All posts** | Full post list |
| **Homepage → Projects** | Project cards on the site home |
| **Homepage → Experience** | CV timeline on the site home |
| **Taxonomies → Technologies** | Reusable tech labels for projects |
| **Taxonomies → Post categories** | Reusable topic labels for posts |
| **Presentation** | Live preview of the website in an iframe |

## Writing workflow

| Step | Action |
|------|--------|
| 1 | **Content → Writing → Drafts → Create** (or open a draft) |
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

- `title`, `slug`, optional `categories` → `postCategory`, optional `excerpt`, `body` (`blockContent`), `image` (cover), `publishedAt`

**Project** — `schemaTypes/projectType.ts`

- `title`, `url`, optional `technologies` → `projectTechnology`, optional `summary`, optional `image` (thumbnail), `publishedAt`

**Technology** (`projectTechnology`) — `schemaTypes/projectTechnologyType.ts`

- `label` only. Maintain under **Taxonomies → Technologies**, then pick on projects.

**Post category** (`postCategory`) — `schemaTypes/postCategoryType.ts`

- `label` only. Maintain under **Taxonomies → Post categories**, then pick on posts.

**Experience** — `schemaTypes/experienceType.ts`

- `title` (organization), `subtitle`, `period`, `href`, `logoAlt`, `logoImage`, `details`, `publishedAt` (sort date)

**Article blocks** (embedded in post body) — `figure`, `callout`, `codeBlock` via `blockContentType.ts`

## Dataset migration (schema renames)

After pulling schema changes that rename types or fields, run on the target dataset **before** `npm run deploy`:

```powershell
cd studio-simonask.io
npm run migration:technologies
```

Migrations (five steps, one command): `rename-project-tags-field` → `clear-project-technology-refs` → `delete-project-tag-documents` → `create-project-technology-documents` → `restore-project-technology-refs`. Converts `project.tags` → `technologies` and `projectTag` → `projectTechnology`. Test on a dev dataset first.

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
