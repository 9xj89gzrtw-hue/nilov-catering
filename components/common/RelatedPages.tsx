import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * RelatedPages — умные связи между страницами (UX 2025-2026)
 *
 * Показывает логичные переходы в зависимости от контекста страницы.
 * Принципы:
 * - User Journey: ведём клиента к конверсии
 * - Recognition > Recall: показываем, что делать дальше
 * - Cognitive Load: max 4-6 ссылок (Hick's Law)
 *
 * Использование:
 * ```tsx
 * <RelatedPages context="event" slug="svadba" />
 * <RelatedPages context="menu" slug="banquet" />
 * <RelatedPages context="info" page="faq" />
 * ```
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
    { href: "/menu/banquet", label: "Банкетное меню", desc: "Полный цикл обслуживания", icon: "🍷" },
    { href: "/gallery", label: "Свадебное портфолио", desc: "Фото наших свадеб", icon: "📸" },
    { href: "/plan/helper", label: "Рассчитать стоимость", desc: "Ответ за 15 минут", icon: "🧮", cta: true },
    { href: "/venues", label: "Площадки для свадьбы", desc: "Проверенные залы СПб", icon: "🏛️" },
  ],
  korporativ: [
    { href: "/menu/furshet", label: "Фуршет", desc: "Для корпоративов от 20 чел", icon: "🥂" },
    { href: "/menu/coffee-break", label: "Кофе-брейк", desc: "Для конференций и встреч", icon: "☕" },
    { href: "/plan/helper", label: "Расчёт для компании", desc: "B2B: договор, ЭДО, счёт", icon: "🧮", cta: true },
    { href: "/certificates", label: "Документы для юрлиц", desc: "Роспотребнадзор, медкнижки", icon: "📋" },
  ],
  detskoe: [
    { href: "/menu/detskoe", label: "Детское меню", desc: "Бургеры, наггетсы, смузи", icon: "🍔" },
    { href: "/gallery", label: "Детские праздники", desc: "Фото с мероприятий", icon: "📸" },
    { href: "/plan/helper", label: "Рассчитать праздник", desc: "Аниматоры + меню под ключ", icon: "🧮", cta: true },
  ],
  chastnoe: [
    { href: "/menu/furshet", label: "Фуршет", desc: "Для домашних праздников", icon: "🥂" },
    { href: "/events/chef-at-home", label: "Шеф на дом", desc: "Ресторан у вас дома", icon: "🍽️" },
    { href: "/menu/banquet", label: "Банкет", desc: "Для юбилеев и торжеств", icon: "🍷" },
    { href: "/plan/helper", label: "Рассчитать", desc: "Индивидуальный подход", icon: "🧮", cta: true },
  ],
  "chef-at-home": [
    { href: "/menu/banquet", label: "Авторские меню", desc: "Премиум блюда от шефа", icon: "✨" },
    { href: "/team", label: "Наши шеф-повара", desc: "Дмитрий Нилов и команда", icon: "👨‍🍳" },
    { href: "/plan/calculator", label: "Калькулятор", desc: "От 4 500 ₽/гость", icon: "🧮", cta: true },
  ],
  vypusknoy: [
    { href: "/menu/furshet", label: "Фуршет на выпускной", desc: "Для школ и вузов", icon: "🎓" },
    { href: "/plan/helper", label: "Рассчитать выпускной", desc: "B2B: документы для Роспотребнадзора", icon: "🧮", cta: true },
  ],
  nikah: [
    { href: "/menu/halal", label: "Халяль меню", desc: "Сертифицированное", icon: "🕌" },
    { href: "/menu/banquet", label: "Банкет (никах)", desc: "Традиционное оформление", icon: "🍷" },
    { href: "/plan/helper", label: "Рассчитать никах", desc: "Мусульманские традиции", icon: "🧮", cta: true },
  ],
  yubiley: [
    { href: "/menu/banquet", label: "Юбилейный банкет", desc: "Посадка от 15 гостей", icon: "🍷" },
    { href: "/events/chastnoe", label: "Частные мероприятия", desc: "Дни рождения, семейные ужины", icon: "🎉" },
    { href: "/plan/helper", label: "Рассчитать юбилей", desc: "Торт и флористика включены", icon: "🧮", cta: true },
  ],
  pominki: [
    { href: "/menu/banquet?filter=pominki", label: "Меню поминок", desc: "Традиционные блюда", icon: "🕯️" },
    { href: "/faq#pominki", label: "FAQ: поминки", desc: "Частые вопросы", icon: "❓" },
    { href: "/contact", label: "Срочный заказ", desc: "Даже на день обращения", icon: "📞", cta: true },
  ],
};

