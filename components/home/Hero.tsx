"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { CategoryBadge } from "@/components/guides/CategoryBadge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DocumentTitle } from "@/components/layout/DocumentTitle";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "@/components/ui/Icons";
import { GUIDE_CATEGORIES, getReadingTime } from "@/lib/guides";
import { format } from "@/lib/i18n";

function HighlightedTitle({ title, highlight }: { title: string; highlight: string }) {
  const index = title.indexOf(highlight);
  if (index === -1) return <>{title}</>;

  // Characters glued to the highlight (e.g. the elided "d’" in "d’entraide") must stay on the same line.
  const before = title.slice(0, index);
  const gluedPrefix = before.match(/\S*$/)?.[0] ?? "";

  return (
    <>
      {before.slice(0, before.length - gluedPrefix.length)}
      <span className="whitespace-nowrap">
        {gluedPrefix}
        <span className="relative inline-block text-royal">
          {highlight}
          <svg
            viewBox="0 0 220 14"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute -bottom-2 left-0 h-3 w-full text-raspberry"
          >
            <path
              d="M3 10.5C55 3.5 160 1.5 217 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              className="motion-safe:animate-draw [--enter-delay:380ms]"
            />
          </svg>
        </span>
      </span>
      {title.slice(index + highlight.length)}
    </>
  );
}

/** Illustrative preview built from the real arrival guide (no stock photos). */
function HeroPreview() {
  const { t } = useTranslation();
  const guide = t.guides.items["arrival-checklist"];
  const items = guide.checklist.slice(0, 4);
  const doneCount = 2;

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md animate-fade [--enter-delay:200ms] motion-safe:animate-rise lg:max-w-none">
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-raspberry-soft sm:h-56 sm:w-56" />
      <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-royal-soft sm:h-64 sm:w-64" />

      <div className="relative rotate-[1.5deg] rounded-block bg-white p-6 shadow-lift ring-1 ring-ink/5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <CategoryBadge category="admin" />
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <ClockIcon className="h-3.5 w-3.5" />
            {format(t.guides.readingTime, { minutes: getReadingTime(guide) })}
          </span>
        </div>
        <p className="mt-4 font-display text-lg font-extrabold leading-snug text-ink">{t.guides.sections.checklist}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-royal-soft">
          <div className="h-full w-1/3 rounded-full bg-royal" />
        </div>
        <ul className="mt-5 space-y-2.5">
          {items.map((item, index) => {
            const done = index < doneCount;
            return (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-paper px-3.5 py-3 text-sm leading-snug">
                <span
                  className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-royal text-white" : "border-2 border-slate-300"
                  }`}
                >
                  {done && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className={done ? "text-slate-400 line-through" : "font-medium text-ink"}>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative -mt-6 ml-auto w-fit -rotate-2 rounded-card bg-ink px-5 py-4 shadow-lift sm:-mt-10 sm:mr-[-1.5rem]">
        <div className="flex flex-wrap gap-2">
          {GUIDE_CATEGORIES.map((category) => (
            <span key={category} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              {t.guides.categories[category]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const hero = t.home.hero;

  return (
    <section className="relative overflow-hidden">
      <DocumentTitle title={t.meta.title} standalone />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <h1 className="animate-fade font-display text-[2.6rem] font-black leading-[1.05] tracking-tight text-ink motion-safe:animate-rise sm:text-6xl lg:text-[4.25rem]">
            <HighlightedTitle title={t.common.baseline} highlight={hero.baselineHighlight} />
          </h1>
          <p className="mt-8 max-w-xl animate-fade text-lg [--enter-delay:80ms] motion-safe:animate-rise leading-relaxed text-slate-600 sm:text-xl">{hero.subtitle}</p>

          <div className="mt-10 flex animate-fade flex-col gap-3 [--enter-delay:150ms] motion-safe:animate-rise sm:flex-row">
            <ButtonLink href="/guides" variant="primary" className="text-base">
              {hero.ctaGuides}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/join" variant="cta" className="text-base">
              {hero.ctaJoin}
            </ButtonLink>
          </div>
        </div>

        <HeroPreview />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ul className="grid animate-fade gap-4 rounded-block bg-white [--enter-delay:280ms] motion-safe:animate-rise p-6 shadow-soft ring-1 ring-ink/5 sm:grid-cols-3 sm:p-8">
          {hero.highlights.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] font-semibold leading-snug text-ink">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
                  index === 1 ? "bg-raspberry" : "bg-royal"
                }`}
              >
                <CheckIcon className="h-4 w-4" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
