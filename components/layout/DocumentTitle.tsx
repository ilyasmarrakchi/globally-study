"use client";

import { useEffect } from "react";

const SITE_NAME = "GlobAlly Study";

/**
 * Keeps the browser tab title in the active language.
 * Server metadata provides the English default for crawlers; this updates it on the client.
 */
export function DocumentTitle({ title, standalone = false }: { title: string; standalone?: boolean }) {
  useEffect(() => {
    document.title = standalone ? title : `${title} · ${SITE_NAME}`;
  }, [title, standalone]);
  return null;
}
