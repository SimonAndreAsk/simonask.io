"use client";

import { Mail } from "lucide-react";

import { SiteIcon, iconLinkClass } from "@/components/shared/site-icon";
import { contactEmail, contactMailto } from "@/lib/contact";
import { type ContactClickLocation, pushContactClick } from "@/lib/tracking/datalayer";

type EmailIconLinkProps = {
  buttonLocation: Extract<ContactClickLocation, "header" | "footer">;
};

export function EmailIconLink({ buttonLocation }: EmailIconLinkProps) {
  return (
    <a
      href={contactMailto}
      className={iconLinkClass}
      aria-label={`Email ${contactEmail}`}
      onClick={() => pushContactClick(buttonLocation)}
    >
      <SiteIcon icon={Mail} />
    </a>
  );
}
