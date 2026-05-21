import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { GithubIcon, SiteIcon } from "@/components/site-icon";
import { LabelPills } from "@/components/label-pills";
import { technologiesFromSanity } from "@/lib/content-labels";
import { formatDate } from "@/lib/format";
import { isGithubProjectUrl, projectLinkLabel } from "@/lib/project-link";
import { readingMinutes } from "@/lib/post-excerpt";

function isDraftProject(project: SanityDocument) {
  return project._id.startsWith("drafts.");
}

function isProjectArticle(item: SanityDocument) {
  return item._type === "post";
}

function postSlug(item: SanityDocument): string {
  if (
    typeof item.slug === "object" &&
    item.slug !== null &&
    "current" in item.slug &&
    typeof item.slug.current === "string"
  ) {
    return item.slug.current;
  }
  return "";
}

function postSummaryPreview(item: SanityDocument): string | null {
  const text =
    typeof item.readingText === "string" ? item.readingText.trim() : "";
  if (!text) return null;
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trimEnd()}…`;
}

const READ_ARTICLE_LABEL = "Read article";

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
  showArticleIcon = false,
  className = "",
  arrowClassName = "",
}: ProjectDestinationProps & { showArticleIcon?: boolean }) {
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
      {showArticleIcon ? <SiteIcon icon={FileText} className="size-4 shrink-0" /> : null}
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

  const cardClassName =
    "group flex min-h-56 flex-col rounded-xl bg-surface/40 px-8 pb-6 pt-8 ring-1 ring-border/50 transition-colors hover:text-open-green";

  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project) => {
        const draft = isDraftProject(project);
        const title =
          typeof project.title === "string" ? project.title : "Project";

        if (isProjectArticle(project)) {
          const slug = postSlug(project);
          const href = slug ? `/${slug}` : "#";
          const hasSlug = Boolean(slug);
          const technologies = technologiesFromSanity(project.technologies);
          const summary = postSummaryPreview(project);
          const readMinutes =
            typeof project.readingText === "string" && project.readingText.trim()
              ? readingMinutes(project.readingText)
              : null;
          const showMeta = Boolean(project.publishedAt || readMinutes);
          const readHint = readMinutes ? `, ${readMinutes} min read` : "";
          const ariaLabel = hasSlug
            ? `${title}${readHint} — ${READ_ARTICLE_LABEL}`
            : `${title}${readHint}`;

          return (
            <li key={project._id}>
              <Link
                href={href}
                aria-label={ariaLabel}
                className={cardClassName}
              >
                <div className="flex min-h-0 flex-1 flex-col">
                  {technologies.length > 0 ? (
                    <LabelPills labels={technologies} />
                  ) : null}
                  <div className="mt-auto flex flex-col gap-1.5 pt-14">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                        {title}
                      </h3>
                      {draft ? (
                        <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                          Draft
                        </span>
                      ) : null}
                    </div>

                    {summary ? (
                      <p className="line-clamp-2 text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                        {summary}
                      </p>
                    ) : (
                      <p className="text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                        Read the full write-up on this site.
                      </p>
                    )}

                    {showMeta ? (
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted tabular-nums">
                        {project.publishedAt ? (
                          <time dateTime={project.publishedAt}>
                            {formatDate(project.publishedAt)}
                          </time>
                        ) : null}
                        {project.publishedAt && readMinutes ? (
                          <span aria-hidden className="text-border">
                            ·
                          </span>
                        ) : null}
                        {readMinutes ? <span>{readMinutes} min read</span> : null}
                      </p>
                    ) : null}

                    <ProjectDestination
                      linkLabel={READ_ARTICLE_LABEL}
                      showGithubIcon={false}
                      showArticleIcon
                      className="mt-0 min-h-11 items-center"
                      arrowClassName="group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        }

        const href = typeof project.url === "string" ? project.url : "";
        const hasHref = Boolean(href);
        const linkLabel = hasHref ? projectLinkLabel(href) : "View project";
        const showGithubIcon = hasHref ? isGithubProjectUrl(href) : false;
        const summary = projectSummary(project);
        const technologies = technologiesFromSanity(project.technologies);

        return (
          <li key={project._id}>
            <a
              href={href || undefined}
              target={hasHref ? "_blank" : undefined}
              rel={hasHref ? "noopener noreferrer" : undefined}
              aria-label={projectAriaLabel(title, linkLabel, hasHref)}
              className={cardClassName}
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
