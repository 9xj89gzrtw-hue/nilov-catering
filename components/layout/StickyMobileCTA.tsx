'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calculator } from 'lucide-react';
import { SITE } from '@/lib/data';
import Link from 'next/link';

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
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setVisible(scrollPercent > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t border-line shadow-lg animate-in slide-in-from-bottom-2 duration-300"
      role="complementary"
      aria-label="Быстрые действия"
    >
      <div className="flex items-center justify-around py-2.5 px-2 gap-1">
        {/* Phone */}
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg text-primary hover:bg-secondary transition-colors min-h-[48px] no-underline group"
          aria-label={`Позвонить ${SITE.phone}`}
        >
          <Phone className="w-5 h-5 text-primary group-active:scale-90 transition-transform" aria-hidden="true" />
          <span className="text-[10px] font-medium text-foreground">Позвонить</span>
        </a>

        {/* WhatsApp */}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors min-h-[48px] no-underline shadow-md group"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="w-5 h-5 group-active:scale-90 transition-transform" aria-hidden="true" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>

        {/* Calculator */}
        <Link
          href="/plan/helper"
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg bg-gold-text text-white hover:bg-gold-text/90 transition-colors min-h-[48px] no-underline shadow-md group"
          aria-label="Рассчитать стоимость меню"
        >
          <Calculator className="w-5 h-5 group-active:scale-90 transition-transform" aria-hidden="true" />
          <span className="text-[10px] font-semibold">Калькулятор</span>
        </Link>

        {/* Quick callback request */}
        <a
          href="#lead-form-heading"
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg border border-gold-text text-gold-text hover:bg-gold-text hover:text-white transition-colors min-h-[48px] no-underline group"
          aria-label="Перейти к форме заявки"
        >
          <svg className="w-5 h-5 group-active:scale-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[10px] font-medium">Заявка</span>
        </a>
      </div>
      
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-card/95" />
    </div>
  );
}
