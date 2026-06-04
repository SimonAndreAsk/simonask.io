"use client";

import { Phone } from "lucide-react";

import { SiteIcon, iconLinkClass } from "@/components/shared/site-icon";
import { contactPhone, contactPhoneHref } from "@/lib/contact";
import { pushContactClick } from "@/lib/tracking/datalayer";

type PhoneContactLinkProps = {
  /** Show the formatted number beside the icon (footer). */
  showLabel?: boolean;
};

export function PhoneContactLink({ showLabel = false }: PhoneContactLinkProps) {
  return (
    <a
      href={contactPhoneHref}
      className={
        showLabel
          ? "inline-flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-sm text-muted tabular-nums transition-colors hover:bg-surface hover:text-foreground"
          : iconLinkClass
      }
      aria-label={`Call ${contactPhone}`}
      onClick={() => pushContactClick("footer")}
    >
      <SiteIcon icon={Phone} />
      {showLabel ? <span>{contactPhone}</span> : null}
    </a>
  );
}
