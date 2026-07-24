'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  /** If null — bar is hidden. Only show during active seasonal campaigns. */
  message?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
  dismissible?: boolean;
}

export default function AnnouncementBar({
  message = null,
  ctaLabel = 'Подробнее',
  ctaHref = '/seasonal',
  dismissible = true,
}: Props) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissible && message) {
      const stored = sessionStorage.getItem('ab-dismissed');
      if (stored === message) setDismissed(true);
    }
  }, [message, dismissible]);

  const dismiss = () => {
    setDismissed(true);
    if (dismissible) sessionStorage.setItem('ab-dismissed', message ?? '');
  };

  // No message = no bar (silent, no seasonal clutter)
  if (!message || dismissed) return null;

  return (
    <div className="bg-gold-tint text-gold-text text-sm font-medium relative z-[60]" role="banner" aria-label="Важное объявление">
      <div className="container-site flex items-center justify-between py-2.5 gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="shrink-0">🎯</span>
          <p className="truncate">{message}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a href={ctaHref} className="text-xs font-semibold underline underline-offset-2 whitespace-nowrap">{ctaLabel}</a>
          {dismissible && (
            <button onClick={dismiss} className="p-1.5 touch-target text-gold-text/70 hover:text-gold-text" aria-label="Закрыть объявление">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}