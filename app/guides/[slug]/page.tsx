import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideReader } from "@/components/guides/GuideReader";
import { GUIDES, getGuide } from "@/lib/guides";
import en from "@/locales/en.json";

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const content = en.guides.items[guide.slug];
  return { title: content.title, description: content.summary };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideReader slug={guide.slug} />;
}
