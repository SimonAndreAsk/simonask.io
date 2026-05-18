import { type SanityDocument } from "next-sanity";

import { OpenForWorkBadge } from "@/components/open-for-work-badge";
import { PostList } from "@/components/post-list";
import { isStagingSite } from "@/sanity/env";
import { sanityFetch } from "@/sanity/load";
import { POSTS_QUERY } from "@/sanity/queries";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const posts = await sanityFetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-8 sm:py-20">
      <section className="mb-16 sm:mb-20">
        <OpenForWorkBadge />
        <h1 className="mt-8 font-display text-4xl leading-[1.15] tracking-tight text-foreground sm:text-5xl">
          Hi, I&apos;m Simon.
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
          This is my digital home. Here, I write about what I&apos;m learning
          while exploring digital analytics, AI, and related topics in my free
          time.
        </p>
      </section>

      <section id="articles">
        <h2 className="mb-6 font-display text-2xl tracking-tight text-foreground">
          Articles
        </h2>
        {isStagingSite || posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-muted leading-relaxed">
            Articles are on the way — check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
