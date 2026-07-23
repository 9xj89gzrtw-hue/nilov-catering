'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

/** Маппинг путей на человеческие названия */
const LABELS: Record<string, string> = {
  events: 'События',
  korporativ: 'Корпоратив',
  wedding: 'Свадьба',
  vypusknoi: 'Выпускной',
  detskoe: 'Детский праздник',
  chastnoe: 'Частное',
  'chef-at-home': 'Шеф на дом',
  menu: 'Меню',
  catalog: 'Каталог',
  bar: 'Бар',
  plan: 'Спланировать',
  calculator: 'Калькулятор',
  constructor: 'Конструктор',
  helper: 'Помощник',
  blog: 'Блог',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Не показываем на корне и main-страницах
  if (segments.length === 0) return null;
  if (['why-us', 'contact', 'faq', 'reviews'].includes(segments[0]) && segments.length === 1) return null;

  const crumbs: Crumb[] = [{ label: 'Главная', href: '/' }];

  let accumulated = '';
  for (const seg of segments) {
    accumulated += `/${seg}`;
    crumbs.push({
      label: LABELS[seg] || decodeURIComponent(seg),
      href: accumulated,
    });
  }

  // Последний элемент — текущая страница, без ссылки
  const last = crumbs.pop()!;

  return (
    <nav aria-label="Хлебные крошки" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1">
            <Link
              href={crumb.href!}
              className="hover:text-gold-text transition-colors"
            >
              {crumb.label}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </li>
        ))}
        <li>
          <span className="text-foreground font-medium" aria-current="page">
            {last.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}