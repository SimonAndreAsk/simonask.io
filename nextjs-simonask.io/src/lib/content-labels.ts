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
