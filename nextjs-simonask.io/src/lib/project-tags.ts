export type ProjectTag = {
  _id: string;
  label: string;
};

/** Shared parser for `projectTag` and `postCategory` references. */
export function tagsFromSanity(tags: unknown): ProjectTag[] {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => {
      if (!tag || typeof tag !== "object") return null;
      const record = tag as Record<string, unknown>;
      const id = typeof record._id === "string" ? record._id : null;
      const label =
        typeof record.label === "string" ? record.label.trim() : null;

      if (!id || !label) return null;

      return { _id: id, label };
    })
    .filter((tag): tag is ProjectTag => tag !== null);
}

export function projectTagsFromSanity(tags: unknown): ProjectTag[] {
  return tagsFromSanity(tags);
}

export function postCategoriesFromSanity(categories: unknown): ProjectTag[] {
  return tagsFromSanity(categories);
}
