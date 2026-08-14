"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";

/**
 * RelatedPages — Premium smart connections between pages
 *
 * Luxury redesign inspired by:
 * - Apple's product recommendation sections
 * - Hotel "You may also like" carousels
 * - Michelin-star restaurant websites
 *
 * Features:
 * - Glassmorphism cards with depth
 * - Subtle shimmer on hover
 * - Premium typography hierarchy
 * - Tactile, expensive feel
 * - Elegant icon containers
 */

export interface RelatedLink {
  href: string;
  label: string;
  desc?: string;
  icon?: string; // emoji для визуального сканирования
  cta?: boolean; // выделить как основной CTA
}

// === КАРТЫ СВЯЗЕЙ ===

// Страницы событий → какие меню и инфо показывать
const EVENT_LINKS: Record<string, RelatedLink[]> = {
  svadba: [
    {
      href: "/menu/banquet",
      label: "Банкетное меню",
      desc: "Полный цикл обслуживания",
      icon: "🍷",
    },
    { href: "/gallery", label: "Свадебное портфолио", desc: "Фото наших свадеб", icon: "📸" },
    {
      href: "/plan/helper",
      label: "Рассчитать стоимость",
      desc: "Ответ за 15 минут",
      icon: "🧮",
      cta: true,
    },
    { href: "/venues", label: "Площадки для свадьбы", desc: "Проверенные залы СПб", icon: "🏛️" },
  ],
  korporativ: [
    { href: "/menu/furshet", label: "Фуршет", desc: "Для корпоративов от 20 чел", icon: "🥂" },
    {
      href: "/menu/coffee-break",
      label: "Кофе-брейк",
      desc: "Для конференций и встреч",
      icon: "☕",
    },
    {
      href: "/plan/helper",
      label: "Расчёт для компании",
      desc: "B2B: договор, ЭДО, счёт",
      icon: "🧮",
      cta: true,
    },
    {
      href: "/certificates",
      label: "Документы для юрлиц",
      desc: "Роспотребнадзор, медкнижки",
      icon: "📋",
    },
  ],
  detskoe: [
    { href: "/menu/detskoe", label: "Детское меню", desc: "Бургеры, наггетсы, смузи", icon: "🍔" },
    { href: "/gallery", label: "Детские праздники", desc: "Фото с мероприятий", icon: "📸" },
    {
      href: "/plan/helper",
      label: "Рассчитать праздник",
      desc: "Аниматоры + меню под ключ",
      icon: "🧮",
      cta: true,
    },
  ],
  chastnoe: [
    { href: "/menu/furshet", label: "Фуршет", desc: "Для домашних праздников", icon: "🥂" },
    { href: "/events/chef-at-home", label: "Шеф на дом", desc: "Ресторан у вас дома", icon: "🍽️" },
    { href: "/menu/banquet", label: "Банкет", desc: "Для юбилеев и торжеств", icon: "🍷" },
    {
      href: "/plan/helper",
      label: "Рассчитать",
      desc: "Индивидуальный подход",
      icon: "🧮",
      cta: true,
    },
  ],
  "chef-at-home": [
    { href: "/menu/banquet", label: "Авторские меню", desc: "Премиум блюда от шефа", icon: "✨" },
    { href: "/team", label: "Наши шеф-повара", desc: "Дмитрий Нилов и команда", icon: "👨‍🍳" },
    {
      href: "/plan/calculator",
      label: "Калькулятор",
      desc: "От 4 500 ₽/гость",
      icon: "🧮",
      cta: true,
    },
  ],
  vypusknoy: [
    { href: "/menu/furshet", label: "Фуршет на выпускной", desc: "Для школ и вузов", icon: "🎓" },
    {
      href: "/plan/helper",
      label: "Рассчитать выпускной",
      desc: "B2B: документы для Роспотребнадзора",
      icon: "🧮",
      cta: true,
    },
  ],
  nikah: [
    { href: "/menu/halal", label: "Халяль меню", desc: "Сертифицированное", icon: "🕌" },
    { href: "/menu/banquet", label: "Банкет (никах)", desc: "Традиционное оформление", icon: "🍷" },
    {
      href: "/plan/helper",
      label: "Рассчитать никах",
      desc: "Мусульманские традиции",
      icon: "🧮",
      cta: true,
    },
  ],
  yubiley: [
    { href: "/menu/banquet", label: "Юбилейный банкет", desc: "Посадка от 15 гостей", icon: "🍷" },
    {
      href: "/events/chastnoe",
      label: "Частные мероприятия",
      desc: "Дни рождения, семейные ужины",
      icon: "🎉",
    },
    {
      href: "/plan/helper",
      label: "Рассчитать юбилей",
      desc: "Торт и флористика включены",
      icon: "🧮",
      cta: true,
    },
  ],
  pominki: [
    {
      href: "/menu/banquet?filter=pominki",
      label: "Меню поминок",
      desc: "Традиционные блюда",
      icon: "🕯️",
    },
    { href: "/faq#pominki", label: "FAQ: поминки", desc: "Частые вопросы", icon: "❓" },
    {
      href: "/contact",
      label: "Срочный заказ",
      desc: "Даже на день обращения",
      icon: "📞",
      cta: true,
    },
  ],
};

