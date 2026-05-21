"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { scrollToSection } from "@/lib/scroll-to-section";

/** Smooth scroll to URL hash after navigation (home sections, article headings). */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) scrollToSection(id);
    };

    run();
    const t = window.setTimeout(run, 50);
    const t2 = window.setTimeout(run, 300);
    window.addEventListener("hashchange", run);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", run);
    };
  }, [pathname]);

  return null;
}
