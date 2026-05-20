# scripts/

Small maintenance scripts for the repo (not part of the Next.js or Studio apps).

| Script | Run | Purpose |
|--------|-----|---------|
| `validate-agent-docs.mjs` | `node scripts/validate-agent-docs.mjs` | Fail if paths in `memories/` or `.cursor/rules/` point to missing files |

Run from the **repo root** after you rename paths or update agent docs. See [memories/doc-sync.md](../memories/doc-sync.md).

**Repo layout in plain English:** [docs/repo-map.md](../docs/repo-map.md).
