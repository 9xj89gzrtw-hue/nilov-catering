"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { SITE } from "@/lib/data";
import Link from "next/link";

/**
 * StickyMobileCTA — sticky bar для мобильных пользователей
 *
 * Решает критику: "Нет sticky CTA при скролле"
 * - Появляется при скролле > 50vh
 * - Фиксирован внизу экрана (над bottom nav)
 * - Быстрые действия: звонок, WhatsApp, калькулятор
 * - Accessibility: aria-label, keyboard nav
 */

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setVisible(scrollPercent > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="bg-card/95 border-line animate-in slide-in-from-bottom-2 fixed right-0 bottom-0 left-0 z-40 border-t shadow-lg backdrop-blur-md duration-300 md:hidden"
      role="complementary"
      aria-label="Быстрые действия"
    >
      <div className="flex items-center justify-around gap-1 px-2 py-2.5">
        {/* Phone */}
        <a
          href={`tel:${SITE.phoneTel}`}
          className="text-primary hover:bg-secondary group flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 no-underline transition-colors"
          aria-label={`Позвонить ${SITE.phone}`}
        >
          <Phone
            className="text-primary h-5 w-5 transition-transform group-active:scale-90"
            aria-hidden="true"
          />
          <span className="text-foreground text-[10px] font-medium">Позвонить</span>
        </a>

        {/* WhatsApp */}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="group flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] px-4 py-2 text-white no-underline shadow-md transition-colors hover:bg-[#20BD5A]"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle
            className="h-5 w-5 transition-transform group-active:scale-90"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>

        {/* Calculator */}
        <Link
          href="/plan/helper"
          className="bg-gold-text hover:bg-gold-text/90 group flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 text-white no-underline shadow-md transition-colors"
          aria-label="Рассчитать стоимость меню"
        >
          <Calculator
            className="h-5 w-5 transition-transform group-active:scale-90"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold">Калькулятор</span>
        </Link>

        {/* Quick callback request */}
        <a
          href="#lead-form-heading"
          className="border-gold-text text-gold-text hover:bg-gold-text group flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-lg border px-3 py-1.5 no-underline transition-colors hover:text-white"
          aria-label="Перейти к форме заявки"
        >
          <svg
            className="h-5 w-5 transition-transform group-active:scale-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-[10px] font-medium">Заявка</span>
        </a>
      </div>

      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-card/95" />
    </div>
  );
}
