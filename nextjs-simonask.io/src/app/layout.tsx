import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";

import { ConsentDefaults } from "@/components/consent-defaults";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleTagManagerHead, GoogleTagManagerNoscript } from "@/components/google-tag-manager";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StagingBanner } from "@/components/staging-banner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simon Ask",
    template: "%s · Simon Ask",
  },
  description:
    "Personal portfolio — digital analytics and the web. Writing that shows how I work.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <ConsentDefaults />
        <GoogleTagManagerHead />
      </head>
      <body className="flex min-h-full flex-col">
        <GoogleTagManagerNoscript />
        <ScrollToHash />
        <StagingBanner />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieConsent />
        <SpeedInsights />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
