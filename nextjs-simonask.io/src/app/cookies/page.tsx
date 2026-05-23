import type { Metadata } from "next";
import Link from "next/link";

import { OpenCookieSettingsButton } from "@/components/open-cookie-settings-button";
import { contactEmail, contactMailto } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies and similar technologies this site uses, what they do, and how you can control them.",
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <article className="article-page">
        <header className="mb-10 sm:mb-12">
          <h1 className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-muted tabular-nums">Last updated: May 2026</p>
        </header>

        <div className="article-body">
          <p className="article-p">
            This page lists cookies and similar storage used on{" "}
            <strong>simonask.io</strong> (and related domains I operate for this site). For
            broader privacy topics — what I collect and why — see the{" "}
            <Link href="/privacy" className="article-link">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="article-h2">What cookies are</h2>
          <p className="article-p">
            Cookies are small text files stored in your browser. They help a site remember
            settings, measure traffic, or keep a session alive. Similar technologies include{" "}
            <strong>local storage</strong> (data kept in the browser, not sent automatically
            with every request).
          </p>

          <h2 className="article-h2">How you choose</h2>
          <p className="article-p">
            When you first visit, a banner asks whether to allow <strong>analytics</strong>{" "}
            cookies. Until you accept, Google Consent Mode keeps analytics storage{" "}
            <strong>denied</strong>. Advertising cookies are not used on this site. You can
            change your choice anytime:
          </p>
          <p className="article-p">
            <OpenCookieSettingsButton />
          </p>

          <h2 className="article-h2">Cookies by category</h2>

          <h3 className="article-h3">Strictly necessary</h3>
          <p className="article-p">
            Required for the site to work or for secure delivery. These are not used for
            marketing or analytics profiling.
          </p>
          <ul className="article-ul">
            <li>
              <strong>Hosting &amp; security (Vercel):</strong> Short-lived technical cookies
              may be set to route traffic, prevent abuse, or balance load. I do not control
              their exact names; they depend on how the page is served.
            </li>
            <li>
              <strong>Draft preview (staging / Studio preview only):</strong> If you open a
              draft preview link, Next.js may set a short-lived cookie so preview mode works.
              This does not apply to normal visits on the public site.
            </li>
          </ul>

          <h3 className="article-h3">Preferences (always on your device)</h3>
          <p className="article-p">
            These remember your cookie choice. They are not used to track you across other
            websites.
          </p>
          <ul className="article-ul">
            <li>
              <strong>
                <code className="article-inline-code">cookie_consent_v1</code> (local
                storage):
              </strong>{" "}
              Stores whether you accepted or rejected analytics (<code className="article-inline-code">analytics</code> or{" "}
              <code className="article-inline-code">rejected</code>). Kept until you clear site
              data or reopen cookie settings (footer or banner).
            </li>
          </ul>

          <h3 className="article-h3">Analytics (only if you accept)</h3>
          <p className="article-p">
            If you click <strong>Accept analytics</strong>, Google Tag Manager may load Google
            Analytics (and related first-party measurement on my server-side tagging host).
            IP addresses are anonymized in Google Analytics settings, and I do not use ad
            personalization. Typical cookies include:
          </p>

          <p className="article-p">
            <strong>On simonask.io</strong>
          </p>
          <ul className="article-ul">
            <li>
              <strong>
                <code className="article-inline-code">_ga</code>,{" "}
                <code className="article-inline-code">_ga_*</code> (Google):
              </strong>{" "}
              Distinguish visitors and sessions for anonymous usage statistics. Often up to
              about 2 years.
            </li>
            <li>
              <strong>
                <code className="article-inline-code">_gcl_au</code> (Google):
              </strong>{" "}
              May be set by Google tags to measure ad-related conversions; ad storage remains
              denied in my consent setup, but this cookie can still appear when analytics is
              enabled. Often about 3 months.
            </li>
            <li>
              <strong>
                <code className="article-inline-code">FPID</code>,{" "}
                <code className="article-inline-code">FPLC</code> (.simonask.io):
              </strong>{" "}
              First-party identifiers used with server-side tagging so measurement works even
              when third-party cookies are restricted. <code className="article-inline-code">FPID</code> is often up to about 2 years;{" "}
              <code className="article-inline-code">FPLC</code> is shorter-lived (session or
              weeks).
            </li>
          </ul>

          <p className="article-p">
            <strong>On serverside.simonask.io</strong>
          </p>
          <p className="article-p">
            My server-side Google Tag Manager endpoint may set its own first-party cookies
            when analytics is accepted, for example:
          </p>
          <ul className="article-ul">
            <li>
              <strong>
                <code className="article-inline-code">_ga</code>,{" "}
                <code className="article-inline-code">_ga_*</code> (Google):
              </strong>{" "}
              Same role as on the main site — usage measurement on the tagging subdomain.
            </li>
            <li>
              <strong>
                <code className="article-inline-code">FPID</code>,{" "}
                <code className="article-inline-code">FPLC</code>:
              </strong>{" "}
              Server-side measurement identifiers tied to the tagging setup above.
            </li>
          </ul>

          <h3 className="article-h3">Third-party cookies you may see</h3>
          <p className="article-p">
            In browser developer tools, you might also notice cookies from{" "}
            <strong>sanity.io</strong> (for example names starting with{" "}
            <code className="article-inline-code">rl_</code> or{" "}
            <code className="article-inline-code">_tw</code>). Those come from{" "}
            <strong>Sanity&apos;s hosted Studio and services</strong>, not from ordinary reading
            of the public site. They can appear if you use Studio, embedded preview, or have
            recently visited <strong>simonask.sanity.studio</strong> in the same browser. I do
            not use Sanity cookies to run analytics on simonask.io for visitors who only read
            published pages.
          </p>

          <h2 className="article-h2">What I do not use cookies for</h2>
          <ul className="article-ul">
            <li>Selling personal data or sharing it for cross-site advertising</li>
            <li>Social media pixels or remarketing tags on this site</li>
            <li>Requiring analytics cookies to read public content</li>
          </ul>

          <h2 className="article-h2">Managing cookies in your browser</h2>
          <p className="article-p">
            You can block or delete cookies in your browser settings. If you delete everything
            for simonask.io, you will see the consent banner again. Blocking all cookies may
            break some site features (for example remembering your preference).
          </p>

          <h2 className="article-h2">Questions</h2>
          <p className="article-p">
            If something here does not match what you see in your browser, or you want help
            clearing data, email{" "}
            <a href={contactMailto} className="article-link">
              {contactEmail}
            </a>
            .
          </p>

          <p className="article-p mt-10 flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Privacy Policy →
            </Link>
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              ← Home
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
