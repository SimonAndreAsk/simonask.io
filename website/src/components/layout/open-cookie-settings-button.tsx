"use client";

import { openCookieSettings } from "@/lib/tracking/cookie-consent";

type OpenCookieSettingsButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function OpenCookieSettingsButton({
  className,
  children = "Cookie settings",
}: OpenCookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openCookieSettings()}
      className={
        className ??
        "rounded-md border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:bg-background"
      }
    >
      {children}
    </button>
  );
}
