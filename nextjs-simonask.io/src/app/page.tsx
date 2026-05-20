import { type SanityDocument } from "next-sanity";

import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroContactActions } from "@/components/hero-contact-actions";
import { HeroIntroMeta, HeroMobileLocationRow } from "@/components/hero-intro-meta";
import { PostList } from "@/components/post-list";
import { ProjectList } from "@/components/project-list";
import { SectionLink } from "@/components/section-link";
import { sanityFetch } from "@/sanity/load";
import { POSTS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

const introLinkClass = "intro-inline-link";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    sanityFetch<SanityDocument[]>(POSTS_QUERY, {}, options),
    sanityFetch<SanityDocument[]>(PROJECTS_QUERY, {}, options),
  ]);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14 sm:px-8 sm:py-20">
      <section className="mb-20 sm:mb-24">
        <div className="flex flex-col">
          <div className="space-y-3">
            <h1
              id="intro"
              className="page-section-title text-center font-display text-4xl leading-[1.12] tracking-tight text-foreground sm:text-left sm:text-5xl"
            >
              Hi, I&apos;m Simon.
            </h1>
            <HeroIntroMeta />
          </div>

          <div className="mt-0 space-y-5 sm:mt-6 sm:space-y-3">
            <p className="mx-auto max-w-lg text-center text-base leading-relaxed text-muted sm:mx-0 sm:text-left sm:text-lg">
              Welcome to my digital home. Feel free to explore my{" "}
              <SectionLink href={sectionHref(SITE_SECTIONS.projects)} className={introLinkClass}>
                projects
              </SectionLink>
              {", "}
              <SectionLink href={sectionHref(SITE_SECTIONS.experience)} className={introLinkClass}>
                experience
              </SectionLink>
              {", "}
              <SectionLink href={sectionHref(SITE_SECTIONS.education)} className={introLinkClass}>
                education
              </SectionLink>
              {", "}
              <SectionLink href={sectionHref(SITE_SECTIONS.writing)} className={introLinkClass}>
                writing
              </SectionLink>
              {" or "}
              <SectionLink href={sectionHref(SITE_SECTIONS.getInTouch)} className={introLinkClass}>
                get in touch with me
              </SectionLink>
              .
            </p>
            <HeroMobileLocationRow />
          </div>

          <HeroContactActions className="mt-12 sm:mt-10" />
        </div>
      </section>

      <ExperienceSection />

      <EducationSection />

      <section className="mb-20 sm:mb-24">
        <h2
          id="projects"
          className="page-section-title font-display text-2xl tracking-tight text-foreground"
        >
          Projects
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Things I&apos;ve shipped or shaped — each entry links out to a repo,
          demo, or write-up.
        </p>
        <div className="mt-8">
          <ProjectList projects={projects} />
        </div>
      </section>

      <section className="pb-4 sm:pb-6">
        <h2
          id="writing"
          className="page-section-title font-display text-2xl tracking-tight text-foreground"
        >
          Writing
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Longer notes and build logs.
        </p>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </section>
    </main>
  );
}
