import Script from "next/script";

/** Dummy web GA4 ID — real measurement runs via server GTM (Stape). */
const DEFAULT_GA4_MEASUREMENT_ID = "G-12345";
const GA4_ID_PATTERN = /^G-[A-Z0-9]+$/;

const DEFAULT_GTM_SERVER_URL = "https://serverside.simonask.io";

function getGa4MeasurementId(): string {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  if (id && GA4_ID_PATTERN.test(id)) return id;
  return DEFAULT_GA4_MEASUREMENT_ID;
}

function getGtmServerUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GTM_SERVER_URL?.trim();
  if (!raw) return DEFAULT_GTM_SERVER_URL;
  try {
    const url = new URL(raw);
    if (url.protocol === "https:") return url.href.replace(/\/$/, "");
  } catch {
    /* fall through */
  }
  return DEFAULT_GTM_SERVER_URL;
}

/** Consent Mode v2 defaults + gtag init — must run before GTM loader. */
export function ConsentDefaults() {
  const measurementId = getGa4MeasurementId();
  const serverUrl = getGtmServerUrl();

  return (
    <Script id="google-tag-consent" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });

        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          'send_page_view': false,
          'server_container_url': '${serverUrl}'
        });
      `}
    </Script>
  );
}
