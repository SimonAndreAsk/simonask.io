import { LocationLabel } from "@/components/location-label";
import { OpenForWorkLabel } from "@/components/open-for-work-label";

function MetaSeparator() {
  return (
    <span className="text-border select-none" aria-hidden>
      ·
    </span>
  );
}

/** Location and open-for-work under the h1 from `sm` up. */
export function HeroIntroMeta() {
  return (
    <p className="hidden flex-wrap items-center gap-x-3 gap-y-2 sm:flex">
      <LocationLabel className="mt-0" />
      <MetaSeparator />
      <OpenForWorkLabel />
    </p>
  );
}

/** Location and open-for-work below the intro paragraph on mobile only. */
export function HeroMobileLocationRow() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:hidden">
      <LocationLabel className="mt-0" />
      <MetaSeparator />
      <OpenForWorkLabel />
    </p>
  );
}
