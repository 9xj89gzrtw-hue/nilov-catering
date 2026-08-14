"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Calculator, Sparkles } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface MegaItem {
  label: string;
  href: string;
  desc?: string;
  icon?: string; // Emoji icon for visual scanning
  badge?: string; // "Популярно", "Новинка", etc.
}

interface MegaGroup {
  label: string;
  href: string;
  items: MegaItem[];
  extraItems?: MegaItem[];
  icon?: string;
}

/**
 * MegaMenu — навигация по принципам UX 2025-2026 (ОПТИМИЗИРОВАННАЯ ВЕРСИЯ)
 *
 * Ключевые улучшения:
 * - Максимально плоская структура (minimize cognitive load)
 * - Группировка по USER JOURNEY, а не по отделам
 * - Featured-секция для быстрых переходов к конверсии
 * - Иконки для быстрого сканирования (visual processing = 13ms vs 140ms text)
 *
 * Структура (3 dropdown + прямые ссылки):
 * 1. Услуги — ЧТО организуем (события) ▾
 * 2. Меню — ЧЕМ кормим (форматы) ▾
 * 3. О нас — ПОЧЕМУ мы (доверие) ▾
 *
 * Sources: NNGroup Menu Guidelines, LogRocket Mega Menus 2025, Figma Trends 2026
 */

const SERVICES: MegaGroup = {
  label: "Услуги",
  href: "/events",
  icon: "🎉",
  items: [
    {
      label: "Свадьба",
      href: "/events/svadba",
      desc: "От камерной до 200 гостей",
      icon: "💒",
      badge: "Популярно",
    },
    {
      label: "Корпоратив",
      href: "/events/korporativ",
      desc: "Бизнес-ланчи, банкеты, тимбилдинги",
      icon: "🏢",
    },
    {
      label: "Детский праздник",
      href: "/events/detskoe",
      desc: "Аниматоры, шоу, детское меню",
      icon: "🎈",
    },
    {
      label: "Шеф на дом",
      href: "/events/chef-at-home",
      desc: "Ресторан-quality у вас дома",
      icon: "🍽️",
    },
    {
      label: "Выпускной",
      href: "/events/vypusknoy",
      desc: "Шоу программа под ключ",
      icon: "🎓",
    },
  ],
  // Менее частые — как теги (не прячем!)
  extraItems: [
    { label: "Частное мероприятие", href: "/events/chastnoe" },
    { label: "Юбилей", href: "/events/yubiley" },
    { label: "Никах / Халяль", href: "/events/nikah" },
    { label: "Поминки", href: "/events/pominki" },
  ],
};

const MENU: MegaGroup = {
  label: "Меню",
  href: "/menu",
  icon: "🍽️",
  items: [
    {
      label: "Банкетное меню",
      href: "/menu/banquet",
      desc: "Полный цикл обслуживания",
      icon: "🍷",
      badge: "От 3 950 ₽",
    },
    {
      label: "Фуршет",
      href: "/menu/furshet",
      desc: "Шведский стол или порции",
      icon: "🥂",
      badge: "От 2 450 ₽",
    },
    {
      label: "Кофе-брейк",
      href: "/menu/coffee-break",
      desc: "Для конференций и встреч",
      icon: "☕",
      badge: "От 390 ₽",
    },
    { label: "Каталог блюд", href: "/menu/catalog", desc: "124+ блюда на выбор", icon: "📋" },
    { label: "Шоу-кукинг", href: "/menu/show-cooking", desc: "Повара на ваших глазах", icon: "👨‍🍳" },
  ],
  // Специальные меню как теги
  extraItems: [
    { label: "Детское", href: "/menu/detskoe" },
    { label: "Веган", href: "/menu/vegan" },
    { label: "Халяль", href: "/menu/halal" },
    { label: "Без глютена", href: "/menu/gluten-free" },
  ],
};

// О нас dropdown с доверием
const ABOUT: MegaGroup = {
  label: "О нас",
  href: "/why-us",
  icon: "ℹ️",
  items: [
    {
      label: "Почему мы",
      href: "/why-us",
      desc: "17 лет опыта · 5000+ событий · 4.8★",
      icon: "⭐",
    },
    {
      label: "Отзывы клиентов",
      href: "/reviews",
      desc: "Реальные отзывы более 200 клиентов",
      icon: "💬",
    },
    { label: "Портфель работ", href: "/gallery", desc: "Фото наших мероприятий", icon: "📸" },
    { label: "Команда", href: "/team", desc: "Наши шефы и менеджеры", icon: "👥" },
  ],
};

