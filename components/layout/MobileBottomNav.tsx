"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Calculator, Tag, Phone } from "lucide-react";

/**
 * MobileBottomNav — 5 items with true center pill.
 *
 * Mobile critic: "7 items too crowded, center pill off-center, icons reused"
 * Fix: 4 nav items + center pill = 5 cells, true center (position 3),
 * distinct icons (Home, Utensils, Tag, Phone — no duplicates).
 */
const LEFT_LINKS = [
  { href: "/", label: "Главная", Icon: Home },
  { href: "/menu", label: "Меню", Icon: Utensils },
];

const RIGHT_LINKS = [
  { href: "/pricing", label: "Цены", Icon: Tag },
  { href: "/contact", label: "Контакты", Icon: Phone },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const renderLink = (link: (typeof LEFT_LINKS)[number]) => {
    const isActive =
      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    return (
      <li key={link.href} className="flex-1">
        <Link
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className={`touch-target flex min-h-[44px] flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium no-underline transition-colors ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <link.Icon className="h-5 w-5" />
          {link.label}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className="border-line bg-background/95 safe-area-bottom fixed right-0 bottom-0 left-0 z-30 border-t backdrop-blur-md md:hidden"
      aria-label="Мобильная навигация"
    >
      <ul className="flex h-16 items-center justify-evenly" role="list">
        {LEFT_LINKS.map(renderLink)}

        {/* Center — raised primary CTA pill (true center: position 3 of 5) */}
        <li className="flex flex-1 justify-center">
          <Link
            href="/plan/helper"
            className="bg-primary text-primary-foreground hover:bg-primary/90 -mt-6 flex h-14 w-14 flex-col items-center justify-center rounded-full no-underline shadow-lg transition-colors"
            aria-label="Подбор — рассчитать стоимость"
          >
            <Calculator className="h-6 w-6" />
            <span className="mt-0.5 text-xs font-semibold">Подбор</span>
          </Link>
        </li>

        {RIGHT_LINKS.map(renderLink)}
      </ul>
    </nav>
  );
}
