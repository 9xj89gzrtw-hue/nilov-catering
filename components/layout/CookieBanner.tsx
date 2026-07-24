'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-line p-4 shadow-lg"
      role="dialog"
      aria-label="Уведомление об использовании cookie"
    >
      <div className="container-site flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Мы используем cookie для аналитики и улучшения работы сайта. Продолжая, вы соглашаетесь с{' '}
          <Link href="/privacy" className="text-gold-text hover:underline">
            политикой обработки персональных данных
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="rounded-lg border border-line px-4 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            Отказаться
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}