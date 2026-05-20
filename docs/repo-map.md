# Repo map (plain language → real paths)

Folder names on disk stay as-is (`nextjs-simonask.io`, `studio-simonask.io`) so Vercel, Sanity, and agent docs keep working. Use this page when you think in **roles** (“public site”, “CMS”) but need the **actual path**.

## Top level

| You mean… | Open this folder / file |
|-----------|-------------------------|
| **Public website** (visitors, layout, styles) | `nextjs-simonask.io/` |
| **CMS / Studio** (write posts, projects, publish) | `studio-simonask.io/` |
| **Agent & project conventions** | `memories/` → start at [memories/README.md](../memories/README.md) |
| **Cursor rules & skills** | `.cursor/` → [.cursor/README.md](../.cursor/README.md) |
| **Maintenance scripts** | `scripts/` |
| **This alias map** | `docs/repo-map.md` |
| **Repo overview & setup** | [README.md](../README.md) |
| **AI one-screen router** | [AGENTS.md](../AGENTS.md) |

There is **no** `package.json` at the repo root — `cd` into an app folder before `npm install` or `npm run dev`.

## Common tasks

| I want to… | Where |
|------------|--------|
| Run the site locally | `nextjs-simonask.io/` → [README](../nextjs-simonask.io/README.md) → `npm run dev` (:3000) |
| Run Studio locally | `studio-simonask.io/` → [README](../studio-simonask.io/README.md) → `npm run dev` (:3333) |
| Change homepage layout or copy | `nextjs-simonask.io/src/app/page.tsx` |
| Change global colors / theme | `nextjs-simonask.io/src/app/globals.css` |
| Change a post page template | `nextjs-simonask.io/src/app/[slug]/page.tsx` |
| Change header, footer, cards | `nextjs-simonask.io/src/components/` |
| Change how the site loads Sanity data | `nextjs-simonask.io/src/sanity/` (`load.ts`, `queries.ts`) |
| Add or edit a post field in Studio | `studio-simonask.io/schemaTypes/` |
| Change Studio sidebar / desk | `studio-simonask.io/structure.ts` |
| Ship code to staging / prod | Branch `staging` → `main`; see [memories/go-live.md](../memories/go-live.md) |
| Publish writing (no Git for content) | Studio → **Publish** → webhook revalidates site |
| Prompt Cursor well | [memories/cursor-usage.md](../memories/cursor-usage.md) |
| Stress-test an idea before building | `grill-me` skill / [memories/grill-me.md](../memories/grill-me.md) |

## Inside the public website (`nextjs-simonask.io/`)

| Area | Path | Notes |
|------|------|--------|
| Routes & pages | `src/app/` | Next.js App Router; `page.tsx` = a URL |
| Shared UI | `src/components/` | Lists, header, portable text, etc. |
| Sanity fetch & GROQ | `src/sanity/` | Use `sanityFetch()` from `load.ts` |
| Helpers | `src/lib/` | Formatting, sections, contact, profile |
| APIs | `src/app/api/` | Revalidate, draft mode, contact form |
| Env template | `.env.example` | Copy to `.env.local` in this folder only |

Deep conventions: [memories/nextjs-conventions.md](../memories/nextjs-conventions.md).

## Inside the CMS (`studio-simonask.io/`)

| Area | Path | Notes |
|------|------|--------|
| Document types & fields | `schemaTypes/` | Post, project, etc. |
| Desk structure | `structure.ts` | What editors see in the sidebar |
| Presentation URLs | `presentation/resolve.ts` | Preview links to the Next site |
| Studio config | `sanity.config.ts` | Plugins, project wiring |
| Env template | `.env.example` | Copy to `.env.local` in this folder only |

Deep conventions: [memories/sanity-studio-development.md](../memories/sanity-studio-development.md).

## Names we did not rename (on purpose)

| Kind | Example | Why |
|------|---------|-----|
| App folders | `nextjs-simonask.io`, `studio-simonask.io` | Vercel root directory, deploy scripts, hundreds of doc references |
| Next.js files | `page.tsx`, `layout.tsx`, `[slug]/` | Framework requires these names |
| Studio | `schemaTypes/` | Sanity default layout |

If a path still feels unclear, prefer updating this map or [README.md](../README.md) — not renaming disk paths unless you accept a full infra + doc-sync migration.
