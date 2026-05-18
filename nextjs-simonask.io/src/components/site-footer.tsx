import Link from "next/link";

import { contactEmail, contactMailto } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
        <p className="font-display text-sm tracking-tight text-foreground">
          Simon Ask
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Exploring digital analytics, the web, and AI — ideas, experiments,
          and learning in public.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <Link
            href="/#articles"
            className="transition-colors hover:text-foreground"
          >
            Articles
          </Link>
          <a
            href={contactMailto}
            className="transition-colors hover:text-foreground"
          >
            {contactEmail}
          </a>
        </nav>
        <p className="mt-6 text-xs text-muted">
          © {year} Simon Ask
        </p>
      </div>
    </footer>
  );
}
