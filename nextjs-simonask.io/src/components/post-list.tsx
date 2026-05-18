import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { formatDate } from "@/lib/format";

function isDraftPost(post: SanityDocument) {
  return post._id.startsWith("drafts.");
}

export function PostList({ posts }: { posts: SanityDocument[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-muted leading-relaxed">
        No articles yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border/60">
      {posts.map((post) => {
        const draft = isDraftPost(post);

        return (
          <li key={post._id}>
            <Link
              href={`/${post.slug.current}`}
              className="group flex items-center gap-4 rounded-lg border border-transparent px-6 py-4 transition-colors hover:border-border hover:bg-surface/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green">
                    {post.title}
                  </h2>
                  {draft && (
                    <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs font-medium text-open-green">
                      Draft
                    </span>
                  )}
                </div>
                <time
                  dateTime={post.publishedAt}
                  className="mt-1.5 block text-sm text-muted tabular-nums"
                >
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <span
                className="shrink-0 text-lg text-muted opacity-0 transition-[opacity,transform,color] group-hover:translate-x-0.5 group-hover:text-open-green group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
