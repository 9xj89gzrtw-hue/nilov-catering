'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('cookie-consent-shown-v2');
    if (!shown) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-shown-v2', 'true');
    setShow(false);
    window.dispatchEvent(new Event('cookie-consent-changed'));
  };
  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-shown-v2', 'true');
    setShow(false);
    window.dispatchEvent(new Event('cookie-consent-changed'));
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-[80px] right-3 z-[210] max-w-sm rounded-xl bg-foreground/95 backdrop-blur-md px-4 py-3 shadow-lg md:bottom-3"
      role="dialog"
      aria-modal="true"
      aria-label="Использование cookie"
    >
      <p className="text-xs text-background/80 mb-2">
        Мы используем cookie для улучшения сайта.{' '}
        <Link href="/privacy" className="underline hover:text-background inline-flex items-center min-h-[44px] px-1">Подробнее</Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 text-sm bg-gold-text text-white px-4 py-2.5 min-h-[44px] rounded font-semibold hover:bg-gold-text/90 transition-colors"
          aria-label="Принять cookie"
        >
          Принять
        </button>
        <button
          onClick={reject}
          className="flex-1 text-sm bg-background text-foreground px-4 py-2.5 min-h-[44px] rounded font-semibold hover:bg-background/90 transition-colors"
          aria-label="Отклонить cookie"
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
