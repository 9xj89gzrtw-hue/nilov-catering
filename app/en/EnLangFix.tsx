'use client';
import { useEffect } from 'react';

/**
 * Sets <html lang="en"> on mount, restores to "ru" on unmount.
 * Workaround for Next.js App Router: only root layout can render <html>,
 * so nested routes can't override lang attribute. This client component
 * fixes it for the /en route (which is noindex anyway — preview only).
 */
export default function EnLangFix() {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.lang;
    html.lang = 'en';
    return () => { html.lang = prev; };
  }, []);
  return null;
}
