import { useCallback, useMemo, useSyncExternalStore } from "react";
import { GUIDES, type GuideSlug } from "@/lib/guides";

/**
 * Personal checklist progress, stored in the visitor's browser (localStorage), one key per guide.
 * Guide pages and the /checklist page share these keys, so progress is the same everywhere.
 */
const CHANGE_EVENT = "globally-checklist-change";
const EMPTY = "[]";

export function checklistStorageKey(slug: GuideSlug): string {
  return `globally-checklist-${slug}`;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readRaw(slug: GuideSlug): string {
  try {
    return window.localStorage.getItem(checklistStorageKey(slug)) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function parse(raw: string, total: number): Set<number> {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return new Set();
    return new Set(value.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < total));
  } catch {
    return new Set();
  }
}

function write(slug: GuideSlug, checked: Set<number>): void {
  try {
    if (checked.size === 0) window.localStorage.removeItem(checklistStorageKey(slug));
    else window.localStorage.setItem(checklistStorageKey(slug), JSON.stringify([...checked].sort((a, b) => a - b)));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Checked items of a single guide checklist. */
export function useChecklist(slug: GuideSlug, total: number) {
  const raw = useSyncExternalStore(subscribe, () => readRaw(slug), () => EMPTY);
  const checked = useMemo(() => parse(raw, total), [raw, total]);

  const toggle = useCallback(
    (index: number) => {
      const next = new Set(checked);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      write(slug, next);
    },
    [checked, slug],
  );

  const reset = useCallback(() => write(slug, new Set()), [slug]);

  return { checked, toggle, reset };
}

const SEPARATOR = "\u0000";

function readAllRaw(): string {
  return GUIDES.map((guide) => readRaw(guide.slug)).join(SEPARATOR);
}

/** Overall progress across every guide checklist. `totals` gives the number of items per guide. */
export function useAllChecklists(totals: Record<GuideSlug, number>) {
  const raw = useSyncExternalStore(subscribe, readAllRaw, () => GUIDES.map(() => EMPTY).join(SEPARATOR));

  const done = useMemo(() => {
    const parts = raw.split(SEPARATOR);
    return GUIDES.reduce((sum, guide, index) => sum + parse(parts[index] ?? EMPTY, totals[guide.slug]).size, 0);
  }, [raw, totals]);

  const total = GUIDES.reduce((sum, guide) => sum + totals[guide.slug], 0);

  const resetAll = useCallback(() => {
    GUIDES.forEach((guide) => write(guide.slug, new Set()));
  }, []);

  return { done, total, resetAll };
}