const GROUPS = [SERVICES, MENU, ABOUT];

// Featured actions — быстрые пути к конверсии
const FEATURED_ACTIONS = [
  {
    href: "/plan/helper",
    label: "Рассчитать стоимость",
    icon: Calculator,
    primary: true,
  },
  {
    href: "/pricing",
    label: "Цены и калькулятор",
    icon: null,
    primary: false,
  },
];

export default function MegaMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLUListElement>(null);
  const trapRef = useFocusTrap(open !== null, () => setOpen(null));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <ul className="hidden items-center gap-1 md:flex" role="menubar" ref={ref}>
      {/* Dropdown меню (Услуги + Меню + О нас) */}
      {GROUPS.map((group) => (
        <li key={group.label} className="relative" role="none">
          <button
            onClick={() => setOpen(open === group.label ? null : group.label)}
            className={`text-muted-foreground hover:text-foreground relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              open === group.label ? "text-foreground bg-secondary/50" : ""
            }`}
            aria-expanded={open === group.label}
            aria-haspopup="true"
          >
            {group.icon && (
              <span className="text-base" aria-hidden="true">
                {group.icon}
              </span>
            )}
            {group.label}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${open === group.label ? "rotate-180" : ""}`}
            />
          </button>

          {open === group.label && (
            <div
              ref={trapRef}
              className="bg-card border-line absolute top-full left-0 z-50 mt-2 max-w-[560px] min-w-[440px] rounded-xl border p-4 shadow-xl"
              role="menu"
              aria-label={`Подменю ${group.label}`}
            >
              {/* Основные пункты — карточный формат */}
              <div className="mb-3 grid grid-cols-2 gap-2">
                {group.items.slice(0, 6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:bg-secondary/60 hover:border-gold-text/30 group flex items-start gap-2.5 rounded-lg border border-transparent p-2.5 transition-all"
                    onClick={() => setOpen(null)}
                  >
                    {/* Иконка */}
                    {item.icon && (
                      <span
                        className="bg-secondary/70 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-lg"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="text-foreground group-hover:text-gold-text flex items-center gap-1.5 text-sm leading-tight font-medium transition-colors">
                        {item.label}
                        {item.badge && (
                          <span className="bg-gold-text/10 text-gold-text rounded px-1.5 py-0.5 text-[10px] font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <div className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-snug">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Дополнительные пункты (если есть) — как теги */}
              {"extraItems" in group &&
                (group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.length > 0 && (
                  <>
                    <div className="border-line my-2.5 border-t" />
                    <div className="flex flex-wrap gap-1.5">
                      {(group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.map(
                        (item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground hover:bg-secondary/70 hover:border-gold-text/30 rounded-md border border-transparent px-2.5 py-1.5 text-xs font-medium transition-all"
                            onClick={() => setOpen(null)}
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </>
                )}

              {/* Ссылка "Все ..." внизу */}
              <div className="border-line mt-3 border-t pt-3">
                <Link
                  href={group.href}
                  className="text-gold-text hover:text-gold-text/80 flex items-center justify-center gap-1 text-xs font-semibold transition-colors"
                  onClick={() => setOpen(null)}
                >
                  Все {group.label.toLowerCase()} →
                </Link>
              </div>
            </div>
          )}
        </li>
      ))}

      {/* Разделитель */}
      <li className="bg-border h-5 w-px" role="separator" aria-hidden="true" />

      {/* Прямая ссылка — Портфель (важная для доверия) */}
      <li role="none">
        <Link
          href="/gallery"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md px-3 py-2 text-sm no-underline transition-colors"
        >
          Портфель
        </Link>
      </li>

      {/* Главный CTA — Рассчитать (выделенный) */}
      <li role="none">
        <Link
          href="/plan/helper"
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold no-underline shadow-sm transition-all hover:shadow-md"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Рассчитать
        </Link>
      </li>
    </ul>
  );
}
