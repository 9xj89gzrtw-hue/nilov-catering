"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  /** If null — bar is hidden. Only show during active seasonal campaigns. */
  message?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
  dismissible?: boolean;
}

export default function AnnouncementBar({
  message = null,
  ctaLabel = "Подробнее",
  ctaHref = "/seasonal",
  dismissible = true,
}: Props) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissible && message) {
      const stored = sessionStorage.getItem("ab-dismissed");
      if (stored === message) setDismissed(true);
    }
  }, [message, dismissible]);

  const dismiss = () => {
    setDismissed(true);
    if (dismissible) sessionStorage.setItem("ab-dismissed", message ?? "");
  };

  // No message = no bar (silent, no seasonal clutter)
  if (!message || dismissed) return null;

  return (
    <div
      className="bg-gold-tint text-gold-text relative z-[60] text-sm font-medium"
      role="status"
      aria-label="Важное объявление"
    >
      <div className="container-site flex items-center justify-between gap-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0"></span>
          <p className="truncate">{message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={ctaHref}
            className="text-xs font-semibold whitespace-nowrap underline underline-offset-2"
          >
            {ctaLabel}
          </a>
          {dismissible && (
            <button
              onClick={dismiss}
              className="touch-target text-gold-text/70 hover:text-gold-text p-1.5"
              aria-label="Закрыть объявление"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
