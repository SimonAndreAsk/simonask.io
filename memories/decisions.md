# Decisions (ADRs)

Read when: unsure why the repo is structured a certain way. Add a short entry when you make a non-obvious choice.

## Format for new entries

```markdown
### YYYY-MM-DD — Title
**Context:** …
**Decision:** …
**Implications:** …
```

---

### Monorepo with separate Next and Studio packages

**Context:** Content editors use Sanity Studio; visitors use the Next site.

**Decision:** `studio-simonask.io/` and `nextjs-simonask.io/` as siblings under one git repo.

**Implications:** Two `package.json` files; run install/dev in each folder. Vercel only builds the Next app.

---

### Staging shows drafts without draft mode on every request

**Context:** Editors need to preview unpublished posts on stage.simonask.io.

**Decision:** `NEXT_PUBLIC_SITE_ENV=staging` + `SANITY_API_READ_TOKEN` enables preview client in `getSanityClient()` (see `load.ts`).

**Implications:** Production must not set `SITE_ENV=staging` or ship a viewer token.

---

### Content revalidation via webhook, not time-based only

**Context:** Posts should appear soon after publish.

**Decision:** Sanity webhook → signed `POST /api/revalidate` → `revalidatePath` for home and post slug.

**Implications:** `SANITY_REVALIDATE_SECRET` must match between Sanity webhook config and Vercel env.

---

### CSS variables + Tailwind `@theme inline`

**Context:** Light/dark theme with shared tokens for marketing and article typography.

**Decision:** Define tokens in `globals.css`; map to Tailwind in `@theme inline`; toggle dark via `html.dark`.

**Implications:** Prefer semantic color utilities over hardcoded hex in components.
