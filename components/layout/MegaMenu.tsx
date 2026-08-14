"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Star,
  TrendingUp,
  Sparkles,
  Phone,
  Calculator,
  Heart,
  Users,
  ChefHat,
  Award,
  MessageSquare,
  Image,
  UserCircle,
} from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface MegaItem {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ReactNode; // Lucide icon component
  badge?: string;
}

interface MegaGroup {
  label: string;
  href: string;
  items: MegaItem[];
  extraItems?: MegaItem[];
}

/**
 * MegaMenu v2.0 — Clean Premium Navigation
 *
 * ИСПРАВЛЕНИЯ:
 * - ❌ Убраны ВСЕ эмодзи (выглядели дёшево)
 * - ✅ Заменены на Lucide иконки (единый стиль)
 * - ❌ Убрана дублирующаяся кнопка "Рассчитать" (есть в Header)
 * - ❌ Убрана дублирующаяся ссылка "Портфель" (есть в Header)
 * - ✅ Переименовано: Портфель → Галерея
 */

const SERVICES: MegaGroup = {
  label: "Услуги",
  href: "/events",
  items: [
    {
      label: "Свадьба",
      href: "/events/svadba",
      desc: "От камерной до 200 гостей",
      icon: <Heart className="h-5 w-5" />,
      badge: "Популярно",
    },
    {
      label: "Корпоратив",
      href: "/events/korporativ",
      desc: "Бизнес-ланчи, банкеты, тимбилдинги",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Детский праздник",
      href: "/events/detskoe",
      desc: "Аниматоры, шоу, детское меню",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      label: "Шеф на дом",
      href: "/events/chef-at-home",
      desc: "Ресторан-quality у вас дома",
      icon: <ChefHat className="h-5 w-5" />,
    },
    {
      label: "Выпускной",
      href: "/events/vypusknoy",
      desc: "Шоу программа под ключ",
      icon: <Award className="h-5 w-5" />,
    },
  ],
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
  items: [
    {
      label: "Банкетное меню",
      href: "/menu/banquet",
      desc: "Полный цикл обслуживания",
      icon: <ChefHat className="h-5 w-5" />,
      badge: "От 3 950 ₽",
    },
    {
      label: "Фуршет",
      href: "/menu/furshet",
      desc: "Шведский стол или порции",
      icon: <Sparkles className="h-5 w-5" />,
      badge: "От 2 450 ₽",
    },
    {
      label: "Кофе-брейк",
      href: "/menu/coffee-break",
      desc: "Для конференций и встреч",
      icon: <CoffeeIcon className="h-5 w-5" />,
      badge: "От 390 ₽",
    },
    {
      label: "Каталог блюд",
      href: "/menu/catalog",
      desc: "124+ блюда на выбор",
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Шоу-кукинг",
      href: "/menu/show-cooking",
      desc: "Повара на ваших глазах",
      icon: <ChefHat className="h-5 w-5" />,
    },
  ],
  extraItems: [
    { label: "Детское", href: "/menu/detskoe" },
    { label: "Веган", href: "/menu/vegan" },
    { label: "Халяль", href: "/menu/halal" },
    { label: "Без глютена", href: "/menu/gluten-free" },
  ],
};

const ABOUT: MegaGroup = {
  label: "О нас",
  href: "/why-us",
  items: [
    {
      label: "Почему мы",
      href: "/why-us",
      desc: "17 лет опыта · 5000+ событий · 4.8★",
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Отзывы клиентов",
      href: "/reviews",
      desc: "Реальные отзывы более 200 клиентов",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Галерея работ",
      href: "/gallery",
      desc: "Фото наших мероприятий",
      icon: <Image className="h-5 w-5" />,
    },
    {
      label: "Команда",
      href: "/team",
      desc: "Наши шефы и менеджеры",
      icon: <UserCircle className="h-5 w-5" />,
    },
  ],
};

// Простая иконка кофе (через SVG)
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
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

const GROUPS = [SERVICES, MENU, ABOUT];

const ANIMATION_CONFIG = {
  duration: 200,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
};

