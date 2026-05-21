export type ArticleHeading = {
  id: string;
  /** H2: "1", "2", … — H3: "1.1", "1.2", … under the current H2 */
  number: string;
  text: string;
  level: 2 | 3;
  blockKey: string;
};

type PortableTextSpan = { _type?: string; text?: string };
type PortableTextBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
};

function blockPlainText(children: PortableTextSpan[] | undefined): string {
  if (!children?.length) return "";
  return children.map((span) => span.text ?? "").join("").trim();
}

export function slugifyHeading(text: string): string {
  const slug = text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

type HeadingDraft = Omit<ArticleHeading, "id" | "number">;

function assignUniqueIds(headings: HeadingDraft[]): ArticleHeading[] {
  const used = new Set<string>();
  let h2Count = 0;
  let h3Count = 0;

  return headings.map((heading) => {
    const base = slugifyHeading(heading.text);
    let id = base;
    let suffix = 2;

    while (used.has(id)) {
      id = `${base}-${suffix}`;
      suffix += 1;
    }

    used.add(id);

    let number: string;
    if (heading.level === 2) {
      h2Count += 1;
      h3Count = 0;
      number = String(h2Count);
    } else {
      if (h2Count === 0) h2Count = 1;
      h3Count += 1;
      number = `${h2Count}.${h3Count}`;
    }

    return { ...heading, id, number };
  });
}

/** h2/h3 blocks from Sanity portable text, in document order. */
export function extractArticleHeadings(body: unknown): ArticleHeading[] {
  if (!Array.isArray(body)) return [];

  const raw: HeadingDraft[] = [];

  for (const node of body as PortableTextBlock[]) {
    if (node._type !== "block") continue;
    if (node.style !== "h2" && node.style !== "h3") continue;

    const text = blockPlainText(node.children);
    if (!text || !node._key) continue;

    raw.push({
      text,
      level: node.style === "h3" ? 3 : 2,
      blockKey: node._key,
    });
  }

  return assignUniqueIds(raw);
}

export function headingIdsByBlockKey(
  headings: ArticleHeading[],
): Record<string, string> {
  return Object.fromEntries(headings.map((h) => [h.blockKey, h.id]));
}
