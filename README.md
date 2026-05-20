# simonask.io

Personal portfolio site (with writing) and Sanity CMS for [simonask.io](https://simonask.io).

| Site | Branch | URL |
|------|--------|-----|
| Production | `main` | [simonask.io](https://simonask.io) |
| Staging | `staging` | [stage.simonask.io](https://stage.simonask.io) |

**GitHub:** [SimonAndreAsk/simon-ask-personal-project](https://github.com/SimonAndreAsk/simon-ask-personal-project)

## Start here

| I want to… | Open this |
|------------|-----------|
| Run the **website** on my machine | [nextjs-simonask.io/README.md](./nextjs-simonask.io/README.md) → `npm run dev` → http://localhost:3000 |
| Run **Sanity Studio** (edit posts/projects) | [studio-simonask.io/README.md](./studio-simonask.io/README.md) → `npm run dev` → http://localhost:3333 |
| Change layout, styles, or homepage copy | `nextjs-simonask.io/src/app/` and `src/components/` |
| Change post fields or Studio screens | `studio-simonask.io/schemaTypes/` |
| Ship code to staging + production | Work on branch `staging`, then say **Go Live** in Cursor (or follow [memories/go-live.md](./memories/go-live.md)) |
| Use Cursor effectively on this repo | [memories/cursor-usage.md](./memories/cursor-usage.md) |
| Find a folder by plain English (“public site”, “CMS”) | [docs/repo-map.md](./docs/repo-map.md) |

**First time setup:** install [Node.js](https://nodejs.org/) 20+, then run `npm install` inside **each** app folder you need (`nextjs-simonask.io` and/or `studio-simonask.io`). Copy `.env.example` → `.env.local` in that folder before `npm run dev`.

## What's in this repo

This is a **monorepo** — two apps in one Git repo, plus docs and Cursor config.

| Plain name | Folder on disk | Who | Purpose |
|------------|------------------|-----|---------|
| **Public website** | `nextjs-simonask.io/` | Everyone | Next.js site visitors see (simonask.io) |
| **CMS / Studio** | `studio-simonask.io/` | You + editors | Write and publish posts & projects |
| **Convention notes** | `memories/` | Cursor + you | Short agent/human docs — [memories/README.md](./memories/README.md) |
| **Cursor config** | `.cursor/` | Cursor | Rules and skills — [.cursor/README.md](./.cursor/README.md) |
| **Repo map (aliases)** | `docs/` | You | [docs/repo-map.md](./docs/repo-map.md) — “I mean X → open path Y” |
| **Scripts** | `scripts/` | Maintainers | [scripts/README.md](./scripts/README.md) |
| **Agent router** | `AGENTS.md` | Cursor | One-screen map for AI |
| **Private notes** | `.local/` | You only (gitignored) | Never committed |

**More tasks and paths:** [docs/repo-map.md](./docs/repo-map.md) (homepage files, Sanity folders, ship workflows).

There is **no** `package.json` at the repo root — always `cd` into the app folder before `npm install` or `npm run dev`.

## How code and content ship

**Code** (layout, features) follows Git:

1. Work on `staging` → deploys to **stage.simonask.io**
2. Merge `staging` → `main` → deploys to **simonask.io**

**Writing** (posts) follow Sanity:

1. Write in Studio → **Save** (draft)
2. Preview on staging (and in Studio **Presentation**)
3. **Publish** in Studio → live on **simonask.io** (webhook revalidates the site)

Draft posts are visible on staging only, not on production.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

## Local development

### Website

```bash
cd nextjs-simonask.io
npm install
cp .env.example .env.local   # add SANITY_API_READ_TOKEN for draft preview
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Sanity Studio

```bash
cd studio-simonask.io
npm install
cp .env.example .env.local   # SANITY_STUDIO_PROJECT_ID (same ID as the website)
npm run dev
```

Open [http://localhost:3333](http://localhost:3333). Project settings (including project ID) are at [sanity.io/manage](https://www.sanity.io/manage).

## Environment variables and secrets

- **Do not commit** `.env`, `.env.local`, API tokens, or private keys.
- Each app has its own **`.env.example`** — copy to `.env.local` in that folder only.
- **Viewer token** and **revalidate secret** are required for draft preview and fast publish — see app READMEs.

## Deployment

- **Vercel** — import repo, **Root Directory** `nextjs-simonask.io`
- **Domains** — `simonask.io` on Production (`main`); `stage.simonask.io` on Preview (`staging`)
- **DNS** — Cloudflare pointing to Vercel
- **Sanity** — CORS origins, API token, webhook → `/api/revalidate` (see `studio-simonask.io/README.md`)

Studio: run locally, or `npm run deploy` in `studio-simonask.io` for `*.sanity.studio`.

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `nextjs-simonask.io` | `npm run dev` | Dev server (:3000) |
| `nextjs-simonask.io` | `npm run build` | Production build |
| `studio-simonask.io` | `npm run dev` | Studio dev server (:3333) |
| `studio-simonask.io` | `npm run deploy` | Deploy studio to `*.sanity.studio` |
| repo root | `node scripts/validate-agent-docs.mjs` | Check agent doc paths (after doc edits) |

More detail: README in each app folder.