// Страницы меню → какие события и опции показывать
const MENU_LINKS: Record<string, RelatedLink[]> = {
  banquet: [
    { href: "/events/svadba", label: "Свадьба", desc: "Самый популярный формат", icon: "💒" },
    { href: "/events/yubiley", label: "Юбилей", desc: "Торжественная подача", icon: "🎊" },
    { href: "/events/korporativ", label: "Корпоратив", desc: "Бизнес-мероприятия", icon: "🏢" },
    { href: "/plan/constructor", label: "Собрать банкет", desc: "Выбрать блюда поштучно", icon: "🛠️", cta: true },
  ],
  furshet: [
    { href: "/events/korporativ", label: "Корпоратив", desc: "Фуршеты для компаний", icon: "🏢" },
    { href: "/events/chastnoe", label: "День рождения", desc: "Домашние праздники", icon: "🎂" },
    { href: "/events/vypusknoy", label: "Выпускной", desc: "Для школ и вузов", icon: "🎓" },
    { href: "/plan/constructor", label: "Собрать фуршет", desc: "12+ закусок на выбор", icon: "🛠️", cta: true },
  ],
  "coffee-break": [
    { href: "/events/korporativ", label: "Конференция", desc: "Перерывы на мероприятиях", icon: "🏢" },
    { href: "/plan/calculator", label: "Быстрый расчёт", desc: "От 390 ₽/гость", icon: "🧮", cta: true },
    { href: "/delivery/order", label: "Доставка кофе-брейка", desc: "Привезём в офис", icon: "🚚" },
  ],
  detskoe: [
    { href: "/events/detskoe", label: "Детский праздник", desc: "Под ключ с аниматором", icon: "🎈" },
    { href: "/plan/helper", label: "Рассчитать праздник", desc: "Аниматоры + меню", icon: "🧮", cta: true },
  ],
  vegan: [
    { href: "/allergens", label: "Аллергены и диеты", desc: "Полная информация", icon: "🌱" },
    { href: "/menu/gluten-free", label: "Без глютена", desc: "Двойная диета", icon: "🌾" },
    { href: "/plan/constructor", label: "Собрать веган-меню", desc: "12+ блюд на выбор", icon: "🛠️", cta: true },
  ],
  "gluten-free": [
    { href: "/allergens#celiakia", label: "Протокол целиакии", desc: "Отдельная линия <20 ppm", icon: "🌾" },
    { href: "/menu/vegan", label: "Веган меню", desc: "Совместимая диета", icon: "🌱" },
    { href: "/contact", label: "Консультация", desc: "Индивидуальный протокол", icon: "📞", cta: true },
  ],
  halal: [
    { href: "/events/nikah", label: "Никах", desc: "Мусульманская свадьба", icon: "🕌" },
    { href: "/faq#halal", label: "FAQ: халяль", desc: "Сертификация", icon: "❓" },
    { href: "/plan/helper", label: "Рассчитать халяль", desc: "Сертификат муфтиев", icon: "🧮", cta: true },
  ],
  "show-cooking": [
    { href: "/events/chastnoe", label: "Частное мероприятие", desc: "Шоу как хайлайт", icon: "🎉" },
    { href: "/events/korporativ", label: "Корпоратив", desc: "Тимбилдинг с едой", icon: "🏢" },
    { href: "/team", label: "Шеф-повара", desc: "Кто готовит", icon: "👨‍🍳" },
    { href: "/contact", label: "Заказать шоу-кукинг", desc: "Эффектная подача", icon: "📞", cta: true },
  ],
  catalog: [
    { href: "/menu/banquet", label: "Банкетное меню", desc: "Готовые комплекты", icon: "🍷" },
    { href: "/menu/furshet", label: "Фуршет", desc: "Закуски и канапе", icon: "🥂" },
    { href: "/plan/constructor", label: "Конструктор меню", desc: "Собрать из каталога", icon: "🛠️", cta: true },
  ],
};

