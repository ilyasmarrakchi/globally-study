import type { Dictionary } from "@/lib/i18n";

export type GuideSlug = keyof Dictionary["guides"]["items"];
export type GuideCategory = "admin" | "housing" | "studies";
export type GuideContent = Dictionary["guides"]["items"][GuideSlug];

export interface GuideMeta {
  slug: GuideSlug;
  category: GuideCategory;
}

export const GUIDE_CATEGORIES: GuideCategory[] = ["admin", "housing", "studies"];

export const GUIDES: GuideMeta[] = [
  { slug: "arrival-checklist", category: "admin" },
  { slug: "rent-without-guarantor", category: "housing" },
  { slug: "study-in-france-orientation", category: "studies" },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

const WORDS_PER_MINUTE = 200;

/** Estimates reading time from every text block of a guide. */
export function getReadingTime(content: GuideContent): number {
  const text = [
    content.title,
    content.intro,
    ...content.steps.flatMap((step) => [step.title, step.text]),
    ...content.documents,
    ...content.tips,
    ...content.pitfalls,
    ...content.checklist,
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
