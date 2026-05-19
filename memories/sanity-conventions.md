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

## Hosted Studio deploy

| Change | Action |
|--------|--------|
| Schema or Studio UI | `cd studio-simonask.io && npm run deploy` (not from repo root) |
| Next.js site only | Git push; Vercel deploy — no Studio deploy |

Hosted Studio: `https://simonaskio.sanity.studio` — must be in Sanity **CORS** (see `studio-simonask.io/README.md`).

Site queries (in Next app `src/sanity/queries.ts`):

- `POSTS_QUERY` — all posts with slug, ordered by `publishedAt desc`
- `POST_QUERY` — single post by slug
- `SLUGS_QUERY` — static params for `[slug]`

When adding fields: update schema → GROQ → any components that render the field (e.g. `article-body.tsx`).

## Presentation tool

Configured in `sanity.config.ts`:

- Preview origin: `SANITY_STUDIO_PREVIEW_ORIGIN` (default `http://localhost:3000`)
- Draft mode: `/api/draft-mode/enable` and `/disable` on the Next app
- Allowed origins include localhost, stage.simonask.io, simonask.io

## Publishing

1. **Save** in Studio = draft
2. **Publish** = live dataset + webhook → Next `POST /api/revalidate`
3. Production site does not show drafts unless preview/draft mode is active

## Do / Don't

| Do | Don't |
|----|-------|
| Register new types in `schemaTypes/index.ts` | Commit `.env` or API tokens |
| Keep slug required and sourced from title | Change `_type` name `post` without updating GROQ and webhook handler |
| Run Studio from `studio-simonask.io` | Duplicate Sanity project config inside the Next app (use `env.ts` in each package) |

Webhook handler only special-cases `_type === "post"` for path revalidation; other types revalidate layout root.
