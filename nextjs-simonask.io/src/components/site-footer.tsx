import Link from "next/link";

import { ContactAside } from "@/components/contact-aside";
import { ContactForm } from "@/components/contact-form";
import { OpenForWorkLabel } from "@/components/open-for-work-label";
import { EmailIconLink } from "@/components/email-icon-link";
import { GithubIconLink } from "@/components/github-icon-link";
import { LinkedinIconLink } from "@/components/linkedin-icon-link";
import { PhoneContactLink } from "@/components/phone-contact-link";
import { SectionLink } from "@/components/section-link";
import { SITE_SECTIONS, sectionHref, type SiteSectionId } from "@/lib/sections";

const footerLinkClass = "text-sm text-muted transition-colors hover:text-foreground";

const sectionLinks: { id: SiteSectionId; label: string }[] = [
  { id: SITE_SECTIONS.experience, label: "Experience" },
  { id: SITE_SECTIONS.education, label: "Education" },
  { id: SITE_SECTIONS.projects, label: "Projects" },
  { id: SITE_SECTIONS.writing, label: "Writing" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <section id="get-in-touch" className="py-14 sm:py-16">
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <ContactAside />
            <div className="min-w-0 w-full max-w-lg sm:max-w-none sm:flex-1">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-3">
                <h2 className="page-section-title font-display text-2xl tracking-tight text-foreground">
                  Get in touch
                </h2>
                <OpenForWorkLabel />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                If you want to talk analytics, tooling, or a role, send a note — I
                read everything and reply when I can.
              </p>

              <div className="mt-8 w-full text-left">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-border/40 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <Link
              href="/"
              className="font-display text-lg tracking-tight text-foreground transition-opacity hover:opacity-70"
            >
              Simon Ask
            </Link>

            <nav
              className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4 sm:gap-x-8"
              aria-label="Page sections"
            >
              {sectionLinks.map(({ id, label }) => (
                <SectionLink key={id} href={sectionHref(id)} className={footerLinkClass}>
                  {label}
                </SectionLink>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-border/40 pt-6 sm:justify-between">
            <div className="flex flex-wrap items-center gap-0.5">
              <EmailIconLink />
              <GithubIconLink />
              <LinkedinIconLink />
            </div>
            <PhoneContactLink showLabel />
          </div>

          <p className="mt-6 text-xs text-muted tabular-nums">© {year} Simon Ask</p>
        </div>
      </div>
    </footer>
  );
}
