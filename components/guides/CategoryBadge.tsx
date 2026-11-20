"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import type { GuideCategory } from "@/lib/guides";
import { DocumentIcon, GraduationIcon, HomeIcon } from "@/components/ui/Icons";

export const CATEGORY_STYLES: Record<GuideCategory, { soft: string; text: string; solid: string }> = {
  admin: { soft: "bg-royal-soft", text: "text-royal", solid: "bg-royal" },
  housing: { soft: "bg-raspberry-soft", text: "text-raspberry", solid: "bg-raspberry" },
  studies: { soft: "bg-slate-100", text: "text-ink", solid: "bg-ink" },
};

export const CATEGORY_ICONS = {
  admin: DocumentIcon,
  housing: HomeIcon,
  studies: GraduationIcon,
} satisfies Record<GuideCategory, unknown>;

export function CategoryBadge({ category }: { category: GuideCategory }) {
  const { t } = useTranslation();
  const Icon = CATEGORY_ICONS[category];
  const style = CATEGORY_STYLES[category];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${style.soft} ${style.text}`}>
      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
      {t.guides.categories[category]}
    </span>
  );
}
