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
        className="group inline-flex items-center gap-2 rounded-md border border-open-green bg-open-green px-4 py-2.5 text-sm text-white shadow-sm transition-[transform,box-shadow,filter] duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-open-green/35 active:translate-y-0 active:scale-[0.98] active:brightness-95 active:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-open-green"
      >
        <SiteIcon
          icon={Mail}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
        />
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
