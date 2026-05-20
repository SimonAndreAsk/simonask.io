import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { SiteIcon } from "@/components/site-icon";
import { projectLinkLabel } from "@/lib/project-link";
import { urlFor } from "@/sanity/image";

function isDraftProject(project: SanityDocument) {
  return project._id.startsWith("drafts.");
}

const THUMB_SIZE = 80;

function projectThumbnail(project: SanityDocument): {
  src: string | null;
  alt: string;
} {
  const title =
    typeof project.title === "string" ? project.title : "Project";
  const alt =
    typeof project.image === "object" &&
    project.image !== null &&
    "alt" in project.image &&
    typeof project.image.alt === "string" &&
    project.image.alt.trim()
      ? project.image.alt
      : `${title} thumbnail`;

  if (!project.image || !urlFor(project.image)) {
    return { src: null, alt };
  }

  const src =
    urlFor(project.image)
      ?.width(THUMB_SIZE * 2)
      .height(THUMB_SIZE * 2)
      .fit("crop")
      .auto("format")
      .quality(85)
      .url() ?? null;

  return { src, alt };
}

export function ProjectList({ projects }: { projects: SanityDocument[] }) {
  if (projects.length === 0) {
    return (
      <p className="leading-relaxed text-muted">
        I haven&apos;t listed a project here yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="border-t border-border/40">
      {projects.map((project) => {
        const draft = isDraftProject(project);
        const href = typeof project.url === "string" ? project.url : "";
        const { src: thumbUrl, alt: thumbAlt } = projectThumbnail(project);
        const linkLabel = href ? projectLinkLabel(href) : "View project";
        const title =
          typeof project.title === "string" ? project.title : "Project";

        return (
          <li key={project._id} className="border-b border-border/40">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[5rem_1fr] items-center gap-x-4 py-5 transition-colors hover:text-open-green"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-border/50">
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={thumbAlt}
                    width={THUMB_SIZE}
                    height={THUMB_SIZE}
                    className="size-20 object-cover object-center"
                  />
                ) : (
                  <div
                    className="flex size-20 items-center justify-center bg-surface/80 font-display text-xl text-muted"
                    aria-hidden
                  >
                    {title.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                    {project.title}
                  </h3>
                  {draft && (
                    <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                      Draft
                    </span>
                  )}
                </div>
                {typeof project.summary === "string" && project.summary.trim() ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-foreground/80">
                    {project.summary}
                  </p>
                ) : null}
                {href ? (
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-open-green">
                    <span>{linkLabel}</span>
                    <SiteIcon
                      icon={ArrowRight}
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </p>
                ) : null}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
