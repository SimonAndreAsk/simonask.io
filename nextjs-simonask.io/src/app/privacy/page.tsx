import type { Metadata } from "next";
import Link from "next/link";

import { OpenCookieSettingsButton } from "@/components/open-cookie-settings-button";
import { contactEmail, contactMailto } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data this site collects, why analytics is used, and how you can control cookies.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <article className="article-page">
        <header className="mb-10 sm:mb-12">
          <h1 className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted tabular-nums">Last updated: May 2026</p>
        </header>

        <div className="article-body">
          <p className="article-p">
            I believe in keeping things transparent. This page explains what happens to your
            data when you visit my personal site. For a list of cookies and how to control
            them, see the{" "}
            <Link href="/cookies" className="article-link">
              Cookie Policy
            </Link>
            .
          </p>

          <h2 className="article-h2">What I collect &amp; why</h2>
          <p className="article-p">
            <strong>Analytics — help me understand site usage:</strong> I track basic, anonymous
            interaction data (like which blog posts get read the most or what size screen you are
            using).
          </p>
          <blockquote className="article-blockquote">
            <p className="article-p">
              <strong>The guest book analogy:</strong> Think of web analytics like a museum guest
              book. It tells me &ldquo;50 people visited the gallery today, and most of them looked
              at the portfolio room.&rdquo; It does not follow you home, look over your shoulder, or
              ask for your name.
            </p>
          </blockquote>

          <h2 className="article-h2">Third parties involved</h2>
          <p className="article-p">
            <strong>Google Analytics:</strong> I use Google Analytics to compile these anonymous
            reports. Google drops a cookie (a small text file) in your browser to recognize if
            you&apos;ve visited before. Your IP address is automatically anonymized before
            it&apos;s ever saved.
          </p>

          <h2 className="article-h2">Data retention</h2>
          <p className="article-p">
            I don&apos;t hold onto data forever. Anonymous analytics data sent to Google Analytics
            is automatically deleted after 14 months (the minimum standard setting).
          </p>

          <h2 className="article-h2">Your rights &amp; control</h2>
          <p className="article-p">
            <strong>Access &amp; erase:</strong> Even though the data is anonymous, you have total
            control. If you ever want me to double-check or delete any footprint you think might be
            left behind, just reach out to me directly at{" "}
            <a href={contactMailto} className="article-link">
              {contactEmail}
            </a>
            .
          </p>
          <p className="article-p">
            <strong>Change your mind?</strong> You can change your cookie preferences at any time
            by clicking the button below:
          </p>
          <p className="article-p">
            <OpenCookieSettingsButton />
          </p>

          <p className="article-p mt-10 flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/cookies"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Cookie Policy →
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
