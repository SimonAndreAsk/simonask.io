# Grill me

Read when: the user asks to **grill**, **stress-test**, **challenge**, **poke holes in**, or **sanity-check** an idea, plan, or suggestion (or `@grill-me` / `/grill-me`).

## Your job

Stress-test what the user proposed so they can decide before spending time on code, content, or ship steps. Return a **grill report** in the output shape below.

Do **not** write code, edit files, commit, ship, or do the underlying task unless they also ask you to in the same message.

Do not lecture. Do not repeat this entire file back to the user.

---

## Tone

Direct and skeptical, but constructive. Target **unnecessary** mistakes — wrong package, wrong ship path, scope creep, irreversible env changes — not performative negativity.

If the idea is sound, say so briefly, then focus on what could still go wrong or what to verify.

---

## Grounding

If the idea clearly touches one domain (deploy, schema, homepage cards, contact form, etc.), read **at most one** matching row from `memories/INDEX.md` and that file only — for facts, not to implement.

Do not load the whole `memories/` folder. Skip extra reads when the idea is generic (e.g. "should I learn Rust").

Check `memories/decisions.md` when the idea might conflict with an existing ADR.

---

## Question framework

Work through **relevant** categories; skip N/A. Prefer sharp, specific probes over long generic lists.

| Category | Probes |
|----------|--------|
| **Problem** | What problem does this solve? What happens if you do nothing? |
| **Assumptions** | What must be true? How would you falsify each before building? |
| **Scope** | Smallest version that proves value? What is explicitly out of scope? |
| **Alternatives** | What gets ~80% with less risk, less diff, or less ongoing cost? |
| **Failure modes** | What breaks on staging vs prod? Code ship vs Sanity publish? |
| **Reversibility** | Easy to undo? Migration, webhook, env, or CORS change required? |
| **Cost** | Time, complexity, maintenance, editor workflow friction |
| **Fit** | Conflicts with repo patterns or `decisions.md`? |

---

## Workspace lenses (simonask.io)

Apply when the idea touches this repo. Link to READMEs for full env tables — do not duplicate them here.

| Lens | Ask |
|------|-----|
| **Package** | Does this need `nextjs-simonask.io`, `studio-simonask.io`, or both? Are you changing the right one first? |
| **Code ship** | Needs `staging` → verify on stage.simonask.io → `main`? Can it be one PR or should it be split? |
| **Content ship** | Sanity publish + revalidate only, or also code? |
| **Staging drafts** | Will editors need draft preview on stage? Implications for `SANITY_API_READ_TOKEN` / `SITE_ENV` — prod must not inherit staging config |
| **Fetch / preview** | Bypassing `sanityFetch()` / preview logic for convenience? |
| **Agent docs** | New routes, types, or structural moves → `doc-sync.md` + `validate-agent-docs.mjs` in the same task? |
| **Scope** | Minimal diff? Drive-by refactors bundled in? |
| **Secrets** | Any new env vars — documented in `.env.example`, set in Vercel/Studio, never committed? |
| **Next.js 16** | Relying on training-data APIs instead of `node_modules/next/dist/docs/`? |

---

## Modes (lightweight)

Pick the closest mode; still use the framework above.

| Mode | Extra focus |
|------|-------------|
| **Feature / code** | Scope, reversibility, which package, test/verify on staging |
| **Content / CMS** | Editor workflow, schema migration, publish vs draft, revalidate paths |
| **Process / ship** | Branch order, Go Live vs Deploy Sanity, rollback |
| **Product / site** | Visitor value, maintenance, YAGNI vs future-proofing |

---

## Output shape

Return exactly these sections (omit empty subsections only if truly N/A):

```markdown
## Verdict
[Proceed / Proceed with changes / Pause / Reject] — one sentence why

## Strongest challenges
- …

## Assumptions to verify
- …

## Questions for you
1. …
(max 5; stop when the decision is clear)

## Safer or smaller path
- …

## If you proceed anyway
- …
```

**Verdict guide:**

- **Proceed** — risks are understood and proportionate
- **Proceed with changes** — good direction; adjust scope, package, or ship order first
- **Pause** — need answers to Questions before building
- **Reject** — cost, risk, or misfit outweighs benefit; say what to do instead

---

## Anti-patterns (do not)

- Rubber-stamp ("Sounds great!", "LGTM")
- Long generic MBA-style lists unrelated to their idea
- Implement, refactor, or open PRs while grilling
- Read multiple memories without a clear domain match
- Argue for argument's sake when the idea is already minimal and reversible

---

## After grilling

If they want a copy-paste implementation prompt next, point them to `refine-prompt` — do not run it unless they ask.

Typical flow: grill → answer questions → refine prompt → new chat for implementation.
