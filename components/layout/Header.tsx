"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BUTTON_BASE, BUTTON_VARIANTS } from "@/components/ui/ButtonLink";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/guides", label: t.nav.guides },
    { href: "/checklist", label: t.nav.checklist },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label={t.nav.mainNavigation} className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                isActive(link.href) ? "bg-royal-soft text-royal" : "text-slate-600 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher className="mx-2" />
          <Link
            href="/join"
            aria-current={isActive("/join") ? "page" : undefined}
            className={`${BUTTON_BASE} ${BUTTON_VARIANTS.cta} px-5 py-2.5`}
          >
            {t.nav.join}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-soft"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label={t.nav.mainNavigation} className="border-t border-ink/5 bg-paper px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3.5 font-display text-lg font-extrabold ${
                    isActive(link.href) ? "bg-royal-soft text-royal" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/join"
            onClick={() => setMenuOpen(false)}
            aria-current={isActive("/join") ? "page" : undefined}
            className={`${BUTTON_BASE} ${BUTTON_VARIANTS.cta} mt-4 w-full`}
          >
            {t.nav.join}
          </Link>
        </nav>
      )}
    </header>
  );
}
