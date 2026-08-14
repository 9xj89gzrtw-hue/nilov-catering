"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PartyPopper, Utensils, Calculator, Phone, Menu, Info } from "lucide-react";

/**
 * MobileBottomNav — 5 items with center CTA pill (UX 2025-2026)
 *
 * Улучшенная версия:
 * - Контекстные иконки (меняются от страницы)
 * - Центральная кнопка CTA (primary conversion path)
 * - 4 nav items + 1 center pill = 5 cells (optimal per NNGroup)
 * - Активное состояние для текущего раздела
 *
 * Sources:
 * - UXPin: Tab bars provide always-visible navigation (Oct 2025)
 * - Reddit/NNGroup: Bottom nav > hamburger for primary actions
 * - Mobile UX: Max 5 items for optimal touch targets
 */

const LEFT_LINKS = [
  { href: "/", label: "Главная", Icon: Home },
  { href: "/events", label: "Услуги", Icon: PartyPopper },
];

const RIGHT_LINKS = [
  { href: "/menu", label: "Меню", Icon: Utensils },
  { href: "/contact", label: "Контакты", Icon: Phone },
];

// Контекстные изменения центральной кнопки
const CENTER_CTA: Record<string, { href: string; label: string; icon: typeof Calculator }> = {
  default: { href: "/plan/helper", label: "Подбор", icon: Calculator },
  "/events": { href: "/events", label: "Все", icon: Menu },
  "/menu": { href: "/plan/constructor", label: "Сборка", icon: Utensils },
  "/pricing": { href: "/plan/calculator", label: "Расчёт", icon: Calculator },
};

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Определяем контекстную центральную кнопку
  const getCenterCTA = () => {
    if (pathname.startsWith("/events")) return CENTER_CTA["/events"];
    if (pathname.startsWith("/menu")) return CENTER_CTA["/menu"];
    if (pathname === "/pricing") return CENTER_CTA["/pricing"];
    return CENTER_CTA["default"];
  };

  const centerCTA = getCenterCTA();
  const CenterIcon = centerCTA.icon;

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
          <span className="truncate">{link.label}</span>
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
            href={centerCTA.href}
            className="bg-primary text-primary-foreground hover:bg-primary/90 -mt-6 flex h-14 w-14 flex-col items-center justify-center rounded-full no-underline shadow-lg transition-all hover:shadow-xl active:scale-95"
            aria-label={`${centerCTA.label} — рассчитать стоимость`}
          >
            <CenterIcon className="h-6 w-6" />
            <span className="mt-0.5 text-[10px] leading-tight font-semibold">
              {centerCTA.label}
            </span>
          </Link>
        </li>

        {RIGHT_LINKS.map(renderLink)}
      </ul>
    </nav>
  );
}
