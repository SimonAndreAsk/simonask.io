# Memory index

Project-specific context for agents. **Do not read every file** — pick **at most one** per task.

**Routing:** Agents read this file when the user’s prompt needs conventions. Match **Prompt signals** + file paths; then read only the chosen memory. User does not need to `@` these files.

**No match:** If no row below and no skill in the skills table fits, **stop work** and ask the user whether to create a new memory (propose a filename under memories/ and prompt signals). Do not guess or implement until they answer.

| File | Prompt signals (examples) |
|------|---------------------------|
| [contact-form.md](./contact-form.md) | contact form, Resend, `RESEND_API_KEY`, get in touch form, message not sent, 503 contact |
| [homepage-cards.md](./homepage-cards.md) | project card, writing card, post list, list card, same as projects, tags spacing, thumbnail, mobile card, experience card |
| [nextjs-conventions.md](./nextjs-conventions.md) | `nextjs-simonask.io`, pages, components, `globals.css`, theme, layout, site UI, fetch on site |
| [sanity-conventions.md](./sanity-conventions.md) | GROQ, publish, revalidate, Presentation on site, webhooks, draft preview |
| [sanity-studio-development.md](./sanity-studio-development.md) | `studio-simonask.io`, schema, field, document type, desk, Studio plugin |
| [architecture.md](./architecture.md) | deploy, Vercel, env, staging vs prod, branch workflow, infrastructure |
| [decisions.md](./decisions.md) | why we, rationale, ADR, historical choice |
| [doc-sync.md](./doc-sync.md) | renamed/moved paths, new routes, update agent docs, structural refactor |
| [refine-prompt.md](./refine-prompt.md) | refine prompt, improve my prompt, 5-part framework |
| [grill-me.md](./grill-me.md) | grill, challenge idea, devil's advocate, stress-test, sanity-check before build |
| [cursor-usage.md](./cursor-usage.md) | token usage, how to prompt, new chat workflow |
| [go-live.md](./go-live.md) | **Go Live**, go live, ship to staging and main, deploy site |
| [deploy-sanity.md](./deploy-sanity.md) | **Deploy Sanity**, deploy sanity, deploy studio, hosted studio, sanity deploy |

## Skills (`.cursor/skills/`)

Loaded by intent — user does not `@` unless they want to force one.

| Skill | Prompt signals |
|-------|----------------|
| `git-workflow` | commit, push, amend, PR, pull request, `gh`, branch, **Go Live** |
| `sanity-studio-develop` | new Studio type/field/structure (overlaps sanity-studio-development memory — prefer skill for implementation steps) |
| `refine-prompt` | refine / structure a prompt (overlaps refine-prompt memory) |
| `grill-me` | grill / stress-test / challenge an idea (overlaps grill-me memory — prefer skill when grilling) |

## Not duplicated here

- Human navigation → `memories/README.md`, root `README.md`, `.cursor/README.md`
- Setup commands and env tables → root `README.md`, `nextjs-simonask.io/README.md`, `studio-simonask.io/README.md`
- Next.js 16 breaking changes → `.cursor/rules/nextjs.mdc` (auto when editing `nextjs-simonask.io/`)
- Sanity Studio editing → `.cursor/rules/sanity-studio.mdc` (auto when editing `studio-simonask.io/`)