// Страницы меню → какие события и опции показывать
const MENU_LINKS: Record<string, RelatedLink[]> = {
  banquet: [
    { href: "/events/svadba", label: "Свадьба", desc: "Самый популярный формат", icon: "💒" },
    { href: "/events/yubiley", label: "Юбилей", desc: "Торжественная подача", icon: "🎊" },
    { href: "/events/korporativ", label: "Корпоратив", desc: "Бизнес-мероприятия", icon: "🏢" },
    {
      href: "/plan/constructor",
      label: "Собрать банкет",
      desc: "Выбрать блюда поштучно",
      icon: "🛠️",
      cta: true,
    },
  ],
  furshet: [
    { href: "/events/korporativ", label: "Корпоратив", desc: "Фуршеты для компаний", icon: "🏢" },
    { href: "/events/chastnoe", label: "День рождения", desc: "Домашние праздники", icon: "🎂" },
    { href: "/events/vypusknoy", label: "Выпускной", desc: "Для школ и вузов", icon: "🎓" },
    {
      href: "/plan/constructor",
      label: "Собрать фуршет",
      desc: "12+ закусок на выбор",
      icon: "🛠️",
      cta: true,
    },
  ],
  "coffee-break": [
    {
      href: "/events/korporativ",
      label: "Конференция",
      desc: "Перерывы на мероприятиях",
      icon: "🏢",
    },
    {
      href: "/plan/calculator",
      label: "Быстрый расчёт",
      desc: "От 390 ₽/гость",
      icon: "🧮",
      cta: true,
    },
    { href: "/delivery/order", label: "Доставка кофе-брейка", desc: "Привезём в офис", icon: "🚚" },
  ],
  detskoe: [
    {
      href: "/events/detskoe",
      label: "Детский праздник",
      desc: "Под ключ с аниматором",
      icon: "🎈",
    },
    {
      href: "/plan/helper",
      label: "Рассчитать праздник",
      desc: "Аниматоры + меню",
      icon: "🧮",
      cta: true,
    },
  ],
  vegan: [
    { href: "/allergens", label: "Аллергены и диеты", desc: "Полная информация", icon: "🌱" },
    { href: "/menu/gluten-free", label: "Без глютена", desc: "Двойная диета", icon: "🌾" },
    {
      href: "/plan/constructor",
      label: "Собрать веган-меню",
      desc: "12+ блюд на выбор",
      icon: "🛠️",
      cta: true,
    },
  ],
  "gluten-free": [
    {
      href: "/allergens#celiakia",
      label: "Протокол целиакии",
      desc: "Отдельная линия <20 ppm",
      icon: "🌾",
    },
    { href: "/menu/vegan", label: "Веган меню", desc: "Совместимая диета", icon: "🌱" },
    {
      href: "/contact",
      label: "Консультация",
      desc: "Индивидуальный протокол",
      icon: "📞",
      cta: true,
    },
  ],
  halal: [
    { href: "/events/nikah", label: "Никах", desc: "Мусульманская свадьба", icon: "🕌" },
    { href: "/faq#halal", label: "FAQ: халяль", desc: "Сертификация", icon: "❓" },
    {
      href: "/plan/helper",
      label: "Рассчитать халяль",
      desc: "Сертификат муфтиев",
      icon: "🧮",
      cta: true,
    },
  ],
  "show-cooking": [
    { href: "/events/chastnoe", label: "Частное мероприятие", desc: "Шоу как хайлайт", icon: "🎉" },
    { href: "/events/korporativ", label: "Корпоратив", desc: "Тимбилдинг с едой", icon: "🏢" },
    { href: "/team", label: "Шеф-повара", desc: "Кто готовит", icon: "👨‍🍳" },
    {
      href: "/contact",
      label: "Заказать шоу-кукинг",
      desc: "Эффектная подача",
      icon: "📞",
      cta: true,
    },
  ],
  catalog: [
    { href: "/menu/banquet", label: "Банкетное меню", desc: "Готовые комплекты", icon: "🍷" },
    { href: "/menu/furshet", label: "Фуршет", desc: "Закуски и канапе", icon: "🥂" },
    {
      href: "/plan/constructor",
      label: "Конструктор меню",
      desc: "Собрать из каталога",
      icon: "🛠️",
      cta: true,
    },
  ],
};

