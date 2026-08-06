import type { Format, NavItem, SiteConfig, SocialLink } from './types';

/**
 * ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ (публичные реквизиты).
 *
 * Реальный оператор: ИП Нилов Дмитрий Игоревич.
 * Источник: открытые данные ФНС (ЕГРИП), ИНН 781433059704, ОГРНИП 314784710400401.
 * Система налогообложения: УСН «Доходы» 6% (без НДС).
 * Работаем с юрлицами по безналичному расчёту — выставляем счёт, акт, УПД (с НДС-агентом при необходимости).
 * ЭДО: Диадок (operator ID 2AE) и СБИС (operator ID 2АК).
 *
 * ВАЖНО: эти данные ПУБЛИЧНЫ. Они обязательны для B2B-договоров, тендеров (44-ФЗ/223-ФЗ),
 * и для антиспам-проверок ФНС. Скрывать их — нарушение ст. 8 ЗоЗПП.
 */
export const LEGAL: {
  operatorShort: string;
  operatorFull: string;
  inn: string;
  ogrnip: string;
  taxSystem: string;
  vatStatus: string;
  legalAddress: string;
  edo: { diadoc: string; sbis: string };
  bank: { name: string; bik: string; account: string; correspondent: string };
} = {
  operatorShort: 'ИП Нилов Дмитрий Игоревич',
  operatorFull: 'Индивидуальный предприниматель Нилов Дмитрий Игоревич',
  inn: '781433059704',
  ogrnip: '314784710400401',
  taxSystem: 'УСН «Доходы» 6% (без НДС)',
  vatStatus:
    'Работаем по безналу с юрлицами. При необходимости выставляем счёт-фактуру с НДС через налогового агента — уточняйте у менеджера.',
  legalAddress: '199106, г. Санкт-Петербург, Василеостровский район, 20-я линия, дом 11, помещение 5-Н',
  edo: {
    diadoc: '2AE (Контур.Диадок)',
    sbis: '2АК (СБИС)',
  },
  bank: {
    name: 'Филиал «Северная столица» ПАО «Банк ВТБ»',
    bik: '044030706',
    account: '— предоставляется в счёте на оплату после заключения договора',
    correspondent: '30101810200000000706',
  },
};

export const SITE: SiteConfig = {
  name: 'NiloV Catering',
  domain: 'nilov-catering.vercel.app',
  phone: '+7 (812) 919-59-11',
  phoneTel: '+78129195911',
  phoneMobile: '+7 (911) 941-72-05',
  phoneMobileTel: '+79119417205',
  whatsapp: 'https://wa.me/78129195911',
  email: 'info@odaeda.ru',
  b2bEmail: 'b2b@odaeda.ru',
  address: 'Санкт-Петербург, В.О., 20-я линия, 11',
  ogImage: '/og-image.png',
  legalName: 'ИП Нилов Дмитрий Игоревич',
  legalShort: 'ИП Нилов Д. И.',
  inn: '781433059704',
  ogrnip: '314784710400401',
  legalAddress: '199106, г. Санкт-Петербург, Василеостровский район, 20-я линия, дом 11',
  altDomain: 'interfood-catering.ru',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'События', href: '/events', children: [
    { label: 'Свадьбы', href: '/events/svadba' },
    { label: 'Корпоративы', href: '/events/korporativ' },
    { label: 'Частные события', href: '/events/chastnoe' },
    { label: 'Детские праздники', href: '/events/detskoe' },
    { label: 'Выпускные', href: '/events/vypusknoy' },
    { label: 'Юбилеи и годовщины', href: '/events/yubiley' },
    { label: 'Поминки', href: '/events/pominki' },
    { label: 'Никах и ифтар', href: '/events/nikah' },
    { label: 'Выезд шефа', href: '/events/chef-at-home' },
  ]},
  { label: 'Меню', href: '/menu', children: [
    { label: 'Фуршет', href: '/menu/furshet' },
    { label: 'Банкет', href: '/menu/banquet' },
    { label: 'Кофе-брейк', href: '/menu/coffee-break' },
    { label: 'Веган', href: '/menu/vegan' },
    { label: 'Без глютена', href: '/menu/gluten-free' },
    { label: 'Халяль', href: '/menu/halal' },
    { label: 'Каталог блюд', href: '/menu/catalog' },
  ]},
  { label: 'Тарифы', href: '/pricing' },
  { label: 'Галерея', href: '/gallery' },
  { label: 'Почему мы', href: '/why-us' },
  { label: 'Контакты', href: '/contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'vk', url: 'https://vk.com/nilovcatering', label: 'ВКонтакте' },
  { platform: 'telegram', url: 'https://t.me/nilovcatering', label: 'Telegram' },
  { platform: 'whatsapp', url: 'https://wa.me/78129195911', label: 'WhatsApp' },
  { platform: 'rutube', url: 'https://rutube.ru/channel/nilovcatering', label: 'Rutube' },
];

