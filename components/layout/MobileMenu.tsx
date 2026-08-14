"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * MobileMenu — логичная мобильная навигация
 *
 * Структура (8 ключевых пунктов + расширяющиеся секции):
 * - Главная
 * - Услуги ▸ (раскрывается)
 * - Меню ▸ (раскрывается)
 * - Галерея
 * - Цены
 * - О нас ▸ (раскрывается)
 * - Контакты
 *
 * Принципы:
 * - 7±2 пункта в основном списке
 * - Раскрывающиеся секции для глубины
 * - CTA всегда внизу
 */

// Основные ссылки (всегда видны)
const KEY_LINKS = [{ href: "/", label: "Главная" }];

// Секции с подпунктами
const SECTIONS = [
  {
    label: "Услуги",
    icon: "🎉",
    items: [
      { href: "/events/svadba", label: "Свадьба" },
      { href: "/events/korporativ", label: "Корпоратив" },
      { href: "/events/detskoe", label: "Детский праздник" },
      { href: "/events/chastnoe", label: "Частное мероприятие" },
      { href: "/events/vypusknoy", label: "Выпускной" },
      { href: "/events/nikah", label: "Никах и ифтар" },
      { href: "/events/chef-at-home", label: "Шеф на дом" },
    ],
    moreLink: { href: "/events", label: "Все услуги →" },
  },
  {
    label: "Меню",
    icon: "🍽️",
    items: [
      { href: "/menu/banquet", label: "Банкетное меню" },
      { href: "/menu/furshet", label: "Фуршет" },
      { href: "/menu/coffee-break", label: "Кофе-брейк" },
      { href: "/menu/show-cooking", label: "Шоу-кукинг" },
      { href: "/menu/catalog", label: "Каталог блюд" },
    ],
    moreLink: { href: "/menu", label: "Всё меню →" },
  },
  {
    label: "О нас",
    icon: "ℹ️",
    items: [
      { href: "/why-us", label: "Почему мы" },
      { href: "/reviews", label: "Отзывы (4.8⭐)" },
      { href: "/gallery", label: "Галерея работ" },
      { href: "/team", label: "Команда" },
    ],
  },
];

// Быстрые ссылки (без подпунктов)
const QUICK_LINKS = [
  { href: "/gallery", label: "Галерея" },
  { href: "/pricing", label: "Цены" },
  { href: "/contact", label: "Контакты" },
  { href: "/faq", label: "FAQ" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <>
      {/* Trigger — hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="text-foreground -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 3h16M3 9h16M3 15h10" />
        </svg>
      </button>

      {/* Portal panel */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <div
              className="fixed inset-0 z-[200] sm:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Мобильное меню навигации"
            >
              {/* Backdrop */}
              <motion.button
                className="bg-foreground/40 absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                tabIndex={-1}
              />

              {/* Panel */}
              <motion.div
                className="bg-card border-line absolute top-0 right-0 flex h-full w-80 max-w-[85vw] flex-col border-l shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
              >
                {/* Header */}
                <div className="border-line flex items-center justify-between border-b p-5">
                  <span className="font-heading text-lg font-semibold">Меню</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="hover:bg-secondary flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
                    aria-label="Закрыть меню"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 5l10 10M5 15L15 5" />
                    </svg>
                  </button>
                </div>

                {/* Nav content */}
                <nav
                  className="flex-1 overflow-y-auto overscroll-contain py-2"
                  aria-label="Мобильное меню"
                >
                  {/* Главная — всегда первая */}
                  {KEY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-foreground hover:bg-secondary active:bg-secondary flex items-center px-6 py-4 text-base font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Раскрывающиеся секции */}
                  {SECTIONS.map((section) => {
                    const isExpanded = expandedSection === section.label;
                    return (
                      <div key={section.label}>
                        <button
                          onClick={() => toggleSection(section.label)}
                          className="text-foreground hover:bg-secondary active:bg-secondary flex w-full items-center justify-between px-6 py-3 text-left text-base font-medium transition-colors"
                        >
                          <span>{section.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 flex items-center gap-2 rounded-lg px-8 py-2.5 text-sm transition-colors"
                                >
                                  <ChevronRight className="h-3 w-3" />
                                  {item.label}
                                </Link>
                              ))}

                              {/* "Все ..." ссылка */}
                              {section.moreLink && (
                                <Link
                                  href={section.moreLink.href}
                                  onClick={() => setOpen(false)}
                                  className="text-gold-text hover:bg-gold-tint/50 flex items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-medium transition-colors"
                                >
                                  {section.moreLink.label}
                                </Link>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Быстрые ссылки */}
                  <div className="border-line mt-2 border-t px-6 pt-3">
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Bottom actions */}
                <div className="border-line space-y-3 border-t p-5">
                  <div className="flex gap-2">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="border-gold-text text-gold-text active:bg-gold-tint flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-4 text-base font-semibold transition-colors"
                    >
                      {SITE.phone}
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label="Написать в WhatsApp"
                      className="flex w-14 items-center justify-center rounded-lg border-2 border-emerald-500 text-emerald-600 transition-colors active:bg-emerald-50"
                    >
                      💬
                    </a>
                  </div>
                  <Link
                    href="/plan/helper"
                    onClick={() => setOpen(false)}
                    className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg py-4 text-base font-semibold no-underline transition-transform active:scale-[0.98]"
                  >
                    Рассчитать стоимость
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