// Информационные страницы → связанные разделы
const INFO_LINKS: Record<string, RelatedLink[]> = {
  pricing: [
    { href: "/plan/helper", label: "Умный подбор", desc: "За 3 вопроса найдём формат", icon: "🧮", cta: true },
    { href: "/menu", label: "Все меню", desc: "Фуршет, банкет, кофе-брейк", icon: "🍽️" },
    { href: "/events", label: "Виды событий", desc: "9 форматов под ключ", icon: "🎉" },
    { href: "/faq", label: "FAQ", desc: "Ответы на частые вопросы", icon: "❓" },
  ],
  faq: [
    { href: "/contact", label: "Не нашли ответ?", desc: "Напишите нам — поможем", icon: "📞", cta: true },
    { href: "/allergens", label: "Аллергены и диеты", desc: "Протоколы для особых случаев", icon: "🌱" },
    { href: "/pricing", label: "Цены", desc: "Прозрачное ценообразование", icon: "💰" },
    { href: "/certificates", label: "Документы", desc: "Договор, NDA, SLA", icon: "📋" },
  ],
  delivery: [
    { href: "/menu/coffee-break", label: "Кофе-брейк в офис", desc: "Популярная доставка", icon: "☕" },
    { href: "/plan/calculator", label: "Рассчитать доставку", desc: "Укажите адрес — получим цену", icon: "🧮", cta: true },
    { href: "/contact", label: "Срочный заказ", desc: "Звоните — доставим сегодня", icon: "📞" },
  ],
  gallery: [
    { href: "/events/svadba", label: "Свадьбы", desc: "Фото торжеств", icon: "💒" },
    { href: "/events/korporativ", label: "Корпоративы", desc: "Бизнес-мероприятия", icon: "🏢" },
    { href: "/reviews", label: "Отзывы клиентов", desc: "Что говорят о нас", icon: "💬" },
    { href: "/contact", label: "Хотите так же?", desc: "Обсудим ваше событие", icon: "📞", cta: true },
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
    { href: "/contact", label: "Познакомиться ближе", desc: "Приезжайте на дегустацию", icon: "📞", cta: true },
  ],
  team: [
    { href: "/why-us", label: "Почему NiloV", desc: "Наши принципы", icon: "⭐" },
    { href: "/careers", label: "Вакансии", desc: "Присоединяйтесь к команде", icon: "🤝" },
  ],
  venues: [
    { href: "/events/svadba", label: "Свадьба на площадке", desc: "Поможем с выбором", icon: "💒" },
    { href: "/events/korporativ", label: "Корпоративная площадка", desc: "Конференц-залы", icon: "🏢" },
    { href: "/contact", label: "Нужна помощь с выбором?", desc: "Знаем лучшие площадки СПб", icon: "📞", cta: true },
  ],
  allergens: [
    { href: "/menu/vegan", label: "Веган меню", desc: "Без животных продуктов", icon: "🌱" },
    { href: "/menu/gluten-free", label: "Без глютена", desc: "Отдельная линия", icon: "🌾" },
    { href: "/menu/halal", label: "Халяль", desc: "Сертифицированное", icon: "🕌" },
    { href: "/tasting", label: "Дегустация", desc: "Обязательная для диет", icon: "🍴", cta: true },
  ],
  tasting: [
    { href: "/plan/helper", label: "Заказать с дегустацией", desc: "От 30 гостей — бесплатно", icon: "🧮", cta: true },
    { href: "/allergens", label: "Особые диеты", desc: "Протоколы для аллергиков", icon: "🌱" },
    { href: "/contact", label: "Вопросы?", desc: "Позвоните нам", icon: "📞" },
  ],
  certificates: [
    { href: "/faq#b2b", label: "FAQ для B2B", desc: "Договоры, ЭДО, НДС", icon: "🏢" },
    { href: "/contact", label: "Запрос документы", desc: "Пришлем полный пакет", icon: "📞", cta: true },
  ],
  seasonal: [
    { href: "/seasonal/new-year", label: "Новогодний банкет", desc: "Самый популярный сезон", icon: "🎄" },
    { href: "/seasonal/bbq", label: "Летний BBQ", desc: "Пикник на природе", icon: "🔥" },
    { href: "/plan/helper", label: "Рассчитать сезонное", desc: "Индивидуально под дату", icon: "🧮", cta: true },
  ],
  blog: [
    { href: "/why-us", label: "О компании", desc: "Кто мы и что умеем", icon: "⭐" },
    { href: "/team", label: "Команда", desc: "Наши эксперты", icon: "👨‍🍳" },
    { href: "/subscribe", label: "Подписка", desc: "Статьи и советы раз в неделю", icon: "📧" },
  ],
  contact: [
    { href: "/plan/helper", label: "Быстрый расчёт", desc: "Без звонка — онлайн", icon: "🧮", cta: true },
    { href: "/faq", label: "Вопросы?", desc: "Возможно ответ уже есть", icon: "❓" },
    { href: "/whatsapp", label: "WhatsApp", desc: "Быстрее чем звонок", icon: "💬" },
  ],
};

