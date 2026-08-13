'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { SITE } from '@/lib/data';

interface Crumb {
  label: string;
  href?: string;
}

/** Маппинг путей на человеческие названия */
const LABELS: Record<string, string>= {
  events: 'События',
  korporativ: 'Корпоратив',
  wedding: 'Свадьба',
  svadba: 'Свадьба',
  vypusknoi: 'Выпускной',
  vypusknoy: 'Выпускной',
  detskoe: 'Детский праздник',
  chastnoe: 'Частное',
  'chef-at-home': 'Шеф на дом',
  pominki: 'Поминки',
  yubiley: 'Юбилей',
  recap: 'Рекапы',
  menu: 'Меню',
  catalog: 'Каталог',
  bar: 'Бар',
  'coffee-break': 'Кофе-брейк',
  'gluten-free': 'Без глютена',
  halal: 'Халяль',
  vegan: 'Веган',
  'show-cooking': 'Шоу-кукинг',
  plan: 'Спланировать',
  calculator: 'Калькулятор',
  constructor: 'Конструктор',
  helper: 'Помощник',
  assistant: 'Ассистент',
  blog: 'Блог',
  seasonal: 'Сезонное',
  bbq: 'BBQ',
  maslenitsa: 'Масленица',
  'new-year': 'Новый год',
  info: 'Инфо',
  degustatsiya: 'Дегустация',
  help: 'Помощь',
  formats: 'Форматы',
  delivery: 'Доставка',
  order: 'Заказ',
  tasting: 'Дегустация',
  gallery: 'Галерея',
  venues: 'Площадки',
  certificates: 'Сертификаты',
  allergens: 'Аллергены',
  whyus: 'Почему мы',
  'why-us': 'Почему мы',
  team: 'Команда',
  pricing: 'Тарифы',
  contact: 'Контакты',
  accessibility: 'Доступность',
  offer: 'Оферта',
  privacy: 'Политика',
  terms: 'Условия',
  cookies: 'Cookies',
  careers: 'Карьера',
  partners: 'Партнёрам',
  'media-kit': 'Медиа-кит',
  subscribe: 'Подписка',
  'thank-you': 'Спасибо',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Не показываем на корне
  if (segments.length === 0) return null;

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

  // BreadcrumbList JSON-LD for SEO rich results
  const allCrumbs = [...crumbs, { label: last.label, href: undefined }];
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allCrumbs.map((c, i) =>({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://${SITE.domain}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className="text-base text-foreground/80 mb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb) =>(
          <li key={crumb.href} className="flex items-center gap-1.5">
            <Link
              href={crumb.href!}
              className="text-foreground/70 hover:text-gold-text transition-colors no-underline"
            >
              {crumb.label}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground/60" aria-hidden="true" />
          </li>
        ))}
        <li>
          <span className="text-foreground font-semibold" aria-current="page">
            {last.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}