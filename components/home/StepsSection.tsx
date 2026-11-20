"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatIcon, CompassIcon, ShieldIcon } from "@/components/ui/Icons";

const STEP_STYLES = [
  { icon: CompassIcon, tile: "bg-royal text-white", number: "text-royal" },
  { icon: ShieldIcon, tile: "bg-raspberry text-white", number: "text-raspberry" },
  { icon: ChatIcon, tile: "bg-ink text-white", number: "text-ink" },
];

export function StepsSection() {
  const { t } = useTranslation();
  const steps = t.home.steps;

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={steps.eyebrow} title={steps.title} subtitle={steps.subtitle} align="center" />
      <ol className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.items.map((step, index) => {
          const style = STEP_STYLES[index % STEP_STYLES.length];
          const Icon = style.icon;
          return (
            <li key={step.title} className="relative flex flex-col rounded-card bg-white p-8 shadow-soft ring-1 ring-ink/5">
              <div className="flex items-center justify-between">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.tile}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <span className={`font-display text-5xl font-black opacity-15 ${style.number}`} aria-hidden="true">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl font-extrabold leading-tight text-ink">
                <span className="sr-only">{index + 1}. </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
