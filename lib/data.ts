import type { Format, NavItem, SiteConfig, SocialLink } from './types';

export const SITE: SiteConfig = {
  name: 'NiloV Catering',
  domain: 'odaeda.ru',
  phone: '+7 (812) 919-59-11',
  email: 'info@odaeda.ru',
  address: 'Санкт-Петербург',
  ogImage: '/og-image.jpg',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'События', href: '/events', children: [
    { label: 'Свадьбы', href: '/events/svadba' },
    { label: 'Корпоративы', href: '/events/korporativ' },
    { label: 'Частные события', href: '/events/chastnoe' },
    { label: 'Детские праздники', href: '/events/detskoe' },
    { label: 'Выпускные', href: '/events/vypusknoy' },
    { label: 'Выезд шефа', href: '/events/chef-at-home' },
  ]},
  { label: 'Меню', href: '/menu', children: [
    { label: 'Фуршет', href: '/menu/furshet' },
    { label: 'Банкет', href: '/menu/banquet' },
    { label: 'Кофе-брейк', href: '/menu/coffee-break' },
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
  { platform: 'whatsapp', url: 'https://wa.me/78121234567', label: 'WhatsApp' },
  { platform: 'rutube', url: 'https://rutube.ru/channel/nilovcatering', label: 'Rutube' },
];

export const FORMAT_NAMES: Record<Format, string> = {
  furshet: 'Фуршет',
  banket: 'Банкет',
  'coffee-break': 'Кофе-брейк',
  'mobile-furshet': 'Мобильный фуршет',
  detskoe: 'Детский праздник',
  'chef-at-home': 'Выезд шефа',
};

export const FORMAT_DESCRIPTIONS: Record<Format, string> = {
  furshet: 'Гости едят стоя, лёгкие закуски, можно свободно ходить',
  banket: 'Посадка за стол, официанты, классическая подача',
  'coffee-break': 'Кофе и десерты в перерыве мероприятия',
  'mobile-furshet': 'Выезд на площадку без кухни',
  detskoe: 'Специальное меню и развлечения для детей',
  'chef-at-home': 'Шеф-повар и сомелье у вас дома',
};

export const FORMAT_HERO_IMAGES: Record<Format, string> = {
  furshet: '/images/formats/furshet-hero.svg',
  banket: '/images/formats/banquet-hero.svg',
  'coffee-break': '/images/formats/coffee-break-hero.svg',
  'mobile-furshet': '/images/formats/mobile-furshet-hero.svg',
  detskoe: '/images/formats/detskoe-hero.svg',
  'chef-at-home': '/images/formats/chef-at-home-hero.svg',
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
