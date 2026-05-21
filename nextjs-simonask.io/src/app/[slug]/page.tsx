import { type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArticleBody } from "@/components/article-body";
import { ArticleTableOfContents } from "@/components/article-table-of-contents";
import {
  extractArticleHeadings,
  headingIdsByBlockKey,
} from "@/lib/article-headings";
import { SectionLink } from "@/components/section-link";
import { formatDate } from "@/lib/format";
import { client } from "@/sanity/client";
import { isStagingSite } from "@/sanity/env";
import { urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/load";
import { POST_QUERY, SLUGS_QUERY } from "@/sanity/queries";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

const options = { next: { revalidate: 30 } };

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(SLUGS_QUERY, {}, options);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityDocument | null>(
    POST_QUERY,
    { slug },
    { ...options, stega: false },
  );

  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: `My notes from the work behind this piece—published ${formatDate(post.publishedAt)}.`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<SanityDocument | null>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) notFound();

  const headings = extractArticleHeadings(post.body);
  const headingIds = headingIdsByBlockKey(headings);

  const isDraft = post._id.startsWith("drafts.");
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).fit("crop").url()
    : null;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <SectionLink
        href={sectionHref(SITE_SECTIONS.writing)}
        className="mb-10 inline-flex text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Writing
      </SectionLink>

      {isDraft && isStagingSite && (
        <p
          role="status"
          className="mb-6 rounded-lg border border-open-green/40 bg-open-green/10 px-4 py-2 text-sm text-foreground"
        >
          Draft preview — not visible on simonask.io until you publish in
          Sanity Studio.
        </p>
      )}

      <article className="article-page">
        <header className="mb-10 sm:mb-12">
          <time
            dateTime={post.publishedAt}
            className="text-sm text-muted tabular-nums"
          >
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </header>

        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={typeof post.title === "string" ? post.title : "Article cover"}
            className="mb-12 aspect-[16/9] w-full rounded-lg object-cover"
            width={1200}
            height={630}
          />
        )}

        {headings.length > 0 ? (
          <ArticleTableOfContents headings={headings} />
        ) : null}

        <ArticleBody value={post.body} headingIds={headingIds} />
      </article>
    </main>
  );
}
