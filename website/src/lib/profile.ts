export const jobTitle = "Digital Analytics Specialist";
export const locationLabel = "Gothenburg, Sweden";

export type ProfileEntry = {
  title: string;
  subtitle?: string;
  period?: string;
  href?: string;
  /** Prose body (e.g. education summary). */
  description?: string;
  details?: string[];
};

/** Aligns with IHM program page (YH-poäng, omfattning, examen). */
export const ihmDigitalAnalyticsProgramUrl =
  "https://www.ihm.se/utbildningar/marknadsforing/digital-analytics-specialist/";

export const education: ProfileEntry[] = [
  {
    title: "IHM Business School",
    subtitle: "Digital Analytics Specialist",
    period: "2024–2026",
    href: ihmDigitalAnalyticsProgramUrl,
    description:
      "Higher Vocational Education programme, 83 weeks, full-time, including 6 months of internship. 415 higher vocational credits — Higher Vocational Education diploma (SeQF/EQF level 5).",
  },
];
