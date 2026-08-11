'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, Calculator, Tag, Phone } from 'lucide-react';

/**
 * MobileBottomNav — 5 items with true center pill.
 *
 * Mobile critic: "7 items too crowded, center pill off-center, icons reused"
 * Fix: 4 nav items + center pill = 5 cells, true center (position 3),
 * distinct icons (Home, Utensils, Tag, Phone — no duplicates).
 */
const LEFT_LINKS = [
  { href: '/', label: 'Главная', Icon: Home },
  { href: '/menu', label: 'Меню', Icon: Utensils },
];

const RIGHT_LINKS = [
  { href: '/pricing', label: 'Цены', Icon: Tag },
  { href: '/contact', label: 'Контакты', Icon: Phone },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const renderLink = (link: typeof LEFT_LINKS[number]) => {
    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
    return (
      <li key={link.href} className="flex-1">
        <Link
          href={link.href}
          aria-current={isActive ? 'page' : undefined}
          className={`flex flex-col items-center gap-0.5 px-1 py-2 text-xs font-medium transition-colors touch-target min-h-[44px] justify-center no-underline ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          <link.Icon className="w-5 h-5" />
          {link.label}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-background/95 backdrop-blur-md md:hidden safe-area-bottom"
      aria-label="Мобильная навигация"
    >
      <ul className="flex items-center justify-evenly h-16" role="list">
        {LEFT_LINKS.map(renderLink)}

        {/* Center — raised primary CTA pill (true center: position 3 of 5) */}
        <li className="flex-1 flex justify-center">
          <Link
            href="/plan/helper"
            className="flex flex-col items-center justify-center -mt-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors no-underline"
            aria-label="Подбор — рассчитать стоимость"
          >
            <Calculator className="w-6 h-6" />
            <span className="text-[11px] font-semibold mt-0.5">Подбор</span>
          </Link>
        </li>

        {RIGHT_LINKS.map(renderLink)}
      </ul>
    </nav>
  );
}
