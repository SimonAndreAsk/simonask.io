# .cursor/

Cursor IDE configuration for this repo. You rarely edit these by hand — they guide the AI when you chat.

## What's here

| Path | Purpose |
|------|---------|
| **`rules/`** | Short rules auto-attached when you edit matching folders (e.g. Next.js vs Studio) |
| **`skills/`** | Step-by-step workflows the agent loads by intent (commit, PR, **Go Live**, Studio schema) |
| **`hooks.json`** | Optional automation (doc validation on stop is currently off) |

## Skills (invoke by intent or `@` path)

| Skill | Say something like… |
|-------|---------------------|
| [skills/git-workflow/SKILL.md](./skills/git-workflow/SKILL.md) | commit, push, PR, **Go Live** |
| [skills/sanity-studio-develop/SKILL.md](./skills/sanity-studio-develop/SKILL.md) | add a Studio field or document type |
| [skills/refine-prompt/SKILL.md](./skills/refine-prompt/SKILL.md) | refine my prompt |
| [skills/grill-me/SKILL.md](./skills/grill-me/SKILL.md) | grill my idea, stress-test a plan |

You do **not** need to `@` skills for normal work — the agent reads [memories/INDEX.md](../memories/INDEX.md) and picks context.

## Humans

- Repo overview → [../README.md](../README.md)
- Prompting tips → [../memories/cursor-usage.md](../memories/cursor-usage.md)
