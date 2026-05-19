# Next.js conventions

Read when: editing the public site — pages, components, styles, or Sanity consumption.

## File map

| Area | Path |
|------|------|
| Routes | `src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/not-found.tsx` |
| Layout + fonts | `src/app/layout.tsx` |
| Global styles | `src/app/globals.css` |
| Components | `src/components/` |
| Sanity client/fetch | `src/sanity/client.ts`, `load.ts`, `queries.ts`, `env.ts` |
| Utils | `src/lib/format.ts`, `src/lib/contact.ts` |
| APIs | `src/app/api/revalidate/`, `src/app/api/draft-mode/` |

## Fetching content

Always use `sanityFetch()` from `src/sanity/load.ts`. Add new GROQ to `src/sanity/queries.ts`.

```ts
// Pattern
import { sanityFetch } from "@/sanity/load";
import { POSTS_QUERY } from "@/sanity/queries";
```

## Styling

- Tailwind 4 with `@theme inline` mapping CSS variables in `globals.css`
- Use theme colors: `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-border`, `bg-surface`
- Display font: `font-display` (Fraunces); body: default sans (Geist)
- Dark mode: `html.dark` class via `ThemeProvider` / `ThemeScript` — do not invent a second theme system
- Open-for-work accent: `open-green` token and `.open-for-work-dot` animation

## Components (reuse before adding new)

| Component | Role |
|-----------|------|
| `site-header`, `site-footer` | Chrome |
| `sticky-contact` | Contact CTA |
| `staging-banner` | Shown on staging env |
| `post-list` | Home listing |
| `article-body` | Portable text rendering |
| `theme-toggle`, `theme-provider`, `theme-script` | Light/dark |
| `open-for-work-badge` | Hiring status |

## Do / Don't

| Do | Don't |
|----|-------|
| Server components + `sanityFetch` for content | Hardcode project ID or dataset in source |
| Match existing spacing/typography in `globals.css` | Add a second CSS framework |
| Keep `metadata` in layout or page exports | Bypass `getSanityClient()` preview logic for drafts on staging |