/**
 * EARLY_BIRD_DISCOUNTS — single source of truth for early-booking discounts.
 * Content critic found inconsistencies: pricing 5/10/15%, FAQ 10/15% (no 5%),
 * свадьба page 5% at 90 days. All must reference THIS constant.
 */
export const EARLY_BIRD_DISCOUNTS = [
  { days: 30, discount: 5,  label: '5%',  note: 'при бронировании за 30 дней' },
  { days: 60, discount: 10, label: '10%', note: 'при бронировании за 60 дней' },
  { days: 90, discount: 15, label: '15%', note: 'при бронировании за 90 дней' },
] as const;

/** Format early-bird discount for display: "10% за 60+ дней, 15% за 90+ дней" */
export function formatEarlyBirdDiscounts(): string {
  return EARLY_BIRD_DISCOUNTS
    .slice(1) // skip 5% for short form (most pages show only 10/15)
    .map(d => `${d.label} за ${d.days}+ дней`)
    .join(', ');
}

/** Full early-bird text for FAQ: "5% за 30+ дней, 10% за 60+ дней, 15% за 90+ дней" */
export function formatEarlyBirdDiscountsFull(): string {
  return EARLY_BIRD_DISCOUNTS
    .map(d => `${d.label} за ${d.days}+ дней`)
    .join(', ');
}

export const FORMAT_NAMES: Record<Format, string> = {
  furshet: 'Фуршет',
  banket: 'Банкет',
  'coffee-break': 'Кофе-брейк',
  'mobile-furshet': 'Мобильный фуршет',
  detskoe: 'Детский праздник',
  'chef-at-home': 'Выезд шефа',
  pominki: 'Поминки',
};

export const FORMAT_DESCRIPTIONS: Record<Format, string> = {
  furshet: 'Гости едят стоя, лёгкие закуски, можно свободно ходить',
  banket: 'Посадка за стол, официанты, классическая подача',
  'coffee-break': 'Кофе и десерты в перерыве мероприятия',
  'mobile-furshet': 'Выезд на площадку без кухни',
  detskoe: 'Специальное меню и развлечения для детей',
  'chef-at-home': 'Шеф-повар и сомелье у вас дома',
  pominki: 'Поминальный обед по православной традиции. Без алкоголя.',
};

export const FORMAT_HERO_IMAGES: Record<Format, string> = {
  furshet: '/images/real/canape-platter.jpg',
  banket: '/images/real/wedding-banquet.jpg',
  'coffee-break': '/images/real/coffee-drink.jpg',
  'mobile-furshet': '/images/real/canape-platter.jpg',
  detskoe: '/images/real/dessert-table.jpg',
  'chef-at-home': '/images/real/salmon-dish.jpg',
  pominki: '/images/real/wedding-banquet.jpg',
};

// ДЕМО-клипы для HomeVideoShowcase и EventsRecapHome
import type { HomeShowcaseClip, RecapClip } from './video';

export const DEMO_SHOWCASE_CLIPS: HomeShowcaseClip[] = [
  {
    video: { provider: 'selfhost' },
    posterSrc: '/placeholders/video-showcase-1.svg',
    eventType: 'Корпоратив',
    title: 'Завтрак на 300 гостей',
    durationSec: 30,
  },
];

export const DEMO_RECAP_CLIPS: RecapClip[] = [
  {
    video: { provider: 'selfhost' },
    posterSrc: '/placeholders/video-recap-1.svg',
    eventType: 'Свадьба',
    title: 'Банкет в шатре',
    venue: 'Загородный клуб',
    guests: 120,
    durationSec: 45,
  },
  {
    video: { provider: 'selfhost' },
    posterSrc: '/placeholders/video-recap-2.svg',
    eventType: 'Корпоратив',
    title: 'Гала-ужин',
    venue: 'Исторический особняк',
    guests: 200,
    durationSec: 25,
  },
  {
    video: { provider: 'selfhost' },
    posterSrc: '/placeholders/video-recap-3.svg',
    eventType: 'Частное',
    title: 'Юбилей на 50 гостей',
    venue: 'Лофт',
    guests: 50,
    durationSec: 30,
  },
  {
    video: { provider: 'selfhost' },
    posterSrc: '/placeholders/video-recap-4.svg',
    eventType: 'Выезд шефа',
    title: 'Ужин в загородном доме',
    venue: 'Дом клиента',
    guests: 12,
    durationSec: 35,
  },
];
