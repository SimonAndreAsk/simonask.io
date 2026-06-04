/** Design tokens — keep in sync with `globals.css` `:root`. */
const FALLBACK = {
  background: "#f4f3ef",
  foreground: "#1c1917",
  muted: "#78716c",
  accent: "#0f766e",
  border: "#e3e1db",
  surface: "#eae9e3",
} as const;

function readCssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/**
 * Mermaid theme aligned with simonask.io and common data-architecture diagram conventions:
 * light canvas, white process nodes, muted edges, accent for routing/decisions.
 */
export function buildMermaidThemeVariables() {
  const background = readCssVar("--background", FALLBACK.background);
  const foreground = readCssVar("--foreground", FALLBACK.foreground);
  const muted = readCssVar("--muted", FALLBACK.muted);
  const accent = readCssVar("--accent", FALLBACK.accent);
  const border = readCssVar("--border", FALLBACK.border);
  const surface = readCssVar("--surface", FALLBACK.surface);

  return {
    background,
    mainBkg: "#ffffff",
    secondBkg: surface,
    tertiaryBkg: background,
    primaryColor: "#ffffff",
    primaryTextColor: foreground,
    primaryBorderColor: border,
    secondaryColor: surface,
    secondaryTextColor: foreground,
    secondaryBorderColor: border,
    tertiaryColor: accent,
    tertiaryTextColor: "#ffffff",
    tertiaryBorderColor: accent,
    lineColor: muted,
    textColor: foreground,
    titleColor: muted,
    nodeBorder: border,
    clusterBkg: background,
    clusterBorder: border,
    defaultLinkColor: muted,
    edgeLabelBackground: background,
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontSize: "13px",
  };
}

export function buildMermaidConfig() {
  return {
    startOnLoad: false,
    securityLevel: "strict" as const,
    theme: "base" as const,
    themeVariables: buildMermaidThemeVariables(),
    flowchart: {
      htmlLabels: true,
      curve: "basis" as const,
      padding: 20,
      nodeSpacing: 56,
      rankSpacing: 72,
      diagramPadding: 20,
      useMaxWidth: true,
    },
    sequence: {
      diagramMarginX: 24,
      diagramMarginY: 16,
      actorMargin: 64,
      width: 180,
      boxMargin: 12,
      boxTextMargin: 8,
      noteMargin: 12,
      messageMargin: 40,
      mirrorActors: true,
    },
  };
}
