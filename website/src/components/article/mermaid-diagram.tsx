"use client";

import { useEffect, useId, useRef, useState } from "react";

import { buildMermaidConfig } from "@/lib/article/mermaid-theme";

type MermaidDiagramProps = {
  code: string;
};

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderSeq = useRef(0);
  const baseId = useId().replace(/:/g, "_");
  const [error, setError] = useState<string | null>(null);

  const trimmed = code.trim();

  useEffect(() => {
    if (!trimmed || !containerRef.current) return;

    const container = containerRef.current;
    let cancelled = false;
    const renderId = `mermaid-${baseId}-${++renderSeq.current}`;

    async function render() {
      setError(null);
      container.innerHTML = "";

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize(buildMermaidConfig());

        const { svg, bindFunctions } = await mermaid.render(renderId, trimmed);

        if (cancelled) return;

        container.innerHTML = svg;
        bindFunctions?.(container);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not render diagram",
          );
        }
      }
    }

    void render();

    return () => {
      cancelled = true;
    };
  }, [trimmed, baseId]);

  if (!trimmed) return null;

  if (error) {
    return (
      <figure className="article-mermaid article-mermaid--error">
        <p className="article-mermaid-error" role="alert">
          Diagram could not be rendered: {error}
        </p>
        <pre className="article-mermaid-source">
          <code>{code}</code>
        </pre>
      </figure>
    );
  }

  return (
    <figure className="article-mermaid">
      <div
        ref={containerRef}
        className="article-mermaid-viewer"
        aria-label="Architecture diagram"
      />
    </figure>
  );
}
