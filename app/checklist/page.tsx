import type { Metadata } from "next";
import { ChecklistBoard } from "@/components/checklist/ChecklistBoard";
import en from "@/locales/en.json";

export const metadata: Metadata = {
  title: en.nav.checklist,
  description: en.meta.checklistDescription,
};

export default function ChecklistPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8 sm:pt-24">
      <ChecklistBoard />
    </div>
  );
}
