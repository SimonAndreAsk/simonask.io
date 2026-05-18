import { isStagingSite } from "@/sanity/env";

export function StagingBanner() {
  if (!isStagingSite) return null;

  return (
    <div
      role="status"
      className="border-b border-open-green/30 bg-open-green/10 px-4 py-2 text-center text-sm text-foreground"
    >
      Staging preview — unpublished drafts may appear here.
    </div>
  );
}
