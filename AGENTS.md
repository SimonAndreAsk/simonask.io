# simonask.io — agent map

**Humans:** start at [README.md](./README.md) (setup, folder map, common tasks). Plain names → paths: [docs/repo-map.md](./docs/repo-map.md).

Monorepo: Next.js site + Sanity Studio. Agent routes context via [memories/INDEX.md](./memories/INDEX.md) (one memory max; user need not @ files). Prompting tips: [memories/cursor-usage.md](./memories/cursor-usage.md).

| Package | Dev |
|---------|-----|
| `nextjs-simonask.io/` | `npm run dev` → :3000 |
| `studio-simonask.io/` | `npm run dev` → :3333 |

| Docs | Purpose |
|------|---------|
| [memories/README.md](./memories/README.md) | Human-friendly index of convention files |
| [.cursor/README.md](./.cursor/README.md) | Rules vs skills |

Vercel root: `nextjs-simonask.io`. Ship model and env: root `README.md`.
