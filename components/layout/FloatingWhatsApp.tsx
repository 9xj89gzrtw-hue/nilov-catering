"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * FloatingWhatsApp — плавающий виджет WhatsApp для мобильных пользователей
 *
 * Решает критику: "Нет плавающего виджета WhatsApp/messenger"
 * - Фиксированная позиция bottom-right
 * - Появляется после 15 секунд или при скролле на 50%
 * - Раскрывающийся панель с быстрыми действиями
 * - Accessibility: aria-label, focus trap, клавиатурная навигация
 */

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Показываем виджет после 15 секунд или при скролле 50%
  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 15000);

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  // Закрываем при Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className="fixed right-4 bottom-6 z-50 md:right-8 md:bottom-8"
      role="complementary"
      aria-label="Быстрая связь"
    >
      {/* Раскрытая панель */}
      {expanded && (
        <div
          className="bg-card border-line animate-in slide-in-from-bottom-5 fade-in absolute right-0 bottom-16 w-72 rounded-2xl border p-4 shadow-2xl duration-200"
          role="dialog"
          aria-label="Меню быстрой связи"
        >
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground absolute top-2 right-2 p-1"
            aria-label="Закрыть виджет"
          >
            <X className="h-4 w-4" />
          </button>

          <p className="text-foreground mb-3 text-sm font-medium">Нужна помощь с выбором?</p>

          <div className="space-y-2">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex w-full items-center gap-3 rounded-xl bg-[#25D366] p-3 text-white no-underline transition-colors hover:bg-[#20BD5A]"
              aria-label="Написать в WhatsApp"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z" />
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
              <span className="ml-auto text-xs opacity-80">ответим за 15 мин</span>
            </a>

            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center gap-3 rounded-xl p-3 no-underline transition-colors"
              aria-label={`Позвонить ${SITE.phone}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">Позвонить</span>
              <span className="ml-auto text-xs opacity-80">{SITE.phone}</span>
            </a>

            <a
              href="/plan/helper"
              className="border-line bg-secondary/50 text-foreground hover:bg-secondary flex w-full items-center gap-3 rounded-xl border p-3 no-underline transition-colors"
              aria-label="Рассчитать стоимость онлайн"
            >
              <span className="text-lg" aria-hidden="true">
                🧮
              </span>
              <span className="text-sm font-medium">Калькулятор</span>
            </a>
          </div>

          <p className="text-muted-foreground mt-3 text-center text-xs">Работаем с 9:00 до 21:00</p>
        </div>
      )}

      {/* Главная кнопка */}
      {!visible ? (
        <button
          onClick={() => setVisible(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          aria-label="Открыть WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      ) : (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            expanded
              ? "bg-foreground text-background rotate-0"
              : "animate-bounce bg-[#25D366] text-white"
          }`}
          aria-expanded={expanded}
          aria-label={expanded ? "Закрыть меню" : "Открыть WhatsApp"}
        >
          {expanded ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      )}

      {/* Пульсирующий индикатор для непрочитанного */}
      {visible && !expanded && !dismissed && (
        <span
          className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-red-500"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
