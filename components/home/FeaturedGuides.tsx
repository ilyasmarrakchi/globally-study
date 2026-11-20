"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { GuideCard } from "@/components/guides/GuideCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { GUIDES } from "@/lib/guides";

export function FeaturedGuides() {
  const { t } = useTranslation();
  const featured = t.home.featured;

  return (
    <section className="px-3 sm:px-5">
      <div className="mx-auto max-w-[88rem] rounded-block bg-royal-soft px-2 py-20 sm:px-3 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={featured.eyebrow} title={featured.title} subtitle={featured.subtitle} />
            <ButtonLink href="/guides" variant="light" className="shrink-0 self-start md:self-auto">
              {featured.viewAll}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {GUIDES.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
