'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Utensils, Images, Calculator } from 'lucide-react';

// 43_NAV_SPEC: 5 пунктов (НЕ 2)
const MOBILE_LINKS = [
  { href: '/', label: 'Главная', Icon: Home },
  { href: '/events', label: 'События', Icon: Briefcase },
  { href: '/menu', label: 'Меню', Icon: Utensils },
  { href: '/gallery', label: 'Галерея', Icon: Images },
  { href: '/plan', label: 'Спланировать', Icon: Calculator },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-background/95 backdrop-blur-md lg:hidden safe-area-bottom"
      aria-label="Мобильная навигация"
    >
      <ul className="flex items-center justify-evenly h-16 gap-2" role="list">
        {MOBILE_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          const isPrimary = link.href === '/plan';
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-colors touch-target ${
                  isActive
                    ? isPrimary ? 'text-gold-text' : 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <link.Icon className="w-5 h-5" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