// Информационные страницы → связанные разделы
const INFO_LINKS: Record<string, RelatedLink[]> = {
  pricing: [
    {
      href: "/plan/helper",
      label: "Умный подбор",
      desc: "За 3 вопроса найдём формат",
      icon: "🧮",
      cta: true,
    },
    { href: "/menu", label: "Все меню", desc: "Фуршет, банкет, кофе-брейк", icon: "🍽️" },
    { href: "/events", label: "Виды событий", desc: "9 форматов под ключ", icon: "🎉" },
    { href: "/faq", label: "FAQ", desc: "Ответы на частые вопросы", icon: "❓" },
  ],
  faq: [
    {
      href: "/contact",
      label: "Не нашли ответ?",
      desc: "Напишите нам — поможем",
      icon: "📞",
      cta: true,
    },
    {
      href: "/allergens",
      label: "Аллергены и диеты",
      desc: "Протоколы для особых случаев",
      icon: "🌱",
    },
    { href: "/pricing", label: "Цены", desc: "Прозрачное ценообразование", icon: "💰" },
    { href: "/certificates", label: "Документы", desc: "Договор, NDA, SLA", icon: "📋" },
  ],
  delivery: [
    {
      href: "/menu/coffee-break",
      label: "Кофе-брейк в офис",
      desc: "Популярная доставка",
      icon: "☕",
    },
    {
      href: "/plan/calculator",
      label: "Рассчитать доставку",
      desc: "Укажите адрес — получим цену",
      icon: "🧮",
      cta: true,
    },
    { href: "/contact", label: "Срочный заказ", desc: "Звоните — доставим сегодня", icon: "📞" },
  ],
  gallery: [
    { href: "/events/svadba", label: "Свадьбы", desc: "Фото торжеств", icon: "💒" },
    { href: "/events/korporativ", label: "Корпоративы", desc: "Бизнес-мероприятия", icon: "🏢" },
    { href: "/reviews", label: "Отзывы клиентов", desc: "Что говорят о нас", icon: "💬" },
    {
      href: "/contact",
      label: "Хотите так же?",
      desc: "Обсудим ваше событие",
      icon: "📞",
      cta: true,
    },
  ],
  reviews: [
    { href: "/gallery", label: "Фото событий", desc: "Увидьте результат", icon: "📸" },
    { href: "/why-us", label: "Почему мы", desc: "17 лет опыта · 5000+ событий", icon: "⭐" },
    { href: "/contact", label: "Стать следующим", desc: "Оставить заявку", icon: "📞", cta: true },
  ],
  "why-us": [
    { href: "/team", label: "Команда", desc: "Наши шефы и менеджеры", icon: "👥" },
    { href: "/reviews", label: "Отзывы", desc: "200+ реальных отзывов", icon: "💬" },
    { href: "/gallery", label: "Портфель", desc: "Фото наших работ", icon: "📸" },
    {
      href: "/contact",
      label: "Познакомиться ближе",
      desc: "Приезжайте на дегустацию",
      icon: "📞",
      cta: true,
    },
  ],
  team: [
    { href: "/why-us", label: "Почему NiloV", desc: "Наши принципы", icon: "⭐" },
    { href: "/careers", label: "Вакансии", desc: "Присоединяйтесь к команде", icon: "🤝" },
  ],
  venues: [
    { href: "/events/svadba", label: "Свадьба на площадке", desc: "Поможем с выбором", icon: "💒" },
    {
      href: "/events/korporativ",
      label: "Корпоративная площадка",
      desc: "Конференц-залы",
      icon: "🏢",
    },
    {
      href: "/contact",
      label: "Нужна помощь с выбором?",
      desc: "Знаем лучшие площадки СПб",
      icon: "📞",
      cta: true,
    },
  ],
  allergens: [
    { href: "/menu/vegan", label: "Веган меню", desc: "Без животных продуктов", icon: "🌱" },
    { href: "/menu/gluten-free", label: "Без глютена", desc: "Отдельная линия", icon: "🌾" },
    { href: "/menu/halal", label: "Халяль", desc: "Сертифицированное", icon: "🕌" },
    { href: "/tasting", label: "Дегустация", desc: "Обязательная для диет", icon: "🍴", cta: true },
  ],
  tasting: [
    {
      href: "/plan/helper",
      label: "Заказать с дегустацией",
      desc: "От 30 гостей — бесплатно",
      icon: "🧮",
      cta: true,
    },
    { href: "/allergens", label: "Особые диеты", desc: "Протоколы для аллергиков", icon: "🌱" },
    { href: "/contact", label: "Вопросы?", desc: "Позвоните нам", icon: "📞" },
  ],
  certificates: [
    { href: "/faq#b2b", label: "FAQ для B2B", desc: "Договоры, ЭДО, НДС", icon: "🏢" },
    {
      href: "/contact",
      label: "Запрос документы",
      desc: "Пришлем полный пакет",
      icon: "📞",
      cta: true,
    },
  ],
  seasonal: [
    {
      href: "/seasonal/new-year",
      label: "Новогодний банкет",
      desc: "Самый популярный сезон",
      icon: "🎄",
    },
    { href: "/seasonal/bbq", label: "Летний BBQ", desc: "Пикник на природе", icon: "🔥" },
    {
      href: "/plan/helper",
      label: "Рассчитать сезонное",
      desc: "Индивидуально под дату",
      icon: "🧮",
      cta: true,
    },
  ],
  blog: [
    { href: "/why-us", label: "О компании", desc: "Кто мы и что умеем", icon: "⭐" },
    { href: "/team", label: "Команда", desc: "Наши эксперты", icon: "👨‍🍳" },
    { href: "/subscribe", label: "Подписка", desc: "Статьи и советы раз в неделю", icon: "📧" },
  ],
  contact: [
    {
      href: "/plan/helper",
      label: "Быстрый расчёт",
      desc: "Без звонка — онлайн",
      icon: "🧮",
      cta: true,
    },
    { href: "/faq", label: "Вопросы?", desc: "Возможно ответ уже есть", icon: "❓" },
    { href: "/whatsapp", label: "WhatsApp", desc: "Быстрее чем звонок", icon: "💬" },
  ],
};

