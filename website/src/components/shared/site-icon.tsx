import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Shared size and stroke — Lucide 24×24 grid + matching brand outlines. */
export const SITE_ICON_SIZE = 18;
export const SITE_ICON_STROKE = 2;

export const iconLinkClass =
  "rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground";

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: SITE_ICON_SIZE,
  height: SITE_ICON_SIZE,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: SITE_ICON_STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function SiteIcon({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Icon
      size={SITE_ICON_SIZE}
      strokeWidth={SITE_ICON_STROKE}
      className={className ?? "shrink-0"}
      aria-hidden
    />
  );
}

/** Stroke SVG for brands not in Lucide — same weight as SiteIcon. */
function BrandIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg {...svgProps} className={className ?? "shrink-0"}>
      {children}
    </svg>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-.88.28-1.5 0-2.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 4 5 4c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </BrandIcon>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </BrandIcon>
  );
}
