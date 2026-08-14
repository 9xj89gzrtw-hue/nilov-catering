"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface MegaItem {
  label: string;
  href: string;
  desc?: string;
}

interface MegaGroup {
  label: string;
  href: string;
  items: MegaItem[];
  extraItems?: MegaItem[]; // Дополнительные (менее частые) пункты
}

/**
 * MegaMenu — упрощённая навигация по принципам UX 2026:
 * - 5-7 пунктов в главном меню (sweet spot)
 * - Логичная группировка с точки зрения КЛИЕНТА
 * - Минимум dropdown'ов, максимум ясности
 *
 * Структура:
 * 1. Услуги — ЧТО организуем (события)
 * 2. Меню — ЧЕМ кормим (форматы питания)
 * + Прямые ссылки: Галерея, Цены, Контакты
 */

const SERVICES: MegaGroup = {
  label: "Услуги",
  href: "/events",
  items: [
    { label: "Свадьба", href: "/events/svadba", desc: "От камерной до 200 гостей" },
    { label: "Корпоратив", href: "/events/korporativ", desc: "Бизнес-ланчи, банкеты, тимбилдинги" },
    { label: "Детский праздник", href: "/events/detskoe", desc: "Аниматоры, шоу, детское меню" },
    { label: "Частное мероприятие", href: "/events/chastnoe", desc: "Дни рождения, юбилеи, ужины" },
    { label: "Шеф на дом", href: "/events/chef-at-home", desc: "Ресторан-quality у вас дома" },
  ],
  // Дополнительные (менее частые) — доступны через "Все услуги"
  extraItems: [
    { label: "Выпускной", href: "/events/vypusknoy" },
    { label: "Никах и ифтар", href: "/events/nikah" },
    { label: "Поминки", href: "/events/pominki" },
  ],
};

const MENU: MegaGroup = {
  label: "Меню",
  href: "/menu",
  items: [
    { label: "Банкетное меню", href: "/menu/banquet", desc: "Полный цикл обслуживания" },
    { label: "Фуршет", href: "/menu/furshet", desc: "Шведский стол или порции" },
    { label: "Кофе-брейк", href: "/menu/coffee-break", desc: "Для конференций и встреч" },
    { label: "Шоу-кукинг", href: "/menu/show-cooking", desc: "Повара на ваших глазах" },
    { label: "Каталог блюд", href: "/menu/catalog", desc: "Все позиции с ценами" },
  ],
  // Специальные меню (ниже)
  extraItems: [
    { label: "Детское меню", href: "/menu/detskoe" },
    { label: "Веган / Халяль", href: "/menu/vegan" },
    { label: "Без глютена", href: "/menu/gluten-free" },
  ],
};

const GROUPS = [SERVICES, MENU];

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
      {GROUPS.map((group) => (
        <li key={group.href} className="relative" role="none">
          <button
            onClick={() => setOpen(open === group.label ? null : group.label)}
            className="text-muted-foreground hover:text-foreground relative flex items-center gap-1 px-3 py-2 text-sm transition-colors"
            aria-expanded={open === group.label}
            aria-haspopup="true"
          >
            {group.label}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${open === group.label ? "rotate-180" : ""}`}
            />
          </button>

          {open === group.label && (
            <div
              ref={trapRef}
              className="bg-card border-line absolute top-full left-0 z-50 mt-2 min-w-[340px] rounded-xl border p-4 shadow-lg"
              role="menu"
              aria-label={`Подменю ${group.label}`}
            >
              {/* Основные пункты */}
              <div className="mb-3 grid grid-cols-1 gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:bg-secondary/50 group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors"
                    onClick={() => setOpen(null)}
                  >
                    <div className="min-w-0">
                      <div className="text-foreground group-hover:text-gold-text text-sm font-medium transition-colors">
                        {item.label}
                      </div>
                      {item.desc && (
                        <div className="text-muted-foreground mt-0.5 text-xs leading-tight">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Разделитель + дополнительные пункты (если есть) */}
              {"extraItems" in group &&
                (group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.length > 0 && (
                  <>
                    <div className="border-line my-2 border-t" />
                    <p className="text-muted-foreground mb-1.5 px-2 text-xs font-medium">Ещё:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(group as typeof SERVICES & { extraItems: MegaItem[] }).extraItems.map(
                        (item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
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
                  className="text-gold-text block text-center text-xs font-medium hover:underline"
                  onClick={() => setOpen(null)}
                >
                  Все {group.label.toLowerCase()} →
                </Link>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
