"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon, UsersIcon } from "@/components/ui/Icons";

export function MentorCta() {
  const { t } = useTranslation();
  const cta = t.home.cta;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
      <div className="relative overflow-hidden rounded-block bg-royal px-7 py-14 text-white sm:px-14 sm:py-16">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <UsersIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">{cta.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{cta.text}</p>
          </div>
          <ButtonLink href="/join" variant="cta" className="shrink-0 text-base">
            {cta.button}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
