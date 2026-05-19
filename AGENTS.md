# simonask.io — agent map

Personal blog monorepo. Read this first; open deeper docs only when the task needs them.

## Apps

| Path | Stack | Dev |
|------|-------|-----|
| `nextjs-simonask.io/` | Next.js 16, React 19, Tailwind 4, Sanity client | `npm run dev` → http://localhost:3000 |
| `studio-simonask.io/` | Sanity Studio 5 | `npm run dev` → http://localhost:3333 |

## Ship model

- **Code:** `staging` → [stage.simonask.io](https://stage.simonask.io) → merge `main` → [simonask.io](https://simonask.io)
- **Content:** edit in Studio → publish → Sanity webhook → `POST /api/revalidate`
- **Draft posts:** visible on staging / draft mode only, not production

Details: root `README.md` and each app’s `README.md`.

## Deep context (read only if needed)

| Doc | When |
|-----|------|
| `memories/INDEX.md` | Pick which memory file to open |
| `.cursor/rules/nextjs.mdc` | Next.js 16 API changes (auto-applies when editing the Next app) |
| `memories/architecture.md` | Cross-app flow, env, deploy, preview |
| `memories/nextjs-conventions.md` | UI, styling, components, routing |
| `memories/sanity-conventions.md` | Schema, Studio, GROQ, webhooks |

Do not read all memory files. Open at most 1–2 relevant to the task.

## Defaults

- Minimal diffs; match patterns in the package you touch
- Never commit `.env`, `.env.local`, or tokens (`.env.example` is fine)
- Vercel root directory for the site: `nextjs-simonask.io`
