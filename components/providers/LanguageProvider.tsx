"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  dictionaries,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LOCALE_CHANGE_EVENT = "globally-locale-change";

/** In-memory fallback so a manual choice still applies when localStorage is blocked. */
let sessionLocale: Locale | null = null;

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Saved choice first, then browser language: French if it starts with "fr", English otherwise. */
function getClientLocale(): Locale {
  const chosen = sessionLocale ?? readStoredLocale();
  if (chosen) return chosen;
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function getServerLocale(): Locale {
  return DEFAULT_LOCALE;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getClientLocale, getServerLocale);

  const setLocale = useCallback((next: Locale) => {
    sessionLocale = next;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice still applies for this page view.
    }
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
