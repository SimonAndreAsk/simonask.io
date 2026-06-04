/** Aligned with `analytics/contracts/dataLayer/*.json` — update here when contracts change. */
export type ContactClickLocation = "header" | "hero" | "footer" | "body";
export type ContactFormLocation = string;

type ConsentUpdateEvent = { event: "consent_update"; analytics: boolean };
type ContactClickEvent = { event: "contact_click"; button_location: ContactClickLocation };
type ContactFormSubmitEvent = { event: "contact_form_submit"; form_location: ContactFormLocation };

type DataLayerPush = ConsentUpdateEvent | ContactClickEvent | ContactFormSubmitEvent;

function pushToDataLayer(payload: DataLayerPush): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export function pushContactClick(button_location: ContactClickLocation): void {
  pushToDataLayer({ event: "contact_click", button_location });
}

export function pushContactFormSubmit(
  form_location: ContactFormLocation = "footer",
): void {
  pushToDataLayer({ event: "contact_form_submit", form_location });
}

export function pushConsentUpdate(analytics: boolean): void {
  pushToDataLayer({ event: "consent_update", analytics });
}
