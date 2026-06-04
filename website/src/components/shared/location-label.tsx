import { MapPin } from "lucide-react";

import { SiteIcon } from "@/components/shared/site-icon";
import { locationLabel } from "@/lib/profile";

type LocationLabelProps = {
  className?: string;
};

export function LocationLabel({ className = "mt-3" }: LocationLabelProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm text-muted ${className}`.trim()}>
      <SiteIcon icon={MapPin} />
      <span>{locationLabel}</span>
    </span>
  );
}
