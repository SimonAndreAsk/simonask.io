import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { GithubIcon, SiteIcon } from "@/components/site-icon";
import { LabelPills } from "@/components/label-pills";
import { isGithubProjectUrl, projectLinkLabel } from "@/lib/project-link";
import { technologiesFromSanity } from "@/lib/content-labels";

function isDraftProject(project: SanityDocument) {
  return project._id.startsWith("drafts.");
}

function projectSummary(project: SanityDocument): string | null {
  if (typeof project.summary === "string" && project.summary.trim()) {
    return project.summary.trim();
  }
  return null;
}

function projectAriaLabel(title: string, linkLabel: string, hasHref: boolean) {
  if (!hasHref) return title;
  return `${title} — ${linkLabel} (opens in new tab)`;
}

type ProjectDestinationProps = {
  linkLabel: string;
  showGithubIcon: boolean;
  className?: string;
  arrowClassName?: string;
};

function ProjectDestination({
  linkLabel,
  showGithubIcon,
  className = "",
  arrowClassName = "",
}: ProjectDestinationProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-open-green",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showGithubIcon ? <GithubIcon className="size-4 shrink-0" /> : null}
      <span>{linkLabel}</span>
      <SiteIcon
        icon={ArrowRight}
        className={["size-4 shrink-0 transition-transform", arrowClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </span>
  );
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
    <ul className="flex flex-col gap-4">
      {projects.map((project) => {
        const draft = isDraftProject(project);
        const href = typeof project.url === "string" ? project.url : "";
        const hasHref = Boolean(href);
        const linkLabel = hasHref ? projectLinkLabel(href) : "View project";
        const showGithubIcon = hasHref ? isGithubProjectUrl(href) : false;
        const title =
          typeof project.title === "string" ? project.title : "Project";
        const summary = projectSummary(project);
        const technologies = technologiesFromSanity(project.technologies);

        return (
          <li key={project._id}>
            <a
              href={href || undefined}
              target={hasHref ? "_blank" : undefined}
              rel={hasHref ? "noopener noreferrer" : undefined}
              aria-label={projectAriaLabel(title, linkLabel, hasHref)}
              className="group flex min-h-56 flex-col rounded-xl bg-surface/40 px-8 pb-6 pt-8 ring-1 ring-border/50 transition-colors hover:text-open-green"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                {technologies.length > 0 ? (
                  <LabelPills labels={technologies} />
                ) : null}
                <div className="mt-auto flex flex-col gap-1.5 pt-14">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                    {project.title}
                  </h3>
                  {draft && (
                    <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                      Draft
                    </span>
                  )}
                </div>

                {summary ? (
                  <p className="line-clamp-2 text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                    {summary}
                  </p>
                ) : (
                  <p className="text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                    Open to see the repo or live site.
                  </p>
                )}

                {hasHref ? (
                  <ProjectDestination
                    linkLabel={linkLabel}
                    showGithubIcon={showGithubIcon}
                    className="mt-0 min-h-11 items-center"
                    arrowClassName="group-hover:translate-x-0.5"
                  />
                ) : null}
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