export default function MegaMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const trapRef = useFocusTrap(open !== null, () => setOpen(null));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMenu = useCallback(() => {
    setIsAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(null);
      setIsAnimating(false);
    }, ANIMATION_CONFIG.duration);
  }, []);

  const openMenu = useCallback(
    (groupLabel: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (open === groupLabel) {
        closeMenu();
      } else {
        setOpen(groupLabel);
      }
    },
    [open, closeMenu]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) closeMenu();
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeMenu]);

  return (
    <ul className="hidden items-center gap-0.5 lg:flex" role="menubar" ref={ref}>
      {/* Только dropdown меню — без дублирования! */}
      {GROUPS.map((group) => (
        <li key={group.label} className="relative" role="none">
          <button
            onClick={() => openMenu(group.label)}
            onMouseEnter={() => {
              if (!open && !isAnimating) setOpen(group.label);
            }}
            className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              open === group.label
                ? "text-foreground bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            } `}
            aria-expanded={open === group.label}
            aria-haspopup="true"
          >
            <span className="relative">{group.label}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                open === group.label ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown panel */}
          {(open === group.label || isAnimating) && (
            <div
              ref={trapRef}
              className={`border-border/60 bg-background/95 absolute top-full left-0 z-50 mt-2 max-w-[480px] min-w-[380px] overflow-hidden rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 ${
                isAnimating && open !== group.label
                  ? "translate-y-1 scale-[0.98] opacity-0"
                  : "translate-y-0 scale-100 opacity-100"
              } `}
              role="menu"
              aria-label={`Подменю ${group.label}`}
              onMouseLeave={closeMenu}
            >
              <div className="relative p-4">
                {/* Main items grid */}
                <div className="mb-3 grid grid-cols-2 gap-1.5">
                  {group.items.slice(0, 6).map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => closeMenu()}
                      className="group/item hover:bg-muted/70 flex items-start gap-2.5 rounded-lg p-2.5 transition-colors duration-150"
                      role="menuitem"
                    >
                      {/* Icon container — минималистичный */}
                      {item.icon && (
                        <div className="bg-muted text-muted-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors group-hover/item:bg-[#C9A66B]/10 group-hover/item:text-[#8C7140]">
                          {item.icon}
                        </div>
                      )}

                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-foreground text-sm font-medium transition-colors group-hover/item:text-[#8C7140]">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                                item.badge.includes("₽")
                                  ? "bg-[#8C7140]/10 text-[#8C7140]"
                                  : "bg-[#C9A66B]/15 text-[#8B6914]"
                              } `}
                            >
                              {item.badge.includes("Популярно") && (
                                <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
                              )}
                              {item.badge.includes("₽") && <Star className="mr-0.5 h-2.5 w-2.5" />}
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {/* Arrow on hover */}
                      <ArrowRight className="absolute top-2.5 right-2.5 h-3.5 w-3.5 text-[#C9A66B] opacity-0 transition-all duration-150 group-hover/item:opacity-100" />
                    </Link>
                  ))}
                </div>

                {/* Extra items as tags */}
                {"extraItems" in group &&
                  (group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.length > 0 && (
                    <>
                      <div className="my-2.5 flex items-center gap-2">
                        <div className="bg-border/40 h-px flex-1" />
                        <span className="text-muted-foreground/60 text-[10px] font-medium tracking-wider uppercase">
                          Ещё
                        </span>
                        <div className="bg-border/40 h-px flex-1" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 pb-1">
                        {(group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.map(
                          (item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => closeMenu()}
                              className="border-border/50 text-muted-foreground hover:text-foreground rounded-md border px-2.5 py-1 text-xs transition-colors hover:border-[#C9A66B]/40"
                              role="menuitem"
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    </>
                  )}

                {/* View all link — только эта ссылка внизу */}
                <div className="border-border/50 mt-3 border-t pt-3">
                  <Link
                    href={group.href}
                    onClick={() => closeMenu()}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-[#8C7140] transition-colors hover:text-[#6B5632]"
                  >
                    Все {group.label.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
