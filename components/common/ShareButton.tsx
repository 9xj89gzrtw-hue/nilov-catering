"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";

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
  title = "Кейтеринг NiloV",
  text = "Посмотри меню и цены",
  label = "Поделиться ссылкой",
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : `https://${SITE.domain}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
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
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("ShareButton: copy failed", e);
    }
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;

  const baseClass =
    "inline-flex items-center gap-2 rounded-lg border border-gold-text px-5 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors touch-target no-underline";

  return (
    <div className={className}>
      <button onClick={handleShare} className={baseClass} aria-label="Поделиться ссылкой">
        {label}
      </button>
      {showFallback && (
        <div className="border-line bg-card mt-3 rounded-xl border p-4">
          <p className="mb-3 text-sm font-medium">Выберите способ:</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#065F46] px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-[#064E3B]"
            >
              WhatsApp
            </a>
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background hover:bg-foreground/90 touch-target inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium no-underline transition-colors"
            >
              Telegram
            </a>
            <a
              href={mailUrl}
              className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium no-underline transition-colors"
            >
              Email
            </a>
            <button
              onClick={handleCopy}
              className="border-line bg-background hover:border-gold-text touch-target inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              {copied ? "Скопировано" : "Копировать ссылку"}
            </button>
          </div>
          <p className="text-muted-foreground text-xs break-all">
            Ссылка: <code className="text-foreground">{url}</code>
          </p>
        </div>
      )}
    </div>
  );
}
