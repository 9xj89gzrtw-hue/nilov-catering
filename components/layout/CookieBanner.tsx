'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const shown = localStorage.getItem('cookie-consent-shown');
    if (!shown) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-shown', 'true');
    setShow(false);
  };
  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-shown', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-[80px] right-3 z-40 max-w-sm rounded-xl bg-foreground/90 backdrop-blur-md px-4 py-3 shadow-lg md:bottom-3"
      role="dialog"
      aria-label="Использование cookie"
    >
      <p className="text-xs text-background/80 mb-2">
        Мы используем cookie для улучшения сайта.{' '}
        <Link href="/privacy" className="underline hover:text-background inline-flex items-center min-h-[44px] px-1">Подробнее</Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="text-xs bg-gold-text text-white px-3 py-1.5 rounded font-medium hover:bg-gold-text/90"
          aria-label="Принять cookie"
        >
          Принять
        </button>
        <button
          onClick={reject}
          className="text-xs border border-background/30 text-background/70 px-3 py-1.5 rounded font-medium hover:border-background/50"
          aria-label="Отклонить cookie"
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
