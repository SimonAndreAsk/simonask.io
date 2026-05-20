import { ArrowRight, Mail } from "lucide-react";

import { SectionLink } from "@/components/section-link";
import { SiteIcon } from "@/components/site-icon";
import { linkedinProfileUrl } from "@/lib/contact";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

type HeroContactActionsProps = {
  className?: string;
};

export function HeroContactActions({ className = "" }: HeroContactActionsProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 sm:justify-start sm:gap-8 ${className}`.trim()}
    >
      <SectionLink
        href={sectionHref(SITE_SECTIONS.getInTouch)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-sm transition-[color,background-color,border-color,box-shadow] hover:border-open-green/40 hover:bg-surface/80 hover:text-open-green"
      >
        <SiteIcon icon={Mail} />
        Get in touch
      </SectionLink>
      <a
        href={linkedinProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        LinkedIn
        <SiteIcon
          icon={ArrowRight}
          className="shrink-0 transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}
