export type ContentLabel = {
  _id: string;
  label: string;
};

/** Shared parser for `projectTechnology` and `postCategory` references. */
export function labelsFromSanity(labels: unknown): ContentLabel[] {
  if (!Array.isArray(labels)) return [];

  return labels
    .map((label) => {
      if (!label || typeof label !== "object") return null;
      const record = label as Record<string, unknown>;
      const id = typeof record._id === "string" ? record._id : null;
      const text =
        typeof record.label === "string" ? record.label.trim() : null;

      if (!id || !text) return null;

      return { _id: id, label: text };
    })
    .filter((label): label is ContentLabel => label !== null);
}

export function technologiesFromSanity(technologies: unknown): ContentLabel[] {
  return labelsFromSanity(technologies);
}

export function postCategoriesFromSanity(categories: unknown): ContentLabel[] {
  return labelsFromSanity(categories);
}

/** Posts with this category label appear under Projects, not Writing. */
export const PROJECT_POST_CATEGORY_LABEL = "Project";

export function postHasCategory(
  categories: unknown,
  label: string,
): boolean {
  return postCategoriesFromSanity(categories).some((c) => c.label === label);
}

export function isProjectPost(post: Record<string, unknown>): boolean {
  return postHasCategory(post.categories, PROJECT_POST_CATEGORY_LABEL);
}

export function partitionPostsForHomepage<T extends Record<string, unknown>>(
  posts: T[],
): { projectPosts: T[]; writingPosts: T[] } {
  const projectPosts: T[] = [];
  const writingPosts: T[] = [];

  for (const post of posts) {
    if (isProjectPost(post)) projectPosts.push(post);
    else writingPosts.push(post);
  }

  return { projectPosts, writingPosts };
}

export function mergeHomepageProjectsByDate<T extends Record<string, unknown>>(
  projects: T[],
  projectPosts: T[],
): T[] {
  return [...projects, ...projectPosts].sort((a, b) => {
    const aDate = typeof a.publishedAt === "string" ? a.publishedAt : "";
    const bDate = typeof b.publishedAt === "string" ? b.publishedAt : "";
    return bDate.localeCompare(aDate);
  });
}
