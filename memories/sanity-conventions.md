# Sanity conventions

Read when: schema, Studio config, GROQ, Presentation preview, or publish/revalidate behavior.

## File map

| Area | Path |
|------|------|
| Config | `sanity.config.ts` |
| Schema types | `schemaTypes/` |
| Desk structure | `structure.ts` |
| Presentation routes | `presentation/resolve.ts` |
| Env | `env.ts` |

## Post document (`post`)

Fields: `title`, `slug`, `body` (`blockContent`), `image` (cover — list/social only), `publishedAt`. Studio groups: **Article** / **Publishing**.

**Article body** — structured blocks (not shortcodes): use **⋯** insert menu or `@selvklart/sanity-block-selector` picker on the field. Types: text (normal, H2, H3, quote), **Image** (`figure`), **Callout**, **Code** (`codeBlock`). Do not type `/callout` in prose. Schema: `blockContentType.ts`, `blockContentInput.ts`, `blocks/`. Site: `article-body.tsx`.

## Project document (`project`)

Fields: `title`, `url` (external link), optional `summary`, optional `image` (homepage thumbnail, 1:1, hotspot), `publishedAt` (ordering). Studio: **Details** group. Listed on site home (`/#projects`); Presentation resolves to `/#projects`.

## Hosted Studio deploy

User phrase: **Deploy Sanity** → `memories/deploy-sanity.md`.

| Change | Action |
|--------|--------|
| Schema or Studio UI | `cd studio-simonask.io && npm run deploy` (not from repo root) |
| Next.js site only | Git push; Vercel deploy — no Studio deploy |

Hosted Studio: `https://simonask.sanity.studio` — must be in Sanity **CORS** (see `studio-simonask.io/README.md`).

Site queries (in Next app `src/sanity/queries.ts`):

- `POSTS_QUERY` — all posts with slug, ordered by `publishedAt desc`
- `POST_QUERY` — single post by slug
- `SLUGS_QUERY` — static params for `[slug]`
- `PROJECTS_QUERY` — all projects with `url`, ordered by `publishedAt desc` (homepage)

When adding fields: update schema → GROQ → any components that render the field (e.g. `article-body.tsx`).

## Presentation tool

Configured in `sanity.config.ts`:

- Preview origin: `SANITY_STUDIO_PREVIEW_ORIGIN` (default `http://localhost:3000`)
- Draft mode: `/api/draft-mode/enable` and `/disable` on the Next app
- Allowed origins include localhost, stage.simonask.io, simonask.io

Next app (required for Studio iframe connection):

- `layout.tsx` mounts `VisualEditing` from `next-sanity/visual-editing` when Draft Mode is on
- `client.ts` sets `stega.studioUrl` (`NEXT_PUBLIC_SANITY_STUDIO_URL`); preview fetches use token + stega via `load.ts`
- `SANITY_API_READ_TOKEN` (Viewer) must be set in `nextjs-simonask.io/.env.local`
- Sanity CORS: `http://localhost:3000` with **Allow credentials** (and deployed site URLs for prod)

## Publishing

1. **Save** in Studio = draft
2. **Publish** = live dataset + webhook → Next `POST /api/revalidate`
3. Production site does not show drafts unless preview/draft mode is active

## Do / Don't

| Do | Don't |
|----|-------|
| Register new types in `schemaTypes/index.ts` | Commit `.env` or API tokens |
| Keep slug required and sourced from title on `post` | Change `_type` name `post` or `project` without updating GROQ and webhook handler |
| Run Studio from `studio-simonask.io` | Duplicate Sanity project config inside the Next app (use `env.ts` in each package) |

Webhook handler special-cases `_type === "post"` (home + slug path) and `_type === "project"` (home); other types revalidate layout root.
