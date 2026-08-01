'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const shown = localStorage.getItem('cookie-consent-shown');
    if (!consent && !shown) setShow(true);
  }, []);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => { decline(); }, 10000);
    return () => clearTimeout(t);
  }, [show]);
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-shown', 'true');
    setShow(false);
  };
  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-shown', 'true');
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-line" role="dialog" aria-label="Уведомление об использовании cookie">
      <div className="container-site py-2 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
        <p className="text-[11px] sm:text-xs text-muted-foreground flex-1 leading-snug">
          Мы используем cookie для аналитики.{' '}
          <Link href="/privacy" className="text-gold-text hover:underline">Подробнее</Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={decline} className="rounded-md border border-line px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-muted-foreground hover:bg-secondary transition-colors">Отказаться</button>
          <button onClick={accept} className="rounded-md bg-primary px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Принять</button>
        </div>
      </div>
    </div>
  );
}
