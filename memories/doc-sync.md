# Doc sync map

Read when: you change project structure, or agent docs feel outdated.

**Rule:** In the same task as a structural code change, update every doc listed below for that change. Then run `node scripts/validate-agent-docs.mjs`.

## If you change… → update these docs

| Change | Update |
|--------|--------|
| studio-simonask.io/schemaTypes/ (fields, types) | `memories/sanity-conventions.md`, `memories/sanity-studio-development.md`, `.cursor/rules/sanity-studio.mdc` |
| `studio-simonask.io/structure.ts` | `memories/sanity-studio-development.md`, `memories/sanity-conventions.md` |
| `studio-simonask.io/presentation/resolve.ts` | `memories/sanity-studio-development.md`, `memories/sanity-conventions.md` |
| `studio-simonask.io/sanity.config.ts` | `memories/sanity-studio-development.md`, `memories/sanity-conventions.md` |
| `nextjs-simonask.io/src/sanity/queries.ts` | `memories/sanity-conventions.md`, `memories/nextjs-conventions.md` |
| `nextjs-simonask.io/src/sanity/load.ts`, `nextjs-simonask.io/src/sanity/env.ts` | `memories/sanity-conventions.md`, `memories/architecture.md` |
| nextjs-simonask.io/src/app/ routes | `memories/nextjs-conventions.md` (file map table) |
| nextjs-simonask.io/src/components/ (shell UI) | `memories/nextjs-conventions.md` |
| `post-list.tsx`, `project-list.tsx`, `profile-timeline.tsx`, `label-pills.tsx` | `memories/homepage-cards.md`, `memories/nextjs-conventions.md` |
| `nextjs-simonask.io/src/app/api/contact/` | `memories/contact-form.md`, `memories/nextjs-conventions.md` |
| `nextjs-simonask.io/src/app/globals.css` | `memories/nextjs-conventions.md`, `.cursor/rules/nextjs.mdc` |
| `nextjs-simonask.io/src/app/api/revalidate/route.ts` | `memories/sanity-conventions.md`, `memories/architecture.md` |
| Deploy / branch / env workflow | `architecture.md`, root `README.md`, app READMEs |
| New memory or skill | New file in `memories/`, row in `memories/INDEX.md`, `memories/README.md`, root `AGENTS.md` if scope is repo-wide |
| New rule in .cursor/rules/ | `memories/INDEX.md` or `memories/doc-sync.md`, `.cursor/README.md` if layout changes |
| Repo folder map / beginner navigation | Root `README.md`, `docs/repo-map.md`, `memories/README.md`, `.cursor/README.md`, `scripts/README.md` |

## What to update in each doc

- **File path tables** — add/remove/rename rows
- **Checklists** — new steps when workflow changes
- **Do / Don't** — new pitfalls you hit
- **decisions.md** — non-obvious “why” (one short ADR)

Do not duplicate full env tables across memories; link to READMEs instead.

## Validation

```bash
node scripts/validate-agent-docs.mjs
```

Fails if any `` `path/to/file` `` referenced in agent docs does not exist on disk.

Always-on reminder: `.cursor/rules/workspace.mdc`. Validation is **manual/CI** (`node scripts/validate-agent-docs.mjs`); stop hook is disabled in `.cursor/hooks.json` to save tokens.
