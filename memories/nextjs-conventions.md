# Next.js conventions

Read when: editing the public site — pages, components, styles, or Sanity consumption.

## File map

| Area | Path |
|------|------|
| Routes | `src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/privacy/page.tsx`, `src/app/cookies/page.tsx`, `src/app/not-found.tsx` |
| Layout + fonts | `src/app/layout.tsx` |
| Global styles | `src/app/globals.css` |
| Components | `src/components/` |
| Sanity client/fetch | `src/sanity/client.ts`, `load.ts`, `queries.ts`, `env.ts` |
| Utils | `src/lib/format.ts`, `src/lib/contact.ts`, `src/lib/profile.ts`, `src/lib/experience.ts`, `src/lib/project-link.ts`, `src/lib/sections.ts`, `src/lib/scroll-to-section.ts` |
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
- Homepage list cards (projects, writing, experience): see `memories/homepage-cards.md`

## In-page navigation

| File | Role |
|------|------|
| `src/lib/sections.ts` | Section IDs + `sectionHref()` — keep in sync with heading `id`s on home |
| `src/lib/scroll-to-section.ts` | Smooth scroll with sticky header offset (`SECTION_SCROLL_GAP_PX = 32`); `prefers-reduced-motion` → instant |
| `src/components/section-link.tsx` | Hash links use custom scroll (not browser default jump) |
| `src/components/scroll-to-hash.tsx` | Scroll to hash on load / `hashchange` |

## Components (reuse before adding new)

| Component | Role |
|-----------|------|
| `site-header`, `site-footer` | Chrome; footer `/#get-in-touch` — center-column layout (portrait + form); `/privacy` link in footer bar |
| `consent-defaults`, `cookie-consent` | Consent Mode v2 defaults, gtag init (`G-12345` + `server_container_url`), DIY banner; `cookie_consent_v1` |
| `google-tag-manager` | Server-side GTM loader (`NEXT_PUBLIC_GTM_SERVER_URL` + `NEXT_PUBLIC_GTM_LOADER_*`) + noscript (`NEXT_PUBLIC_GTM_WEB_CONTAINER_ID`); loads after `consent-defaults` |
| Server GTM | `NEXT_PUBLIC_GTM_SERVER_URL` → loader + `server_container_url` in `consent-defaults.tsx` (default `https://serverside.simonask.io`) |
| `open-cookie-settings-button` | Reopens banner via `cookie-settings-open` event (footer + `/privacy`) |
| `section-link` | In-page hash navigation with smooth scroll |
| `site-icon` | Lucide icons (mail, phone, arrows) + matching stroke brand SVGs (GitHub, LinkedIn); shared size/stroke + `iconLinkClass` |
| `email-icon-link` | Mailto contact (icon link) |
| `github-icon-link` | GitHub profile (icon link) |
| `linkedin-icon-link` | LinkedIn profile (icon link) |
| `phone-contact-link` | `tel:` link; optional visible number (footer) |
| `hero-contact-actions` | Home hero: Get in Touch + LinkedIn |
| `staging-banner` | Shown on staging env |
| `post-list` | Home writing listing — card layout aligned with `project-list` |
| `project-list` | Home projects — technologies, summary, contextual link label (card spec: `homepage-cards.md`) |
| `label-pills` | Neutral label pills from Sanity `projectTechnology` / `postCategory` (`content-labels.ts`) |
| `contact-aside` | Footer contact — centered portrait above the form |
| `contact-form` | Name / email / message form in footer → `POST /api/contact` — Resend/Vercel: `memories/contact-form.md` |
| `experience-section`, `education-section` | Home CV blocks (`/#experience`, `/#education`); experience from Sanity |
| `profile-timeline` | Experience and education cards — same inner layout as before (title + period row), no logos |
| `article-body` | Portable text rendering; `headingIds` for in-article anchor targets |
| `mermaid-diagram` | Client-side Mermaid SVG for `mermaidDiagram` blocks; theme in `lib/mermaid-theme.ts` |
| `article-table-of-contents` | Auto TOC from post h2/h3 (`article-headings.ts`) |
| `hero-intro-meta`, `location-label`, `open-for-work-label` | Hero location + hiring status |

## Do / Don't

| Do | Don't |
|----|-------|
| Server components + `sanityFetch` for content | Hardcode project ID or dataset in source |
| Match existing spacing/typography in `globals.css` | Add a second CSS framework or a second color-scheme layer |
| Keep `metadata` in layout or page exports | Bypass `getSanityClient()` preview logic for drafts on staging |
| Read `homepage-cards.md` before changing list card layout | Re-add thumbnails or per-tag colors without an explicit ask |
