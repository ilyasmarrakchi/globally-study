import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

export type Dictionary = typeof fr;
export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "globally-locale";

const englishDictionary: Dictionary = en;

export const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en: englishDictionary,
};

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en";
}

/** Replaces `{name}` placeholders with the given values. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