// Сезонные страницы
const SEASONAL_LINKS: Record<string, RelatedLink[]> = {
  "new-year": [
    {
      href: "/menu/banquet",
      label: "Новогодний банкет",
      desc: "Полный цикл обслуживания",
      icon: "🎄",
      cta: true,
    },
    { href: "/events/svadba", label: "Свадьба зимой", desc: "Зимняя сказка", icon: "❄️" },
    { href: "/plan/helper", label: "Рассчёт НГ", desc: "Ранняя бронь = скидка 15%", icon: "🧮" },
  ],
  bbq: [
    {
      href: "/events/chastnoe",
      label: "Выезд на природу",
      desc: "Дни рождения, пикники",
      icon: "🌳",
    },
    { href: "/menu/furshet", label: "Фуршет + BBQ", desc: "Комбо для компании", icon: "🥂" },
    {
      href: "/plan/helper",
      label: "Рассчитать пикник",
      desc: "От 15 гостей",
      icon: "🧮",
      cta: true,
    },
  ],
  maslenitsa: [
    { href: "/events/chastnoe", label: "Корпоративная масленица", desc: "Для команд", icon: "🥞" },
    { href: "/plan/helper", label: "Заказать", desc: "Блины на заказ", icon: "🧮", cta: true },
  ],
};

