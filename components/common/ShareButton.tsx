'use client';

import { useState } from 'react';
import { SITE } from '@/lib/data';

interface ShareButtonProps {
  title?: string;
  text?: string;
  label?: string;
  className?: string;
}

/**
 * Share button — uses Web Share API on mobile, falls back to copy-URL + WhatsApp/Telegram/Email buttons.
 */
export default function ShareButton({
  title = 'Кейтеринг NiloV',
  text = 'Посмотри меню и цены',
  label = 'Поделиться ссылкой',
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : `https://${SITE.domain}`;

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to fallback
      }
    }
    setShowFallback(true);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('ShareButton: copy failed', e);
    }
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;

  const baseClass = 'inline-flex items-center gap-2 rounded-lg border border-gold-text px-5 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors touch-target no-underline';

  return (
    <div className={className}>
      <button onClick={handleShare} className={baseClass} aria-label="Поделиться ссылкой">
        {label}
      </button>
      {showFallback && (
        <div className="mt-3 p-4 rounded-xl border border-line bg-card">
          <p className="text-sm font-medium mb-3">Выберите способ:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 rounded-lg bg-[#065F46] text-white px-4 py-2 text-sm font-medium hover:bg-[#064E3B] transition-colors touch-target no-underline">
               WhatsApp
            </a>
            <a href={tgUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors touch-target no-underline">
               Telegram
            </a>
            <a href={mailUrl}
               className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors touch-target no-underline">
               Email
            </a>
            <button onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-background px-4 py-2 text-sm font-medium hover:border-gold-text transition-colors touch-target">
              {copied ? ' Скопировано' : ' Копировать ссылку'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground break-all">
            Ссылка: <code className="text-foreground">{url}</code>
          </p>
        </div>
      )}
    </div>
  );
}
