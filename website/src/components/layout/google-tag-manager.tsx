import Script from "next/script";

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
const DEFAULT_GTM_SERVER_URL = "https://serverside.simonask.io";
const DEFAULT_LOADER_SCRIPT = "awnoevoht.js";
const DEFAULT_LOADER_QUERY =
  "ckv89m=HQxSMTEiQzwmUFZCL1c%2BUQJVXVhUSQoZSRsGGwoBDwQfRgYZ";

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

function getGtmContainerId(): string | null {
  const id = process.env.NEXT_PUBLIC_GTM_WEB_CONTAINER_ID?.trim();
  if (!id || !GTM_ID_PATTERN.test(id)) return null;
  return id;
}

function getGtmLoaderScript(): string {
  const name = process.env.NEXT_PUBLIC_GTM_LOADER_SCRIPT?.trim();
  return name || DEFAULT_LOADER_SCRIPT;
}

function getGtmLoaderQuery(): string {
  const q = process.env.NEXT_PUBLIC_GTM_LOADER_QUERY?.trim();
  return q || DEFAULT_LOADER_QUERY;
}

/** Server-side GTM loader (first-party) — after consent-defaults + gtag init */
export function GoogleTagManagerHead() {
  const serverUrl = getGtmServerUrl();
  const loaderScript = getGtmLoaderScript();
  const loaderQuery = getGtmLoaderQuery();

  return (
    <Script id="google-tag-manager" strategy="beforeInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="${serverUrl}/${loaderScript}?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${loaderQuery}');`}
    </Script>
  );
}

/** GTM noscript fallback — first element in body per Google install guide. */
export function GoogleTagManagerNoscript() {
  const gtmId = getGtmContainerId();
  if (!gtmId) return null;

  const serverUrl = getGtmServerUrl();

  return (
    <noscript>
      <iframe
        src={`${serverUrl}/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
