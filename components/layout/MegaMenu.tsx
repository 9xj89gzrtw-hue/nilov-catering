"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface MegaItem {
  label: string;
  href: string;
  desc?: string;
  icon?: string;
}

interface MegaGroup {
  label: string;
  href: string;
  items: MegaItem[];
}

const EVENTS: MegaGroup = {
  label: "События",
  href: "/events",
  items: [
    { label: "Корпоратив", href: "/events/korporativ", desc: "Бизнес-ланчи, банкеты, тимбилдинги" },
    { label: "Свадьба", href: "/events/svadba", desc: "От камерной до банкета на 200" },
    { label: "Выпускной", href: "/events/vypusknoy", desc: "Школьные и студенческие" },
    { label: "Детский праздник", href: "/events/detskoe", desc: "Аниматоры, шоу, меню" },
    { label: "Частное", href: "/events/chastnoe", desc: "Дни рождения, юбилеи, ужины" },
    { label: "Шеф на дом", href: "/events/chef-at-home", desc: "от 4 500 ₽/гость" },
    { label: "Никах и ифтар", href: "/events/nikah", desc: "Халяль-кейтеринг, сертификат СМР" },
  ],
};

const MENU: MegaGroup = {
  label: "Меню",
  href: "/menu",
  items: [
    { label: "Фуршет", href: "/menu/furshet" },
    { label: "Банкет", href: "/menu/banquet" },
    { label: "Кофе-брейк", href: "/menu/coffee-break" },
    { label: "Детское", href: "/menu/detskoe" },
    { label: "Веган", href: "/menu/vegan" },
    { label: "Без глютена", href: "/menu/gluten-free" },
    { label: "Халяль", href: "/menu/halal" },
    { label: "Show-cooking", href: "/menu/show-cooking" },
    { label: "Каталог блюд", href: "/menu/catalog" },
  ],
};

const GROUPS = [EVENTS, MENU];

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
              className="bg-card border-line absolute top-full left-0 z-50 mt-2 min-w-[320px] rounded-xl border p-4 shadow-lg"
              role="menu"
              aria-label={`Подменю ${group.label}`}
            >
              <div className="grid grid-cols-2 gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:bg-secondary/50 group flex items-start gap-2 rounded-lg p-2 transition-colors"
                    onClick={() => setOpen(null)}
                  >
                    {item.icon && <span className="mt-0.5 shrink-0 text-lg"></span>}
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
              <Link
                href={group.href}
                className="border-line text-gold-text mt-3 block border-t pt-3 text-center text-xs hover:underline"
                onClick={() => setOpen(null)}
              >
                Все {group.label.toLowerCase()} →
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
