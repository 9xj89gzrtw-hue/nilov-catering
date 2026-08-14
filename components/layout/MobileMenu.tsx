"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Heart,
  Users,
  Sparkles,
  ChefHat,
  Award,
  Star,
  MessageSquare,
  Image,
  HelpCircle,
  FileText,
  Phone,
  Calculator,
  Menu,
  X,
} from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * MobileMenu v2.0 — Premium Mobile Navigation
 *
 * ИСПРАВЛЕНИЯ:
 * - ❌ УБРАНЫ ВСЕ ЭМОДЗИ (было: 🏠🎉💒🏢🎈🍽️🎓🕌🍷🥂☕⭐💬📸❓📰📞🎯)
 * - ✅ Заменены на Lucide иконки
 * - ✅ "Портфель" → "Галерея"
 * - ✅ Единый стиль с Header и MegaMenu
 */

// Основные ссылки
const KEY_LINKS = [{ href: "/", label: "Главная", icon: <Home className="h-5 w-5" /> }];

// Секции с подпунктами
const SECTIONS = [
  {
    label: "Услуги",
    icon: <Sparkles className="h-5 w-5" />,
    items: [
      { href: "/events/svadba", label: "Свадьба", icon: <Heart className="h-4 w-4" /> },
      { href: "/events/korporativ", label: "Корпоратив", icon: <Users className="h-4 w-4" /> },
      {
        href: "/events/detskoe",
        label: "Детский праздник",
        icon: <Sparkles className="h-4 w-4" />,
      },
      { href: "/events/chef-at-home", label: "Шеф на дом", icon: <ChefHat className="h-4 w-4" /> },
      { href: "/events/vypusknoy", label: "Выпускной", icon: <Award className="h-4 w-4" /> },
      { href: "/events/nikah", label: "Никах / Халяль", icon: <Star className="h-4 w-4" /> },
    ],
    moreLink: { href: "/events", label: "Все услуги" },
  },
  {
    label: "Меню",
    icon: <ChefHat className="h-5 w-5" />,
    items: [
      { href: "/menu/banquet", label: "Банкетное меню", icon: <Award className="h-4 w-4" /> },
      { href: "/menu/furshet", label: "Фуршет", icon: <Sparkles className="h-4 w-4" /> },
      { href: "/menu/coffee-break", label: "Кофе-брейк", icon: <CoffeeIcon className="h-4 w-4" /> },
      { href: "/menu/show-cooking", label: "Шоу-кукинг", icon: <ChefHat className="h-4 w-4" /> },
      { href: "/menu/catalog", label: "Каталог блюд", icon: <FileText className="h-4 w-4" /> },
    ],
    moreLink: { href: "/menu", label: "Всё меню" },
  },
];

// Быстрые ссылки
const QUICK_LINKS = [
  { href: "/why-us", label: "Почему мы", icon: <Star className="h-5 w-5" /> },
  { href: "/reviews", label: "Отзывы", icon: <MessageSquare className="h-5 w-5" />, badge: "4.8★" },
  { href: "/gallery", label: "Галерея", icon: <Image className="h-5 w-5" /> }, // БЫЛО "Портфель"
  { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-5 w-5" /> },
  { href: "/blog", label: "Блог", icon: <FileText className="h-5 w-5" /> },
  { href: "/contact", label: "Контакты", icon: <Phone className="h-5 w-5" /> },
];

// Иконка кофе
function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    </svg>
  );
}

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
        className="text-foreground -mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portal panel */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <div
              className="fixed inset-0 z-[200]"
              role="dialog"
              aria-modal="true"
              aria-label="Мобильное меню навигации"
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                tabIndex={-1}
              />

              {/* Panel */}
              <motion.div
                className="bg-background absolute top-0 right-0 flex h-full w-[300px] max-w-[85vw] flex-col shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
              >
                {/* Header */}
                <div className="border-border/50 flex items-center justify-between border-b px-5 py-4">
                  <span className="font-heading text-foreground text-lg font-semibold">Меню</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:bg-muted flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                    aria-label="Закрыть меню"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav content */}
                <nav className="flex-1 overflow-y-auto py-2" aria-label="Мобильное меню">
                  {/* Главная */}
                  {KEY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-foreground hover:bg-muted flex items-center gap-3 px-5 py-3 text-base font-medium transition-colors"
                    >
                      <span className="text-muted-foreground">{link.icon}</span>
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
                          className="text-foreground hover:bg-muted flex w-full items-center justify-between px-5 py-3 text-left text-base font-medium transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-muted-foreground">{section.icon}</span>
                            {section.label}
                          </span>
                          <ChevronDown
                            className={`text-muted-foreground h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
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
                                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-8 py-2.5 pl-12 text-sm transition-colors"
                                >
                                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                                  {item.label}
                                </Link>
                              ))}

                              {section.moreLink && (
                                <Link
                                  href={section.moreLink.href}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-2 px-8 py-2.5 pl-12 text-sm font-medium text-[#C9A66B] transition-colors hover:bg-[#C9A66B]/5"
                                >
                                  {section.moreLink.label} →
                                </Link>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Разделитель */}
                  <div className="border-border/50 mx-5 my-2 border-t" />

                  {/* Быстрые ссылки */}
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors"
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="ml-auto text-xs font-medium text-[#C9A66B]">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Bottom actions */}
                <div className="border-border/50 space-y-2.5 border-t p-4">
                  <div className="flex gap-2">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#C9A66B]/50 py-2.5 text-sm font-medium text-[#8C7140] transition-colors hover:bg-[#C9A66B]/5"
                    >
                      <Phone className="h-4 w-4" />
                      {SITE.phone}
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label="Написать в WhatsApp"
                      className="flex w-12 items-center justify-center rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-600"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z" />
                      </svg>
                    </a>
                  </div>
                  <Link
                    href="/plan/helper"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2D2624] py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3D3634]"
                  >
                    <Calculator className="h-4 w-4" />
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
