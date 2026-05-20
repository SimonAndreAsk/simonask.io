import { type ProjectTag } from "@/lib/project-tags";

const tagClassName =
  "inline-block rounded-full border border-border/70 bg-surface px-2.5 py-0.5 text-xs font-medium leading-snug text-muted";

type ProjectTagsProps = {
  tags: ProjectTag[];
  /** Accessible name for the tag list, e.g. "Tools used" or "Categories". */
  listLabel?: string;
};

export function ProjectTags({ tags, listLabel = "Tools used" }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={listLabel}>
      {tags.map((tag) => (
        <li key={tag._id}>
          <span className={tagClassName}>{tag.label}</span>
        </li>
      ))}
    </ul>
  );
}
