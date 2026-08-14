"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * MobileMenu — упрощённая мобильная навигация (UX 2025-2026)
 *
 * Key changes based on research:
 * - Убрана секция "О нас" (распределили по другим секциям)
 * - "Галерея" → "Портфель" (однозначное название)
 * - FAQ вынесен отдельно (частый запрос)
 * - Максимально плоская структура (minimize cognitive load)
 * - Bottom: CTA всегда на виду
 *
 * Structure (flat + 2 expandable sections):
 * - Главная (static)
 * - Услуги ▸ (expandable — 6 items)
 * - Меню ▸ (expandable — 4 items)
 * - Почему мы (direct link)
 * - Отзывы (direct link with rating)
 * - Портфель (direct link)
 * - FAQ (direct link)
 * - Блог (direct link)
 */

// Основные ссылки (всегда видны)
const KEY_LINKS = [{ href: "/", label: "Главная", icon: "🏠" }];

// Секции с подпунктами (только 2 для минимизации cognitive load!)
const SECTIONS = [
  {
    label: "Услуги",
    icon: "🎉",
    items: [
      { href: "/events/svadba", label: "Свадьба", icon: "💒" },
      { href: "/events/korporativ", label: "Корпоратив", icon: "🏢" },
      { href: "/events/detskoe", label: "Детский праздник", icon: "🎈" },
      { href: "/events/chef-at-home", label: "Шеф на дом", icon: "🍽️" },
      { href: "/events/vypusknoy", label: "Выпускной", icon: "🎓" },
      { href: "/events/nikah", label: "Никах и ифтар", icon: "🕌" },
    ],
    moreLink: { href: "/events", label: "Все услуги →" },
  },
  {
    label: "Меню",
    icon: "🍽️",
    items: [
      { href: "/menu/banquet", label: "Банкетное меню", icon: "🍷" },
      { href: "/menu/furshet", label: "Фуршет", icon: "🥂" },
      { href: "/menu/coffee-break", label: "Кофе-брейк", icon: "☕" },
      { href: "/menu/show-cooking", label: "Шоу-кукинг", icon: "👨‍🍳" },
      { href: "/menu/catalog", label: "Каталог блюд", icon: "📋" },
    ],
    moreLink: { href: "/menu", label: "Всё меню →" },
  },
];

// Быстрые ссылки (без подпунктов — flat structure)
const QUICK_LINKS = [
  { href: "/why-us", label: "Почему мы", icon: "⭐" },
  { href: "/reviews", label: "Отзывы (4.8★)", icon: "💬" },
  { href: "/gallery", label: "Портфель", icon: "📸" },
  { href: "/faq", label: "FAQ", icon: "❓" },
  { href: "/blog", label: "Блог", icon: "📰" },
  { href: "/contact", label: "Контакты", icon: "📞" },
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
                className="bg-foreground/50 absolute inset-0 backdrop-blur-sm"
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
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      🎉
                    </span>
                    <span className="font-heading text-lg font-semibold">Меню</span>
                  </div>
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
                      className="text-foreground hover:bg-secondary active:bg-secondary flex items-center gap-3 px-6 py-3.5 text-base font-medium transition-colors"
                    >
                      <span className="text-lg" aria-hidden="true">
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  ))}

                  {/* Раскрывающиеся секции (только 2!) */}
                  {SECTIONS.map((section) => {
                    const isExpanded = expandedSection === section.label;
                    return (
                      <div key={section.label}>
                        <button
                          onClick={() => toggleSection(section.label)}
                          className="text-foreground hover:bg-secondary active:bg-secondary flex w-full items-center justify-between px-6 py-3 text-left text-base font-medium transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-lg" aria-hidden="true">
                              {section.icon}
                            </span>
                            {section.label}
                          </span>
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
                                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 flex items-center gap-3 rounded-lg px-8 py-2.5 text-sm transition-colors"
                                >
                                  {(item as { icon?: string }).icon && (
                                    <span className="text-sm" aria-hidden="true">
                                      {(item as { icon?: string }).icon}
                                    </span>
                                  )}
                                  <ChevronRight className="h-3 w-3 shrink-0" />
                                  {item.label}
                                </Link>
                              ))}

                              {/* "Все ..." ссылка */}
                              {section.moreLink && (
                                <Link
                                  href={section.moreLink.href}
                                  onClick={() => setOpen(false)}
                                  className="text-gold-text hover:bg-gold-tint/30 flex items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-semibold transition-colors"
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

                  {/* Разделитель перед быстрыми ссылками */}
                  <div className="border-line mx-6 my-3 border-t" />

                  {/* Быстрые ссылки (flat — без вложенности) */}
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:bg-secondary flex items-center gap-3 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
                    >
                      <span className="text-base" aria-hidden="true">
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Bottom actions — CTA zone */}
                <div className="border-line space-y-3 border-t p-5">
                  <div className="flex gap-2">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="border-gold-text text-gold-text active:bg-gold-tint flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3.5 text-sm font-semibold transition-colors"
                    >
                      📞 {SITE.phone}
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label="Написать в WhatsApp"
                      className="flex w-14 items-center justify-center rounded-lg border-2 border-emerald-500 bg-emerald-500 text-white transition-colors"
                    >
                      💬
                    </a>
                  </div>
                  <Link
                    href="/plan/helper"
                    onClick={() => setOpen(false)}
                    className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold no-underline shadow-md transition-all active:scale-[0.98]"
                  >
                    🎯 Рассчитать стоимость
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
