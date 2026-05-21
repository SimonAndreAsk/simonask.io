"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  ANALYTICS_CONSENT_LABEL,
  COOKIE_SETTINGS_OPEN_EVENT,
  persistConsentChoice,
  readStoredConsent,
  syncConsentToGtm,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [enterKey, setEnterKey] = useState(0);

  const hide = useCallback(() => setVisible(false), []);

  const showPanel = useCallback(() => {
    setVisible(true);
    setEnterKey((k) => k + 1);
  }, []);

  const saveChoice = useCallback(
    (choice: CookieConsentChoice) => {
      persistConsentChoice(choice);
      hide();
    },
    [hide],
  );

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      syncConsentToGtm(stored === "analytics");
      return;
    }
    showPanel();
  }, [showPanel]);

  useEffect(() => {
    const onOpenSettings = () => showPanel();
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, onOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, onOpenSettings);
  }, [showPanel]);

  if (!visible) return null;

  return (
    <div
      key={enterKey}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="cookie-consent-panel fixed bottom-5 right-5 z-50 w-[min(calc(100vw-2.5rem),26rem)] rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm"
    >
      <p id="cookie-consent-title" className="text-sm font-medium text-foreground">
        Cookie preferences
      </p>
      <p id="cookie-consent-desc" className="mt-2 text-sm leading-relaxed text-muted">
        <span className="text-foreground">{ANALYTICS_CONSENT_LABEL}</span>
        {" — "}
        optional, anonymous usage stats. No ads. Read the{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => saveChoice("analytics")}
          className="min-w-0 flex-1 rounded-md bg-foreground px-3 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => saveChoice("rejected")}
          className="min-w-0 flex-1 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
        >
          Reject all
        </button>
      </div>
    </div>
  );
}
