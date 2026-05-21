/** Dispatched to reopen the consent UI (banner listens in CookieConsent). */
export const COOKIE_SETTINGS_OPEN_EVENT = "cookie-settings-open";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent_v1";

export type CookieConsentChoice = "analytics" | "rejected";

export const ANALYTICS_CONSENT_LABEL = "Analytics — help me understand site usage";

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_OPEN_EVENT));
}

export function readStoredConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (raw === "analytics" || raw === "rejected") return raw;
  } catch {
    return null;
  }
  return null;
}

export function writeStoredConsent(choice: CookieConsentChoice): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
  } catch {
    /* private browsing / blocked storage */
  }
}

function ensureGtag(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
  return window.gtag;
}

export function applyGtagConsent(analyticsGranted: boolean): void {
  if (typeof window === "undefined") return;
  const gtag = ensureGtag();
  gtag("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function pushConsentUpdateEvent(analyticsGranted: boolean): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "consent_update",
    analytics: analyticsGranted,
  });
}

/** Consent Mode update + GTM event (use after Accept/Reject or when restoring localStorage). */
export function syncConsentToGtm(analyticsGranted: boolean): void {
  applyGtagConsent(analyticsGranted);
  // Defer so gtag consent update is applied before GTM evaluates consent_update triggers.
  window.setTimeout(() => pushConsentUpdateEvent(analyticsGranted), 0);
}

export function persistConsentChoice(choice: CookieConsentChoice): void {
  const analyticsGranted = choice === "analytics";
  writeStoredConsent(choice);
  syncConsentToGtm(analyticsGranted);
}
