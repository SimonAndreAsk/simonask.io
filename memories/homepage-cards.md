# Homepage list cards

Read when: project card, writing/post list, “same as projects”, tag spacing, thumbnails on cards, experience/education card layout.

## Components

| Section | File |
|---------|------|
| Projects | `nextjs-simonask.io/src/components/project-list.tsx` — `project` docs + posts with category `Project` (technology pills, not category pills) |
| Writing | `nextjs-simonask.io/src/components/post-list.tsx` — posts without `Project` category |
| Experience / education | `nextjs-simonask.io/src/components/profile-timeline.tsx` |
| Tags | `nextjs-simonask.io/src/components/label-pills.tsx` + `src/lib/content-labels.ts` |

List-card visual spec is **here**; file map and fetch patterns stay in `nextjs-conventions.md`.

## Shared card shell

Used on projects, writing, and experience/education:

```
rounded-xl bg-surface/40 ring-1 ring-border/50
```

Hover: `group` on the card link; title and destination link use `group-hover:text-open-green`.

## Projects + writing (list cards)

| Rule | Value |
|------|--------|
| Padding | `px-8 pb-6 pt-8` |
| Min height | `min-h-56` |
| Layout | Flex column; tags at top; title + meta/link grouped at bottom (`mt-auto` + `pt-14` on inner block) |
| Thumbnails | **Hidden** on all breakpoints (text-forward cards) |
| Tags | `LabelPills` — neutral pills only (no per-tag colors in Studio) |
| Link row | **Always visible** at bottom (`min-h-11`), not hover-only |
| Spacing tags → title | `pt-14` on the block below tags (~56px; user asked for generous gap) |
| Inner text gaps | `gap-1.5` between title, meta, and link |
| Preview text | **Projects only** — `summary` line-clamp. **Writing** — no excerpt or body preview on cards |

**“Same as projects”** → apply the same class strings to **both** `project-list.tsx` and `post-list.tsx`. Do not change `profile-timeline.tsx` layout unless the user asks for experience/education specifically.

## Experience + education (exception)

| Rule | Value |
|------|--------|
| Card chrome | Same `rounded-xl bg-surface/40 …` as list cards |
| Padding | `px-8 py-5` (no `min-h-56`) |
| Title row | **Title left, period right** on one row (`justify-between`) — keep timeline feel |
| Logos | **Not rendered** on the site even if Sanity `experience` still has `logoAlt` / `logoImage` |
| Tags | N/A (no label pills on profile entries) |

Do not re-add `CompanyLogo` or a thumbnail column unless the user explicitly requests it.

## Tags (Sanity → site)

- Projects: `projectTechnology` → “Technologies” in Studio
- Posts: `postCategory` → “Categories” in Studio
- Site: single neutral pill style in `label-pills.tsx` (`rounded-md`, `bg-surface`, `border-border/70`)

## Do / Don't

| Do | Don't |
|----|-------|
| Edit both list components when changing shared card UX | Reintroduce per-tag background colors in schema |
| Keep experience title/period row when matching “card” look | Copy project card’s `pt-14` / tag stack onto profile timeline |
| Use `label-pills.tsx` for taxonomy display | Add thumbnails back without an explicit ask |

## Related

- Studio taxonomies: `memories/sanity-conventions.md`, `memories/sanity-studio-development.md`
- ADRs: `memories/decisions.md` (neutral pills, hidden thumbnails, timeline layout)