interface RelatedPagesProps {
  /** Контекст: event, menu, info, seasonal */
  context: "event" | "menu" | "info" | "seasonal";
  /** Slug страницы (svadba, banquet, faq, etc.) */
  slug: string;
  /** Заголовок секции (опционально) */
  title?: string;
  /** Максимальное число ссылок (по умолчанию 4) */
  maxLinks?: number;
}

function PremiumCard({ link }: { link: RelatedLink }) {
  const [isHovered, setIsHovered] = useState(false);

  if (link.cta) {
    return (
      <Link
        href={link.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6e5530] via-[#7a5f36] to-[#8B6914] p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(110,85,48,0.5)]"
        aria-label={`${link.label}${link.desc ? ` — ${link.desc}` : ""}`}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            animation: isHovered ? "shimmer 1.5s ease-in-out infinite" : "none",
          }}
        />

        <div className="relative flex h-full items-center gap-4 rounded-2xl bg-gradient-to-br from-[#6e5530] to-[#5a4528] px-6 py-5">
          {/* Icon container */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 shadow-inner backdrop-blur-sm">
            <span className="text-2xl">{link.icon}</span>
            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-md">
              <Sparkles className="h-3 w-3 text-[#6e5530]" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-base font-semibold tracking-tight text-white">
              {link.label}
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1 opacity-100" : "opacity-70"}`}
              />
            </div>
            {link.desc && (
              <p className="mt-1 text-sm leading-relaxed font-light text-white/75">{link.desc}</p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={link.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-sm transition-all duration-500 ${
        isHovered
          ? "-translate-y-1 border-[#c9a961]/50 shadow-[0_16px_48px_-12px_rgba(110,85,48,0.25)]"
          : "border-[#e4dccf]/60 shadow-sm"
      }`}
      aria-label={`${link.label}${link.desc ? ` — ${link.desc}` : ""}`}
    >
      {/* Shimmer effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a961]/5 to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          animation: isHovered ? "shimmer 2s ease-in-out infinite" : "none",
        }}
      />

      <div className="relative flex items-start gap-4 p-5">
        {/* Premium icon container */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
            isHovered
              ? "scale-105 bg-gradient-to-br from-[#efe6d6] to-[#f2ece3] shadow-md"
              : "bg-[#f2ece3]/80"
          }`}
        >
          <span className="text-xl transition-transform duration-300 group-hover:scale-110">
            {link.icon}
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div
            className={`flex items-center gap-2 text-[15px] font-medium tracking-tight transition-colors duration-300 ${
              isHovered ? "text-[#6e5530]" : "text-[#1c1815]"
            }`}
          >
            {link.label}
            <ArrowUpRight
              className={`-ml-1 h-3.5 w-3.5 opacity-0 transition-all duration-300 ${
                isHovered ? "translate-x-0 opacity-100" : "-translate-x-1"
              }`}
            />
          </div>
          {link.desc && (
            <p className="mt-1 text-[13px] leading-relaxed font-normal text-[#4a423b]/80">
              {link.desc}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

export default function RelatedPages({ context, slug, title, maxLinks = 4 }: RelatedPagesProps) {
  // Получаем ссылки для контекста
  const linksMap =
    context === "event"
      ? EVENT_LINKS
      : context === "menu"
        ? MENU_LINKS
        : context === "seasonal"
          ? SEASONAL_LINKS
          : INFO_LINKS;

  const links = linksMap[slug];

  // Если нет связей — не рендерим
  if (!links || links.length === 0) return null;

  // Ограничиваем количество
  const displayLinks = links.slice(0, maxLinks);

  // Определяем заголовок по контексту
  const defaultTitle =
    context === "event"
      ? "Также интересно"
      : context === "menu"
        ? "Подходит для событий"
        : "Полезные ссылки";

  const sectionTitle = title || defaultTitle;

  return (
    <section
      className="relative mt-20 overflow-hidden"
      aria-labelledby={`related-${context}-${slug}`}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-bl from-[#efe6d6]/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-tr from-[#f2ece3]/60 to-transparent blur-3xl" />
      </div>

      <div className="relative">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#c9a961] uppercase">
              NiloV Catering
            </p>
            <h2
              className="font-heading text-2xl font-bold tracking-tight text-[#1c1815] md:text-3xl"
              id={`related-${context}-${slug}`}
            >
              {sectionTitle}
            </h2>
          </div>
          <div className="hidden items-center gap-1 text-sm text-[#4a423b]/60 sm:flex">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a961]/50" />
            <span className="text-xs tracking-wider uppercase">Избранное</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {displayLinks.map((link) => (
            <PremiumCard key={link.href} link={link} />
          ))}
        </div>
      </div>

      {/* Global shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

/**
 * NextStep — компонент для одного CTA "следующий шаг"
 * Используется внизу страниц для указания явного следующего действия
 */
interface NextStepProps {
  href: string;
  label: string;
  desc: string;
  icon?: string;
  variant?: "primary" | "secondary";
}

export function NextStep({ href, label, desc, icon, variant = "primary" }: NextStepProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "primary") {
    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6e5530] via-[#7a5f36] to-[#8B6914] p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_72px_-12px_rgba(110,85,48,0.45)]"
      >
        <div className="relative flex items-center gap-5 rounded-2xl bg-gradient-to-br from-[#6e5530] to-[#5a4528] px-7 py-6">
          {icon && (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-sm">
              <span className="text-3xl">{icon}</span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
              {label}
              <ArrowRight
                className={`h-5 w-5 transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`}
              />
            </div>
            <p className="mt-1 text-sm leading-relaxed font-light text-white/75">{desc}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border bg-white px-7 py-6 backdrop-blur-sm transition-all duration-500 ${
        isHovered
          ? "-translate-y-1 border-[#c9a961]/50 shadow-[0_16px_48px_-12px_rgba(110,85,48,0.2)]"
          : "border-[#e4dccf]/60 shadow-sm"
      }`}
    >
      {icon && (
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
            isHovered ? "scale-105 bg-[#efe6d6] shadow-md" : "bg-[#f2ece3]"
          }`}
        >
          <span className="text-3xl">{icon}</span>
        </div>
      )}
      <div className="flex-1">
        <div
          className={`flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors duration-300 ${
            isHovered ? "text-[#6e5530]" : "text-[#1c1815]"
          }`}
        >
          {label}
          <ArrowRight
            className={`h-5 w-5 text-[#c9a961] transition-all duration-300 ${isHovered ? "translate-x-2 opacity-100" : "opacity-60"}`}
          />
        </div>
        <p className="mt-1 text-sm leading-relaxed font-normal text-[#4a423b]/80">{desc}</p>
      </div>
    </Link>
  );
}
