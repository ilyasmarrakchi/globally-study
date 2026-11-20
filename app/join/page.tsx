import type { Metadata } from "next";
import { JoinForm } from "@/components/join/JoinForm";
import { JoinAside, JoinIntro } from "@/components/join/JoinIntro";
import en from "@/locales/en.json";

export const metadata: Metadata = {
  title: en.nav.join,
  description: en.meta.joinDescription,
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8 sm:pt-24">
      <JoinIntro />
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <JoinForm />
        <JoinAside />
      </div>
    </div>
  );
}
