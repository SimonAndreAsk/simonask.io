"use client";

import type { ArticleHeading } from "@/lib/article-headings";
import { scrollToSection } from "@/lib/scroll-to-section";

type ArticleTableOfContentsProps = {
  headings: ArticleHeading[];
};

export function ArticleTableOfContents({
  headings,
}: ArticleTableOfContentsProps) {
  if (headings.length === 0) return null;

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    event.preventDefault();
    scrollToSection(id);
    window.history.pushState(null, "", `#${id}`);
  }

  return (
    <nav className="article-toc" aria-label="Table of contents">
      <p className="article-toc-label">Table of Contents</p>
      <ol className="article-toc-list">
        {headings.map((heading) => (
          <li
            key={heading.blockKey}
            className={
              heading.level === 3
                ? "article-toc-item article-toc-item--h3"
                : "article-toc-item article-toc-item--h2"
            }
          >
            <a
              href={`#${heading.id}`}
              className={
                heading.level === 3
                  ? "article-toc-link article-toc-link--h3"
                  : "article-toc-link article-toc-link--h2"
              }
              onClick={(event) => handleClick(event, heading.id)}
            >
              <span className="article-toc-number">{heading.number}</span>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
