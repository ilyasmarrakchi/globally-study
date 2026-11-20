"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DocumentTitle } from "@/components/layout/DocumentTitle";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <DocumentTitle title={t.meta.notFoundTitle} />
      <p className="font-display text-8xl font-black text-royal">
        4<span className="text-raspberry">0</span>4
      </p>
      <h1 className="mt-6 font-display text-3xl font-black text-ink">{t.notFound.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{t.notFound.text}</p>
      <ButtonLink href="/" className="mt-10">
        {t.notFound.button}
      </ButtonLink>
    </div>
  );
}
