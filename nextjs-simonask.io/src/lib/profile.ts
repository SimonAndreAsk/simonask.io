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

export const experience: ProfileEntry[] = [
  {
    title: "Hi3G Access AB (Tre)",
    subtitle: "Data Specialist · internship",
    period: "Mar 2026–Jun 2026",
    details: [
      "Built metadata pipelines into Microsoft Purview so scattered data is easier to find, govern, and use as context for AI/ML.",
    ],
  },
  {
    title: "Nexer Group",
    subtitle: "Digital Analytics Specialist · internship",
    period: "Sep 2025–Dec 2025",
    details: [
      "Audited GA4/GTM/CRM tracking, set up measurement plans, and tightened B2B lead attribution for Nexer and client properties.",
    ],
  },
  {
    title: "Skandinaviska Enskilda Banken (SEB)",
    subtitle: "Service Manager",
    period: "Jan 2022–Aug 2024",
    details: [
      "Managed 700+ banking cases and explained technical products clearly to customers, with consistently high satisfaction scores.",
    ],
  },
];
