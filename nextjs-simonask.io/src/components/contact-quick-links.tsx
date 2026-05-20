import { Mail, Phone } from "lucide-react";

import { LinkedinIcon, SiteIcon } from "@/components/site-icon";
import {
  contactEmail,
  contactMailto,
  contactPhone,
  contactPhoneHref,
  linkedinProfileUrl,
} from "@/lib/contact";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground sm:items-start";

export function ContactQuickLinks() {
  return (
    <nav
      className="flex w-full flex-col items-center gap-2.5 border-t border-border/40 pt-4 sm:items-stretch"
      aria-label="Other ways to reach me"
    >
      <a href={contactMailto} className={linkClass}>
        <SiteIcon icon={Mail} className="shrink-0 sm:mt-0.5" />
        <span className="whitespace-nowrap leading-snug">{contactEmail}</span>
      </a>
      <a href={contactPhoneHref} className={`${linkClass} tabular-nums`}>
        <SiteIcon icon={Phone} className="shrink-0 sm:mt-0.5" />
        <span className="leading-snug">{contactPhone}</span>
      </a>
      <a
        href={linkedinProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <LinkedinIcon className="shrink-0 sm:mt-0.5" />
        <span className="leading-snug">LinkedIn</span>
      </a>
    </nav>
  );
}
