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