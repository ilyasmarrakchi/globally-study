"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { DocumentTitle } from "@/components/layout/DocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GuidesIntro() {
  const { t } = useTranslation();
  return (
    <>
      <DocumentTitle title={t.nav.guides} />
      <SectionHeading as="h1" eyebrow={t.guides.eyebrow} title={t.guides.title} subtitle={t.guides.subtitle} />
    </>
  );
}
