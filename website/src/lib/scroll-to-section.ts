/** Space between sticky header bottom and section title when scrolling. */
export const SECTION_SCROLL_GAP_PX = 32;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getHeaderHeight(): number {
  const header = document.querySelector("header");
  return header?.getBoundingClientRect().height ?? 68;
}

/** Scroll so the section title sits ~32px below the sticky header. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = getHeaderHeight() + SECTION_SCROLL_GAP_PX;
  const top =
    target.getBoundingClientRect().top + window.scrollY - offset;
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function parseSectionHash(href: string): {
  path: string;
  id: string | null;
} {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { path: href || "/", id: null };
  }
  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1) || null;
  return { path, id };
}
