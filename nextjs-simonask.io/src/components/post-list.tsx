import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { LabelPills } from "@/components/label-pills";
import { SiteIcon } from "@/components/site-icon";
import { formatDate } from "@/lib/format";
import { readingMinutes, truncateExcerpt } from "@/lib/post-excerpt";
import { postCategoriesFromSanity } from "@/lib/content-labels";

function isDraftPost(post: SanityDocument) {
  return post._id.startsWith("drafts.");
}

const READ_LABEL = "Read article";

function postExcerpt(post: SanityDocument): string | null {
  const raw =
    typeof post.excerpt === "string" && post.excerpt.trim()
      ? post.excerpt.trim()
      : typeof post.excerptText === "string" && post.excerptText.trim()
        ? post.excerptText.trim()
        : null;

  if (!raw) return null;
  return truncateExcerpt(raw);
}

function postAriaLabel(
  title: string,
  readMinutes: number | null,
  hasSlug: boolean,
) {
  const readHint = readMinutes ? `, ${readMinutes} min read` : "";
  if (!hasSlug) return `${title}${readHint}`;
  return `${title}${readHint} — ${READ_LABEL}`;
}

type PostDestinationProps = {
  className?: string;
  arrowClassName?: string;
};

function PostDestination({ className = "", arrowClassName = "" }: PostDestinationProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-open-green",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteIcon icon={FileText} className="size-4 shrink-0" />
      <span>{READ_LABEL}</span>
      <SiteIcon
        icon={ArrowRight}
        className={["size-4 shrink-0 transition-transform", arrowClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </span>
  );
}

export function PostList({ posts }: { posts: SanityDocument[] }) {
  if (posts.length === 0) {
    return (
      <p className="leading-relaxed text-muted">
        I haven&apos;t published anything here yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4">
      {posts.map((post) => {
        const draft = isDraftPost(post);
        const slug =
          typeof post.slug === "object" &&
          post.slug !== null &&
          "current" in post.slug &&
          typeof post.slug.current === "string"
            ? post.slug.current
            : "";
        const href = slug ? `/${slug}` : "#";
        const hasSlug = Boolean(slug);
        const excerpt = postExcerpt(post);
        const readMinutes =
          typeof post.excerptText === "string" && post.excerptText.trim()
            ? readingMinutes(post.excerptText)
            : excerpt
              ? readingMinutes(excerpt)
              : null;
        const title = typeof post.title === "string" ? post.title : "Article";
        const showMeta = Boolean(post.publishedAt || readMinutes);
        const categories = postCategoriesFromSanity(post.categories);

        return (
          <li key={post._id} className="h-full min-h-0">
            <Link
              href={href}
              aria-label={postAriaLabel(title, readMinutes, hasSlug)}
              className="group flex h-full min-h-56 flex-col rounded-xl bg-surface/40 px-8 pb-6 pt-8 ring-1 ring-border/50 transition-colors hover:text-open-green"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                {categories.length > 0 ? (
                  <LabelPills labels={categories} listLabel="Categories" />
                ) : null}
                <div className="mt-auto flex flex-col gap-1.5 pt-14">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                      {post.title}
                    </h3>
                    {draft && (
                      <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                        Draft
                      </span>
                    )}
                  </div>

                  {showMeta ? (
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted tabular-nums">
                      {post.publishedAt ? (
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      ) : null}
                      {post.publishedAt && readMinutes ? (
                        <span aria-hidden className="text-border">
                          ·
                        </span>
                      ) : null}
                      {readMinutes ? <span>{readMinutes} min read</span> : null}
                    </p>
                  ) : null}

                  {excerpt ? (
                    <p className="line-clamp-2 text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                      {excerpt}
                    </p>
                  ) : (
                    <p className="text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                      Open to read the full article.
                    </p>
                  )}

                  <PostDestination
                    className="mt-0 min-h-11 items-center"
                    arrowClassName="group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
