"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { ChecklistItems } from "@/components/checklist/ChecklistItems";
import { CATEGORY_ICONS, CATEGORY_STYLES } from "@/components/guides/CategoryBadge";
import { DocumentTitle } from "@/components/layout/DocumentTitle";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListCheckIcon, LockIcon } from "@/components/ui/Icons";
import { useAllChecklists, useChecklist } from "@/lib/checklist-store";
import { GUIDES, type GuideMeta, type GuideSlug } from "@/lib/guides";
import { format } from "@/lib/i18n";

function ChecklistSection({ guide }: { guide: GuideMeta }) {
  const { t } = useTranslation();
  const content = t.guides.items[guide.slug];
  const total = content.checklist.length;
  const { checked, toggle } = useChecklist(guide.slug, total);
  const style = CATEGORY_STYLES[guide.category];
  const Icon = CATEGORY_ICONS[guide.category];
  const titleId = `checklist-${guide.category}-title`;
  const complete = checked.size === total;

  return (
    <section
      id={`checklist-${guide.category}`}
      aria-labelledby={titleId}
      className="scroll-mt-28 rounded-block bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${style.soft} ${style.text}`}>
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="font-display text-2xl font-black leading-tight text-ink sm:text-[1.75rem]">
              {t.guides.categories[guide.category]}
            </h2>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-sm font-extrabold ${
                complete ? "bg-royal text-white" : "bg-paper text-ink ring-1 ring-ink/5"
              }`}
            >
              {checked.size}/{total}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {t.checklistPage.fromGuide}{" "}
            <Link href={`/guides/${guide.slug}`} className="font-semibold text-royal hover:underline">
              {content.title}
            </Link>
          </p>
        </div>
      </div>
      <ProgressBar done={checked.size} total={total} className="mt-6" />
      <div className="mt-6">
        <ChecklistItems items={content.checklist} checked={checked} onToggle={toggle} />
      </div>
    </section>
  );
}

export function ChecklistBoard() {
  const { t } = useTranslation();
  const page = t.checklistPage;

  const totals = useMemo(
    () =>
      Object.fromEntries(GUIDES.map((guide) => [guide.slug, t.guides.items[guide.slug].checklist.length])) as Record<
        GuideSlug,
        number
      >,
    [t],
  );
  const { done, total, resetAll } = useAllChecklists(totals);
  const complete = total > 0 && done === total;

  const handleReset = () => {
    if (window.confirm(page.resetConfirm)) resetAll();
  };

  return (
    <>
      <DocumentTitle title={t.nav.checklist} />
      <SectionHeading as="h1" eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
      <p className="mt-7 flex max-w-2xl items-start gap-3 rounded-2xl bg-royal-soft px-4 py-3.5 text-sm font-medium leading-relaxed text-ink sm:items-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-royal">
          <LockIcon className="h-4 w-4" />
        </span>
        {page.notice}
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <aside className="lg:sticky lg:top-28 lg:order-2">
          <div className="rounded-block bg-ink p-6 text-white sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <ListCheckIcon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-lg font-extrabold">{page.progressTitle}</h2>
            </div>
            <p className="mt-5 font-display text-5xl font-black leading-none">
              {done}
              <span className="text-2xl text-white/50">/{total}</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-white/80" aria-live="polite">
              {complete ? page.complete : format(page.progress, { done, total })}
            </p>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
              <div
                className="h-full rounded-full bg-raspberry transition-all duration-500"
                style={{ width: `${total === 0 ? 0 : Math.round((done / total) * 100)}%` }}
              />
            </div>

            <nav aria-label={page.sectionsLabel} className="mt-6 border-t border-white/10 pt-5">
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {GUIDES.map((guide) => {
                  const Icon = CATEGORY_ICONS[guide.category];
                  return (
                    <li key={guide.slug}>
                      <a
                        href={`#checklist-${guide.category}`}
                        className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/20 lg:rounded-xl lg:bg-transparent lg:px-3 lg:py-2 lg:hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4" />
                        {t.guides.categories[guide.category]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            onClick={handleReset}
            disabled={done === 0}
            className="mx-auto mt-4 block rounded-full px-4 py-2 text-xs font-bold text-slate-500 underline-offset-4 transition hover:text-raspberry hover:underline disabled:pointer-events-none disabled:opacity-40"
          >
            {page.reset}
          </button>
        </aside>

        <div className="space-y-6 lg:order-1">
          {GUIDES.map((guide) => (
            <ChecklistSection key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </>
  );
}
