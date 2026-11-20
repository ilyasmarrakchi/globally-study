import type { Metadata } from "next";
import { GuidesIntro } from "@/components/guides/GuidesIntro";
import { GuideLibrary } from "@/components/guides/GuideLibrary";
import en from "@/locales/en.json";

export const metadata: Metadata = {
  title: en.nav.guides,
  description: en.meta.guidesDescription,
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8 sm:pt-24">
      <GuidesIntro />
      <div className="mt-12">
        <GuideLibrary />
      </div>
    </div>
  );
}
