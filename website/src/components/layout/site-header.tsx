"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { EmailIconLink } from "@/components/contact/email-icon-link";
import { GithubIconLink } from "@/components/shared/github-icon-link";
import { SectionLink } from "@/components/shared/section-link";
import { SiteIcon } from "@/components/shared/site-icon";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

const navLinkClass = "transition-colors hover:text-foreground";

const navItems = [
  { id: SITE_SECTIONS.projects, label: "Projects" },
  { id: SITE_SECTIONS.writing, label: "Writing" },
  { id: SITE_SECTIONS.experience, label: "Experience" },
  { id: SITE_SECTIONS.education, label: "Education" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2.5 font-display text-lg tracking-tight text-foreground transition-opacity hover:opacity-70"
          onClick={closeMenu}
        >
          <Image
            src="/simon-portrait.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-md"
            sizes="2rem"
            priority
          />
          Simon Ask
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm text-muted">
            {navItems.map(({ id, label }) => (
              <SectionLink key={id} href={sectionHref(id)} className={navLinkClass}>
                {label}
              </SectionLink>
            ))}
          </nav>
          <div className="flex items-center gap-0.5 border-l border-border/40 pl-7">
            <EmailIconLink buttonLocation="header" />
            <GithubIconLink />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-foreground sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <SiteIcon icon={menuOpen ? X : Menu} />
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-border/40 px-6 pb-4 pt-3 sm:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3 text-sm text-muted">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <SectionLink
                  href={sectionHref(id)}
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  {label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-0.5 border-t border-border/40 pt-4">
            <EmailIconLink buttonLocation="header" />
            <GithubIconLink />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
