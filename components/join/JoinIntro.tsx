"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { DocumentTitle } from "@/components/layout/DocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function JoinIntro() {
  const { t } = useTranslation();
  return (
    <>
      <DocumentTitle title={t.nav.join} />
      <SectionHeading as="h1" eyebrow={t.join.eyebrow} title={t.join.title} subtitle={t.join.subtitle} />
    </>
  );
}

export function JoinAside() {
  const { t } = useTranslation();
  return (
    <aside className="relative overflow-hidden rounded-block bg-royal p-7 text-white sm:p-9">
      <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
      <h2 className="relative font-display text-2xl font-black leading-tight">{t.join.aside.title}</h2>
      <ol className="relative mt-7 space-y-5">
        {t.join.aside.items.map((item, index) => (
          <li key={item} className="flex items-start gap-4 leading-relaxed text-white/90">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-black text-royal">
              {index + 1}
            </span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
