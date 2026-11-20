"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();

  const labels: Record<Locale, string> = {
    fr: t.nav.switchToFrench,
    en: t.nav.switchToEnglish,
  };

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`inline-flex items-center rounded-full bg-white p-1 text-xs font-extrabold shadow-soft ${className}`}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={labels[code]}
            lang={code}
            className={`rounded-full px-3 py-1.5 uppercase tracking-wide transition-colors ${
              active ? "bg-ink text-white" : "text-slate-500 hover:text-ink"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
