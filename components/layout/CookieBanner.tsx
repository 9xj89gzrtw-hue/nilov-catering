"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("cookie-consent-shown-v2");
    if (!shown) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-shown-v2", "true");
    setShow(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };
  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-shown-v2", "true");
    setShow(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  if (!show) return null;

  return (
    <div
      className="bg-foreground/95 fixed right-3 bottom-[80px] z-[210] max-w-sm rounded-xl px-4 py-3 shadow-lg backdrop-blur-md md:bottom-3"
      role="region"
      aria-label="Использование cookie"
    >
      <p className="text-background/80 mb-2 text-xs">
        Мы используем cookie для улучшения сайта.{" "}
        <Link
          href="/privacy"
          className="hover:text-background inline-flex min-h-[44px] items-center px-1 underline"
        >
          Подробнее
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="bg-gold-text hover:bg-gold-text/90 min-h-[44px] flex-1 rounded px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          aria-label="Принять cookie"
        >
          Принять
        </button>
        <button
          onClick={reject}
          className="bg-background text-foreground hover:bg-background/90 min-h-[44px] flex-1 rounded px-4 py-2.5 text-sm font-semibold transition-colors"
          aria-label="Отклонить cookie"
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
