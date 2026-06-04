import { ProfileTimeline } from "@/components/home/profile-timeline";
import type { ProfileEntry } from "@/lib/profile";

export function ExperienceSection({ entries }: { entries: ProfileEntry[] }) {
  return (
    <section className="mb-20 sm:mb-24">
      <h2
        id="experience"
        className="page-section-title font-display text-2xl tracking-tight text-foreground"
      >
        Experience
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
        Work and internships — latest first.
      </p>
      <div className="mt-8">
        <ProfileTimeline
          entries={entries}
          emptyMessage="No experience entries yet."
        />
      </div>
    </section>
  );
}
