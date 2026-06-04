import Link from "next/link";

import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { OpenForWorkLabel } from "@/components/shared/open-for-work-label";
import { EmailIconLink } from "@/components/contact/email-icon-link";
import { GithubIconLink } from "@/components/shared/github-icon-link";
import { LinkedinIconLink } from "@/components/shared/linkedin-icon-link";
import { OpenCookieSettingsButton } from "@/components/layout/open-cookie-settings-button";
import { PhoneContactLink } from "@/components/contact/phone-contact-link";
import { SectionLink } from "@/components/shared/section-link";
import { SITE_SECTIONS, sectionHref, type SiteSectionId } from "@/lib/sections";

const footerLinkClass = "text-sm text-muted transition-colors hover:text-foreground";

const sectionLinks: { id: SiteSectionId; label: string }[] = [
  { id: SITE_SECTIONS.projects, label: "Projects" },
  { id: SITE_SECTIONS.writing, label: "Writing" },
  { id: SITE_SECTIONS.experience, label: "Experience" },
  { id: SITE_SECTIONS.education, label: "Education" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <section id="get-in-touch" className="py-14 sm:py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <ContactAside />
            <div className="w-full max-w-lg">
              <h2 className="page-section-title font-display text-2xl tracking-tight text-foreground">
                Get in touch
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                If you want to talk analytics, tooling, or a role, send a note —{" "}
                <br className="hidden sm:block" aria-hidden />
                I read everything and reply when I can.
              </p>
              <div className="mt-3">
                <OpenForWorkLabel />
              </div>

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
              <EmailIconLink buttonLocation="footer" />
              <GithubIconLink />
              <LinkedinIconLink />
            </div>
            <PhoneContactLink showLabel />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-between">
            <p className="text-xs text-muted tabular-nums">© {year} Simon Ask</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/privacy" className={footerLinkClass}>
                Privacy Policy
              </Link>
              <Link href="/cookies" className={footerLinkClass}>
                Cookie Policy
              </Link>
              <OpenCookieSettingsButton className={`${footerLinkClass} hover:underline`} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
