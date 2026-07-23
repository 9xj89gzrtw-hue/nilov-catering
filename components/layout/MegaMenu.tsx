'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

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
  label: 'События',
  href: '/events',
  items: [
    { label: 'Корпоратив', href: '/events/korporativ', desc: 'Бизнес-ланчи, банкеты, тимбилдинги', icon: '💼' },
    { label: 'Свадьба', href: '/events/svadba', desc: 'От камерной до банкета на 200', icon: '💍' },
    { label: 'Выпускной', href: '/events/vypusknoy', desc: 'Школьные и студенческие', icon: '🎓' },
    { label: 'Детский праздник', href: '/events/detskoe', desc: 'Аниматоры, шоу, меню', icon: '🎈' },
    { label: 'Частное', href: '/events/chastnoe', desc: 'Дни рождения, юбилеи, ужины', icon: '🥂' },
    { label: 'Шеф на дом', href: '/events/chef-at-home', desc: 'от 2 500 ₽/час', icon: '👨‍🍳' },
  ],
};

const MENU: MegaGroup = {
  label: 'Меню',
  href: '/menu',
  items: [
    { label: 'Фуршет', href: '/menu/furshet', icon: '🥪' },
    { label: 'Банкет', href: '/menu/banquet', icon: '🍽️' },
    { label: 'Кофе-брейк', href: '/menu/coffee-break', icon: '☕' },
    { label: 'Детское', href: '/menu/detskoe', icon: '🧒' },
    { label: 'Веган', href: '/menu/vegan', icon: '🥬' },
    { label: 'Без глютена', href: '/menu/gluten-free', icon: '🌾' },
    { label: 'Халяль', href: '/menu/halal', icon: '☪️' },
    { label: 'Show-cooking', href: '/menu/show-cooking', icon: '🔥' },
    { label: 'Каталог блюд', href: '/menu/catalog', icon: '📋' },
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
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <ul className="hidden lg:flex items-center gap-1" role="menubar" ref={ref}>
      {GROUPS.map((group) => (
        <li key={group.href} className="relative" role="none">
          <button
            onClick={() => setOpen(open === group.label ? null : group.label)}
            onMouseEnter={() => setOpen(group.label)}
            className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            aria-expanded={open === group.label}
            aria-haspopup="true"
            role="menuitem"
          >
            {group.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open === group.label ? 'rotate-180' : ''}`} />
          </button>

          {open === group.label && (
            <div
              ref={trapRef}
              className="absolute top-full left-0 mt-2 bg-card border border-line rounded-xl shadow-lg p-4 min-w-[320px] z-50"
              role="menu"
              aria-label={`Подменю ${group.label}`}
            >
              <div className="grid grid-cols-2 gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                    role="menuitem"
                    onClick={() => setOpen(null)}
                  >
                    {item.icon && <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>}
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground group-hover:text-gold-text transition-colors">
                        {item.label}
                      </div>
                      {item.desc && (
                        <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={group.href}
                className="block mt-3 pt-3 border-t border-line text-xs text-gold-text hover:underline text-center"
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