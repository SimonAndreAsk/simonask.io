import { type ContentLabel } from "@/lib/content-labels";

const pillClassName =
  "inline-block rounded-md border border-border/70 bg-surface px-2.5 py-0.5 text-xs font-medium leading-snug text-muted";

type LabelPillsProps = {
  labels: ContentLabel[];
  /** Accessible name for the list, e.g. "Technologies" or "Categories". */
  listLabel?: string;
};

export function LabelPills({
  labels,
  listLabel = "Technologies",
}: LabelPillsProps) {
  if (labels.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={listLabel}>
      {labels.map((label) => (
        <li key={label._id}>
          <span className={pillClassName}>{label.label}</span>
        </li>
      ))}
    </ul>
  );
}
