"use client";

import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { CATEGORY_ICONS, CATEGORY_STYLES, CategoryBadge } from "@/components/guides/CategoryBadge";
import { Checklist } from "@/components/guides/Checklist";
import { DocumentTitle } from "@/components/layout/DocumentTitle";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  AlertIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  DocumentIcon,
  ExternalLinkIcon,
  LightbulbIcon,
} from "@/components/ui/Icons";
import { getGuide, getReadingTime, type GuideSlug } from "@/lib/guides";
import { format } from "@/lib/i18n";

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
      {children}
    </h2>
  );
}

export function GuideReader({ slug }: { slug: GuideSlug }) {
  const { t } = useTranslation();
  const meta = getGuide(slug);
  const guide = t.guides.items[slug];
  const labels = t.guides.sections;
  const minutes = getReadingTime(guide);
  const category = meta?.category ?? "admin";
  const style = CATEGORY_STYLES[category];
  const Icon = CATEGORY_ICONS[category];

  const toc = [
    { id: "steps", label: labels.steps },
    { id: "documents", label: labels.documents },
    { id: "tips", label: labels.tips },
    { id: "pitfalls", label: labels.pitfalls },
    { id: "checklist", label: labels.checklist },
    { id: "sources", label: labels.sources },
  ];

  return (
    <article>
      <DocumentTitle title={guide.title} />
      <header className="px-3 pt-4 sm:px-5">
        <div className={`relative mx-auto max-w-[88rem] overflow-hidden rounded-block ${style.soft}`}>
          <Icon aria-hidden="true" className={`absolute -right-10 -top-10 h-72 w-72 opacity-[0.07] ${style.text}`} />
          <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-soft hover:-translate-y-0.5 transition"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {t.guides.backToGuides}
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
              <CategoryBadge category={category} />
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                {format(t.guides.readingTime, { minutes })}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t.guides.updated}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.1rem] font-black leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">{guide.intro}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-16 grid max-w-6xl gap-14 px-5 sm:px-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-3xl space-y-20">
          <section aria-labelledby="steps">
            <SectionTitle id="steps">{labels.steps}</SectionTitle>
            <ol className="mt-8 space-y-5">
              {guide.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5 rounded-card bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal font-display text-lg font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold leading-snug text-ink">{step.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-slate-700">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="documents">
            <SectionTitle id="documents">{labels.documents}</SectionTitle>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {guide.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-[0.95rem] leading-relaxed text-slate-700 shadow-soft ring-1 ring-ink/5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-royal-soft text-royal">
                    <DocumentIcon className="h-5 w-5" />
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tips">
            <SectionTitle id="tips">{labels.tips}</SectionTitle>
            <ul className="mt-8 space-y-4">
              {guide.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-4 leading-relaxed text-slate-700">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                    <LightbulbIcon className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="pitfalls">
            <SectionTitle id="pitfalls">{labels.pitfalls}</SectionTitle>
            <ul className="mt-8 space-y-4 rounded-block bg-raspberry-soft p-6 sm:p-8">
              {guide.pitfalls.map((pitfall) => (
                <li key={pitfall} className="flex items-start gap-4 leading-relaxed text-ink">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raspberry text-white">
                    <AlertIcon className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5">{pitfall}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="checklist">
            <SectionTitle id="checklist">{labels.checklist}</SectionTitle>
            <div className="mt-8">
              <Checklist slug={slug} items={guide.checklist} />
            </div>
          </section>

          <section aria-labelledby="sources">
            <SectionTitle id="sources">{labels.sources}</SectionTitle>
            <p className="mt-5 leading-relaxed text-slate-600">{t.guides.disclaimer}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-ink shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:text-royal"
                  >
                    {source.label}
                    <ExternalLinkIcon className="h-4 w-4 shrink-0 text-royal" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <nav aria-label={guide.title} className="rounded-card bg-white p-6 shadow-soft ring-1 ring-ink/5">
              <ul className="space-y-1 text-sm font-semibold">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-600 transition hover:bg-royal-soft hover:text-royal"
                    >
                      <span className="text-xs font-black text-slate-300">{String(index + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <HelpBox />
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8 lg:hidden">
        <HelpBox />
      </div>
    </article>
  );
}

function HelpBox() {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-card bg-ink p-7 text-white">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-royal/40" />
      <p className="relative font-display text-xl font-black">{t.guides.helpBox.title}</p>
      <p className="relative mt-2 text-sm leading-relaxed text-white/75">{t.guides.helpBox.text}</p>
      <ButtonLink href="/join" variant="cta" className="relative mt-6 w-full">
        {t.guides.helpBox.button}
        <ArrowRightIcon className="h-4 w-4" />
      </ButtonLink>
    </div>
  );
}
