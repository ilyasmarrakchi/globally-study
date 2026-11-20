"use client";

import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/layout/Logo";

const OFFICIAL_RESOURCES = [
  { label: "Campus France", href: "https://www.campusfrance.org" },
  { label: "Service-Public.fr", href: "https://www.service-public.fr" },
  { label: "Étudiant.gouv.fr", href: "https://www.etudiant.gouv.fr" },
  { label: "Visale", href: "https://www.visale.fr" },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-28 border-t border-ink/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 font-display text-lg font-extrabold leading-snug text-ink">{t.footer.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">{t.footer.disclaimer}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold text-ink">{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
            <li><Link href="/" className="hover:text-royal">{t.nav.home}</Link></li>
            <li><Link href="/guides" className="hover:text-royal">{t.nav.guides}</Link></li>
            <li><Link href="/checklist" className="hover:text-royal">{t.nav.checklist}</Link></li>
            <li><Link href="/join" className="hover:text-royal">{t.nav.join}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold text-ink">{t.footer.resourcesTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
            {OFFICIAL_RESOURCES.map((resource) => (
              <li key={resource.href}>
                <a href={resource.href} target="_blank" rel="noopener noreferrer" className="hover:text-royal">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-slate-500 sm:px-8">© 2026 GlobAlly Study. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
