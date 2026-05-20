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
| Utils | `src/lib/format.ts`, `src/lib/contact.ts`, `src/lib/profile.ts`, `src/lib/experience.ts`, `src/lib/project-link.ts` |
| APIs | `src/app/api/revalidate/`, `src/app/api/draft-mode/`, `src/app/api/contact/` |

## Fetching content

Always use `sanityFetch()` from `src/sanity/load.ts`. Add new GROQ to `src/sanity/queries.ts`.

```ts
// Pattern
import { sanityFetch } from "@/sanity/load";
import { POSTS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
```

## Styling

- Tailwind 4 with `@theme inline` mapping CSS variables in `globals.css`
- Use theme colors: `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-border`, `bg-surface`
- Display font: `font-display` (Fraunces); body: default sans (Geist)
- Article prose: `.article-*` classes in `globals.css` (portable text from `article-body.tsx`)
- Styling is **light only**: semantic tokens in `:root` / `@theme inline` — no `html.dark` or second palette
- Open-for-work accent: `open-green` token and `.open-for-work-dot` animation

## Components (reuse before adding new)

| Component | Role |
|-----------|------|
| `site-header`, `site-footer` | Chrome; footer includes `/#get-in-touch` form + portrait |
| `site-icon` | Lucide icons (mail, phone, arrows) + matching stroke brand SVGs (GitHub, LinkedIn); shared size/stroke + `iconLinkClass` |
| `email-icon-link` | Mailto contact (icon link) |
| `github-icon-link` | GitHub profile (icon link) |
| `linkedin-icon-link` | LinkedIn profile (icon link) |
| `phone-contact-link` | `tel:` link; optional visible number (footer) |
| `hero-contact-actions` | Home hero: Get in Touch + LinkedIn |
| `staging-banner` | Shown on staging env |
| `post-list` | Home writing listing — card layout aligned with `project-list` |
| `project-list` | Home projects — tags, thumbnail, summary, contextual link label |
| `project-tags` | Neutral tool/category pills from Sanity `projectTag` / `postCategory` |
| `contact-aside`, `contact-quick-links` | Footer contact column — portrait, open-for-work, email / phone / LinkedIn |
| `contact-form` | Name / email / message form in footer → `POST /api/contact` (Resend) |
| `experience-section`, `education-section` | Home CV blocks (`/#experience`, `/#education`); experience from Sanity |
| `profile-timeline` | Shared list for profile entries |
| `company-logo` | Round 48px employer logo beside experience titles (Sanity `logoImage` or fallback from `logoAlt`) |
| `article-body` | Portable text rendering |
| `hero-intro-meta`, `location-label`, `open-for-work-label` | Hero location + hiring status |

## Do / Don't

| Do | Don't |
|----|-------|
| Server components + `sanityFetch` for content | Hardcode project ID or dataset in source |
| Match existing spacing/typography in `globals.css` | Add a second CSS framework or a second color-scheme layer |
| Keep `metadata` in layout or page exports | Bypass `getSanityClient()` preview logic for drafts on staging |
