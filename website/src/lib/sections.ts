/** In-page section IDs on the home page — keep in sync with heading `id`s. */
export const SITE_SECTIONS = {
  intro: "intro",
  experience: "experience",
  education: "education",
  projects: "projects",
  writing: "writing",
  getInTouch: "get-in-touch",
} as const;

export type SiteSectionId =
  (typeof SITE_SECTIONS)[keyof typeof SITE_SECTIONS];

export function sectionHref(id: SiteSectionId): `/#${SiteSectionId}` {
  return `/#${id}`;
}
