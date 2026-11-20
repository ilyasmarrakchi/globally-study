"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { ChecklistItems } from "@/components/checklist/ChecklistItems";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useChecklist } from "@/lib/checklist-store";
import type { GuideSlug } from "@/lib/guides";
import { format } from "@/lib/i18n";

export function Checklist({ slug, items }: { slug: GuideSlug; items: string[] }) {
  const { t } = useTranslation();
  const { checked, toggle, reset } = useChecklist(slug, items.length);

  const done = checked.size;
  const total = items.length;
  const complete = done === total && total > 0;

  return (
    <div className="rounded-block bg-white p-6 shadow-lift ring-1 ring-ink/5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`font-display text-lg font-extrabold ${complete ? "text-royal" : "text-ink"}`} aria-live="polite">
          {complete ? t.guides.checklist.complete : format(t.guides.checklist.progress, { done, total })}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-3 py-1 text-xs font-bold text-slate-500 hover:bg-ink/5 hover:text-ink"
          >
            {t.guides.checklist.reset}
          </button>
        )}
      </div>
      <ProgressBar done={done} total={total} className="mt-4" />
      <div className="mt-6">
        <ChecklistItems items={items} checked={checked} onToggle={toggle} />
      </div>
      <p className="mt-5 text-xs font-medium text-slate-500">{t.guides.checklist.hint}</p>
    </div>
  );
}
