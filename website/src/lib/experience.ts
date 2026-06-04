import { type SanityDocument } from "next-sanity";

import type { ProfileEntry } from "@/lib/profile";

export function experienceEntriesFromSanity(
  docs: SanityDocument[],
): ProfileEntry[] {
  return docs.map((doc) => {
    const title = typeof doc.title === "string" ? doc.title : "Experience";
    const subtitle =
      typeof doc.subtitle === "string" ? doc.subtitle : undefined;
    const period = typeof doc.period === "string" ? doc.period : undefined;
    const href = typeof doc.href === "string" ? doc.href : undefined;
    const details = Array.isArray(doc.details)
      ? doc.details.filter(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        )
      : undefined;

    return {
      title,
      subtitle,
      period,
      href,
      details: details?.length ? details : undefined,
    };
  });
}
