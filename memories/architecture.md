# Architecture

Read when: cross-app changes, deploy, environment, draft preview, or caching.

## Flow

```
Sanity Studio (studio-simonask.io)
    → publish / draft
    → Sanity CDN API
    → nextjs-simonask.io (sanityFetch / getSanityClient)
    → Vercel (Next.js)
```

On publish, Sanity webhook hits `nextjs-simonask.io/src/app/api/revalidate/route.ts` → `revalidatePath` for `/` and `/{slug}`.

## Environments

| | Git branch | Site URL | Draft posts |
|---|------------|----------|-------------|
| Production | `main` | simonask.io | No |
| Staging | `staging` | stage.simonask.io | Yes (with viewer token) |

Staging is detected via `NEXT_PUBLIC_SITE_ENV=staging` in `src/sanity/env.ts` (`isStagingSite`).

## Key env vars (names only — values in `.env.example`)

**Next app:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (preview), `NEXT_PUBLIC_SITE_ENV`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SANITY_STUDIO_URL`

**Studio:** `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_PREVIEW_ORIGIN`

## Preview paths

1. **Local:** Studio Presentation → Next draft-mode API routes
2. **Staging site:** `isStagingSite` + read token → preview client in `load.ts`
3. **Production:** published content only (no viewer token on Vercel Production)

## Deploy

- **Vercel:** repo root directory = `nextjs-simonask.io`
- **Studio:** local dev or `npm run deploy` in `studio-simonask.io`

Do not duplicate full env tables here — see README files.
