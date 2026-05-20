# Sanity Studio development

Read when: adding or changing schema, desk structure, plugins, or Presentation routes in `studio-simonask.io/`.

For publish flow, GROQ, webhooks, and draft preview → [sanity-conventions.md](./sanity-conventions.md).

## File map

| Change | File(s) |
|--------|---------|
| New / edit document type | `schemaTypes/<name>.ts` → register in `schemaTypes/index.ts` |
| Article body components | `schemaTypes/blocks/<name>.ts` → add to `blockContentType.ts` `of` → register in `index.ts` → render in `article-body.tsx` |
| Desk sidebar | `structure.ts` |
| Presentation URLs | `presentation/resolve.ts` |
| Plugins, preview origin | `sanity.config.ts` |
| Project ID / dataset | `env.ts` (see `.env.example`) |

## Schema pattern

Match `schemaTypes/postType.ts`: `defineType`, `defineField`, `validation: (rule) => rule.required()` where needed. Slug fields: `type: 'slug'`, `options: { source: 'title' }`.

Prettier: single quotes, no semis (`studio-simonask.io/package.json`).

---

## Checklist: new document type

Studio only (no site yet):

- [ ] Create `schemaTypes/<type>.ts` with `defineType`
- [ ] Export and add to `schemaTypes/index.ts`
- [ ] Add desk items in `structure.ts` (filter `_type == "<type>"`)
- [ ] If previewable on site: add `locations.<type>` in `presentation/resolve.ts` (`defineLocations`, `href` pattern)
- [ ] Run `npm run dev` in `studio-simonask.io` and verify in Studio

Also touch Next.js when the type should appear on simonask.io:

- [ ] GROQ in `nextjs-simonask.io/src/sanity/queries.ts`
- [ ] Route/page or component to render it
- [ ] If publish should revalidate specific paths: `nextjs-simonask.io/src/app/api/revalidate/route.ts` (today only `post` gets slug paths; other types revalidate layout root)
- [ ] See [sanity-conventions.md](./sanity-conventions.md) for fetch (`sanityFetch`) and staging rules

---

## Checklist: new field on `post`

- [ ] Add `defineField` in `schemaTypes/postType.ts`
- [ ] Extend GROQ projections in `nextjs-simonask.io/src/sanity/queries.ts` (`POST_QUERY`, `POSTS_QUERY` as needed)
- [ ] Render in `post-list.tsx`, `[slug]/page.tsx`, and/or `article-body.tsx` (blocks only for portable text)
- [ ] Presentation `resolve.ts` only if the field changes preview URLs
- [ ] Existing posts: editors may need to open and save in Studio for new required fields

---

## Desk & Presentation

**Desk** (`structure.ts`) — nested groups:

- **Writing** — Drafts / Published / All posts (`_type == "post"`)
- **Homepage** — Projects (`project`), Experience (`experience`)
- **Taxonomies** — Technologies (`projectTechnology`), Post categories (`postCategory`)

New types → add under the right group with `S.listItem()` + `S.documentList()`.

**Content migration:** `migrations/<name>/index.ts`, run with `npx sanity migration run <name> --no-dry-run`. Technologies rename: `npm run migration:technologies` (five steps: field rename, clear refs, delete `projectTag`, create `projectTechnology`, restore refs). Run on dataset before deploying schema that depends on migrated fields.

**Presentation:** `post` → `/${slug.current}` and `/`. `project` → `/#projects` and `/`. `experience` → `/#experience` and `/` in `presentation/resolve.ts`. New previewable types need a `locations.<type>` entry and a real Next route. Preview URLs: `sanity.config.ts`.

---

## Plugins

Register in `sanity.config.ts` `plugins: [...]`. Installed today: `codeInput`, `structureTool`, `presentationTool`, `visionTool`. Add new plugins there; avoid duplicate structure/presentation tools.

---

## Local dev

`cd studio-simonask.io && npm run dev` — Studio :3333; Next :3000 for Presentation (`SANITY_STUDIO_PREVIEW_ORIGIN`).

---

## Do / Don't

| Do | Don't |
|----|-------|
| Register every type in `schemaTypes/index.ts` | Commit `.env` or tokens |
| Keep `_type` names stable once content exists | Rename `post` without updating GROQ, routes, and webhook |
| Link to sanity-conventions for cross-app behavior | Duplicate env/deploy tables from README |
