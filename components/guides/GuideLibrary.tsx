"use client";

import { useState } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { GuideCard } from "@/components/guides/GuideCard";
import { GUIDE_CATEGORIES, GUIDES, type GuideCategory } from "@/lib/guides";

type Filter = "all" | GuideCategory;

const FILTERS: Filter[] = ["all", ...GUIDE_CATEGORIES];

export function GuideLibrary() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");

  const visibleGuides = filter === "all" ? GUIDES : GUIDES.filter((guide) => guide.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label={t.guides.filterLabel}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((value) => {
          const active = value === filter;
          const count = value === "all" ? GUIDES.length : GUIDES.filter((g) => g.category === value).length;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-royal text-white shadow-[0_10px_24px_-12px_rgb(30_79_214/0.8)]"
                  : "bg-white text-slate-600 shadow-soft ring-1 ring-ink/5 hover:text-ink"
              }`}
            >
              {t.guides.categories[value]}
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                  active ? "bg-white/20 text-white" : "bg-royal-soft text-royal"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-10">
        {visibleGuides.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <p className="rounded-card border-2 border-dashed border-ink/10 p-12 text-center font-semibold text-slate-500">
            {t.guides.empty}
          </p>
        )}
      </div>
    </div>
  );
}
