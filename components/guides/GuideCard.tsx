"use client";

import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { CATEGORY_ICONS, CATEGORY_STYLES, CategoryBadge } from "@/components/guides/CategoryBadge";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/Icons";
import { getReadingTime, type GuideMeta } from "@/lib/guides";
import { format } from "@/lib/i18n";

export function GuideCard({ guide }: { guide: GuideMeta }) {
  const { t } = useTranslation();
  const content = t.guides.items[guide.slug];
  const minutes = getReadingTime(content);
  const style = CATEGORY_STYLES[guide.category];
  const Icon = CATEGORY_ICONS[guide.category];

  return (
    <article className="group relative flex h-full flex-col rounded-card bg-white p-7 shadow-soft ring-1 ring-ink/5 transition-[translate,scale,box-shadow] duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-lift active:scale-[0.99]">
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.soft} ${style.text}`}>
          <Icon className="h-7 w-7" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-slate-500">
          <ClockIcon className="h-3.5 w-3.5" />
          {format(t.guides.readingTime, { minutes })}
        </span>
      </div>
      <div className="mt-6">
        <CategoryBadge category={guide.category} />
      </div>
      <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
        <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0 after:rounded-card">
          {content.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-slate-600">{content.summary}</p>
      <span className="mt-7 inline-flex items-center gap-2 font-bold text-royal">
        {t.guides.readGuide}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-soft transition-[background-color,color,translate] duration-200 ease-out-strong group-hover:translate-x-1 group-hover:bg-royal group-hover:text-white">
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </span>
    </article>
  );
}
