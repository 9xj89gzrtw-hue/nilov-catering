'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const shown = localStorage.getItem('cookie-consent-shown');
    if (!shown) setShow(true);
  }, []);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.setItem('cookie-consent-shown', 'true');
      setShow(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  // Bottom-right pill — minimal footprint, doesn't obscure full-width content
  return (
    <div
      className="fixed bottom-3 right-3 z-20 max-w-xs rounded-full bg-foreground/85 backdrop-blur-md px-4 py-1.5 shadow-md"
      role="dialog"
      aria-label="Использование cookie"
    >
      <p className="text-[10px] text-background/80 inline">
        Cookie · <Link href="/privacy" className="underline hover:text-background">Подробнее</Link>
        <button
          onClick={() => {
            localStorage.setItem('cookie-consent', 'accepted');
            localStorage.setItem('cookie-consent-shown', 'true');
            setShow(false);
          }}
          className="ml-2 text-background hover:text-[#E8C97E] underline"
          aria-label="Принять cookie"
        >
          OK
        </button>
      </p>
    </div>
  );
}