// Сезонные страницы
const SEASONAL_LINKS: Record<string, RelatedLink[]> = {
  "new-year": [
    { href: "/menu/banquet", label: "Новогодний банкет", desc: "Полный цикл обслуживания", icon: "🎄", cta: true },
    { href: "/events/svadba", label: "Свадьба зимой", desc: "Зимняя сказка", icon: "❄️" },
    { href: "/plan/helper", label: "Рассчёт НГ", desc: "Ранняя бронь = скидка 15%", icon: "🧮" },
  ],
  bbq: [
    { href: "/events/chastnoe", label: "Выезд на природу", desc: "Дни рождения, пикники", icon: "🌳" },
    { href: "/menu/furshet", label: "Фуршет + BBQ", desc: "Комбо для компании", icon: "🥂" },
    { href: "/plan/helper", label: "Рассчитать пикник", desc: "От 15 гостей", icon: "🧮", cta: true },
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
    <section className="border-line bg-secondary/30 mt-16 rounded-2xl border p-6 md:p-8" aria-labelledby={`related-${context}-${slug}`}>
      <h2 className="font-heading mb-6 text-xl font-medium md:text-2xl" id={`related-${context}-${slug}`}>
        {sectionTitle}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {displayLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`group flex items-start gap-3 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${
              link.cta
                ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90"
                : "bg-card border border-transparent hover:border-gold-text/30 hover:shadow-sm"
            }`}
          >
            {/* Иконка */}
            {link.icon && (
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${
                  link.cta ? "bg-white/20" : "bg-secondary/70"
                }`}
                aria-hidden="true"
              >
                {link.icon}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <div
                className={`flex items-center gap-2 ${
                  link.cta ? "text-white" : "text-foreground group-hover:text-gold-text"
                } text-sm font-medium transition-colors`}
              >
                {link.label}
                {link.cta && (
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              {link.desc && (
                <p
                  className={`mt-0.5 text-xs leading-snug ${
                    link.cta ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {link.desc}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
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
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
          : "bg-card border hover:border-gold-text hover:shadow-md"
      }`}
    >
      {icon && (
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${
            variant === "primary" ? "bg-white/20" : "bg-secondary"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="flex-1">
        <div className="font-heading text-lg font-medium">{label}</div>
        <p className={`mt-0.5 text-sm ${variant === "primary" ? "text-white/80" : "text-muted-foreground"}`}>
          {desc}
        </p>
      </div>
      <ArrowRight
        className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
          variant === "primary" ? "text-white" : "text-gold-text"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}
