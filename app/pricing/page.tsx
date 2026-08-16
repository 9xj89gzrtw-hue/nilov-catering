import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  Check,
  ArrowRight,
  Calculator,
  Users,
  Star,
  Clock,
  UserCheck,
  Award,
  Building2,
  ChefHat,
  Flame,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { SITE } from "@/lib/data";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";

export const metadata: Metadata = {
  title: "Цены на кейтеринг в СПб — от 390 ₽/гость | 11 тарифов",
  description:
    "Прозрачные цены: фуршет от 2 450 ₽, банкет от 3 950 ₽, кофе-брейк от 390 ₽ за гостя. 11 тарифов: Эконом, Стандарт, Премиум, Люкс. Всё включено.",
  alternates: { canonical: "/pricing", languages: { ru: "/pricing", "x-default": "/pricing" } },
};

export const dynamic = "force-static";

// === БАЗОВЫЙ ИНТЕРФЕЙС ТАРИФА ===
interface BaseTariff {
  name: string;
  price: number;
  minGuests: number;
  output: string;
  desc: string;
  drinks?: string;
  features: string[];
  popular: boolean;
  // Optional fields for different formats
  cold?: string;
  hot?: string;
  courses?: string;
  dishes?: string;
  duration?: string;
  menu?: string;
}

// === ФУРШЕТ — 4 ТАРИФА ===
const FURSHET_TARIFFS = [
  {
    name: "Эконом",
    price: 2450,
    minGuests: 20,
    output: "~355 г еды + 250 мл напитков",
    desc: "Бюджетный фуршет для корпоративов и дней рождений",
    cold: "5 закусок (канапе, тарталетки, брускетта)",
    hot: "3 горячих (мини-бургер, якитори, овощи гриль)",
    drinks: "Морс, лимонад, чай, кофе",
    features: [
      "Стандартное оформление",
      "Официант 1/15",
      "Фуршетная сервировка",
      "Доставка по КАД",
    ],
    popular: false,
  },
  {
    name: "Стандарт",
    price: 3450,
    minGuests: 20,
    output: "~520 г еды + 250 мл напитков",
    desc: "Оптимальный выбор для большинства мероприятий",
    cold: "7 закусок + салат Цезарь",
    hot: "4 горячих + брауни",
    drinks: "Морс, лимонад, чай, кофе, вода",
    features: ["Стильное оформление", "Официант 1/12", "Десерт включён", "Минеральная вода"],
    popular: true,
  },
  {
    name: "Премиум",
    price: 4350,
    minGuests: 20,
    output: "~770 г еды + 300 мл напитков",
    desc: "Для стильных мероприятий, свадеб и юбилеев",
    cold: "9 закусок + 2 салата",
    hot: "5 горячих (вкл. шашлык, рыба гриль)",
    drinks: "Авторский лимонад, морс, чай, кофе, вода, сок",
    features: ["Премиальное оформление", "Ярусная подача", "2 десерта", "Официант 1/10"],
    popular: false,
  },
  {
    name: "Люкс",
    price: 5350,
    minGuests: 25,
    output: "~1230 г еды + 400 мл напитков",
    desc: "VIP-мероприятия: авторская подача, шеф на площадке",
    cold: "12 закусок + мясное плато + сырная тарелка",
    hot: "7 горячих (стейк Рибай, сибас, кокот)",
    drinks: "Лимонад, морс, чай, кофе, вода, свежевыжатый сок",
    features: ["Люкс-оформление", "Шеф-повар на площадке", "Show-cooking станция", "3 десерта"],
    popular: false,
  },
];

// === БАНКЕТ — 3 ТАРИФА ===
const BANQUET_TARIFFS = [
  {
    name: "Классик",
    price: 4470,
    minGuests: 15,
    output: "~700 г еды + 300 мл напитков + суп 250 мл",
    desc: "Классический посидельный банкет",
    courses: "Суп → Закуски → Горячее → Гарнир → Десерт",
    dishes: "Окрошка/борщ, мясное плато, Цезарь, бефстроганов, торт Наполеон",
    drinks: "Чай, кофе, морс, минеральная вода",
    features: ["Официант 1/10", "Банкетная сервировка", "Торт включён", "Координатор"],
    popular: false,
  },
  {
    name: "Премиум",
    price: 5970,
    minGuests: 15,
    output: "~1020 г еды + 300 мл напитков + супы 500 мл",
    desc: "Праздничный банкет с выбором и show-cooking",
    courses: "2 супа → 3 закуски → 2 горячих → 2 гарнира → 2 десерта",
    dishes: "Холодный борщ, сырная тарелка, форель, брискет, тирамису",
    drinks: "Авторский лимонад, чай, кофе, морс, вода",
    features: ["Координатор", "Бармен", "Show-cooking опция", "2 десерта"],
    popular: true,
  },
  {
    name: "VIP",
    price: 6970,
    minGuests: 20,
    output: "~1670 г еды + 400 мл напитков + суп 250 мл",
    desc: "Роскошный банкет для особых случаев",
    courses: "Суп → 4 закуски → 3 горячих → 3 гарнира → 3 десерта",
    dishes: "Крем-суп из белых грибов, медальоны, сибас, фондан, чизкейк",
    drinks: "Лимонады, морсы, соки, чай, кофе, вода",
    features: ["Шеф-повар на площадке", "Бармен-шоу", "Show-cooking включён", "3 десерта"],
    popular: false,
  },
];

// === КОФЕ-БРЕЙК — 4 ТАРИФА ===
const COFFEE_BREAK_TARIFFS = [
  {
    name: "Лёгкий",
    price: 950,
    minGuests: 10,
    duration: "30 мин",
    output: "~120 г выпечки + напитки",
    desc: "Краткий перерыв для совещаний и тренингов",
    menu: "Кофе/чай, 2 вида выпечки (круассан, маффин)",
    features: ["Быстрая подача", "Компактная зона", "Одноразовая посуда", "Уборка включена"],
    popular: false,
  },
  {
    name: "Стандарт",
    price: 1450,
    minGuests: 10,
    duration: "45 мин",
    output: "~180 г + напитки",
    desc: "Классический кофе-брейк для конференций",
    menu: "Кофе/чай, 3 вида выпечки, канапе с лососем",
    features: ["Стильная подача", "Фарфоровая посуда", "1 вид канапе", "Официант"],
    popular: true,
  },
  {
    name: "Премиум",
    price: 1950,
    minGuests: 10,
    duration: "60 мин",
    output: "~300 г + напитки",
    desc: "Расширенный перерыв для важных встреч",
    menu: "Кофе/чай, 4 вида выпечки, 2 канапе, фрукты",
    features: ["Премиум выпечка", "Фруктовая тарелка", "2 вида канапе", "Официант 1/20"],
    popular: false,
  },
  {
    name: "Люкс",
    price: 2450,
    minGuests: 10,
    duration: "90 мин",
    output: "~400 г + напитки",
    desc: "Премиальный кофе-брейк для VIP-мероприятий",
    menu: "Кофе/чай, 5 видов выпечки, 3 канапе, фрукты, макаронс",
    features: [
      "Авторская выпечка",
      "Канапе с икрой/креветкой",
      "Макаронс ассорти",
      "Официант 1/15",
    ],
    popular: false,
  },
];

// === Примеры реальных счетов ===
const EXAMPLES = [
  { event: "Свадьба 50 чел", format: "Банкет Премиум", perGuest: 5970, guests: 50, total: 298500 },
  {
    event: "Корпоратив 30 чел",
    format: "Фуршет Стандарт",
    perGuest: 3450,
    guests: 30,
    total: 103500,
  },
  {
    event: "Конференция 40 чел",
    format: "Кофе-брейк Стандарт",
    perGuest: 1450,
    guests: 40,
    total: 58000,
  },
  { event: "Юбилей 25 чел", format: "Фуршет Премиум", perGuest: 4350, guests: 25, total: 108750 },
  {
    event: "День рождения 15 чел",
    format: "Банкет Классик",
    perGuest: 4470,
    guests: 15,
    total: 67050,
  },
];

// === Компонент карточки тарифа ===
function TariffCard({
  tariff,
  type,
}: {
  tariff: BaseTariff;
  type: "furshet" | "banquet" | "coffee";
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-lg ${
        tariff.popular
          ? "border-gold-text shadow-gold/20 shadow-xl"
          : "border-line hover:border-gold-text/50"
      } bg-card`}
    >
      {tariff.popular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-gold-text flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white">
            <Star className="h-3 w-3" fill="currentColor" /> Популярно
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Заголовок и цена */}
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-xl font-semibold">{tariff.name}</h3>
            <p className="text-muted-foreground mt-1 text-xs">{tariff.desc}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-gold-text text-2xl font-bold">
              {tariff.price.toLocaleString("ru-RU")}
            </div>
            <p className="text-muted-foreground text-xs">₽/гость</p>
          </div>
        </div>

        {/* Мета-информация */}
        <div className="border-line text-muted-foreground mb-4 flex flex-wrap gap-x-4 gap-y-1 border-b pb-3 text-xs">
          <span className="flex items-center gap-1">
            <UserCheck className="h-3.5 w-3.5" /> от {tariff.minGuests} гостей
          </span>
          {"duration" in tariff && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {tariff.duration}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {tariff.output}
          </span>
        </div>

        {/* Состав тарифа */}
        {type === "furshet" && (
          <div className="mb-4 space-y-2 text-sm">
            <p>
              <strong>Холодные:</strong> {tariff.cold}
            </p>
            <p>
              <strong>Горячие:</strong> {tariff.hot}
            </p>
            <p>
              <strong>Напитки:</strong> {tariff.drinks}
            </p>
          </div>
        )}
        {type === "banquet" && (
          <div className="mb-4 space-y-2 text-sm">
            <p>
              <strong>Меню:</strong> {tariff.courses}
            </p>
            <p>
              <strong>Блюда:</strong> {tariff.dishes}
            </p>
            <p>
              <strong>Напитки:</strong> {tariff.drinks}
            </p>
          </div>
        )}
        {type === "coffee" && (
          <div className="mb-4 text-sm">
            <p>
              <strong>В меню:</strong> {tariff.menu}
            </p>
          </div>
        )}

        {/* Что входит */}
        <ul className="mb-4 space-y-1.5">
          {tariff.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs">
              <Check className="text-gold-text h-3.5 w-3.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={
            type === "furshet"
              ? "/menu/furshet"
              : type === "banquet"
                ? "/menu/banquet"
                : "/menu/coffee-break"
          }
          className={`inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            tariff.popular
              ? "bg-gold-text hover:bg-gold-text/90 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          Выбрать {type === "coffee" ? "кофе-брейк" : type === "furshet" ? "фуршет" : "банкет"}{" "}
          {tariff.name}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// === Секция тарифов ===
function TariffSection({
  title,
  subtitle,
  tariffs,
  type,
  href,
}: {
  title: string;
  subtitle: string;
  tariffs: BaseTariff[];
  type: "furshet" | "banquet" | "coffee";
  href: string;
}) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>
        <Link href={href} className="text-gold-text shrink-0 text-sm font-semibold hover:underline">
          Все меню →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tariffs.map((tariff) => (
          <TariffCard key={tariff.name} tariff={tariff} type={type} />
        ))}
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-7xl">
        <Breadcrumbs />

        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="bg-gold-tint/20 text-gold-text mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Star className="h-4 w-4" />
            11 тарифов · 3 формата · Всё включено
          </div>

          <h1
            className="font-heading mb-4 text-4xl font-medium md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Цены на кейтеринг
          </h1>
          <p className="text-muted-foreground mx-auto mb-4 max-w-3xl text-lg md:text-xl">
            Фуршет от <strong className="text-foreground">2 450 ₽</strong> · Банкет от{" "}
            <strong className="text-foreground">4 470 ₽</strong> · Кофе-брейк от{" "}
            <strong className="text-foreground">950 ₽</strong> за гостя.
            <br />
            Еда, персонал, посуда, доставка — всё включено.
          </p>

          {/* Trust badges */}
          <p className="text-muted-foreground mb-6 text-sm">
            ⏱ Бронь за 48–72 часа · 📞 Перезвоним за 15 минут · ✅ Без скрытых платежей · 📋 Договор
            за 5 минут
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/plan/helper"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Рассчитать стоимость
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
            >
              {SITE.phone}
            </a>
          </div>

          {/* Документы */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <a
              href="/api/templates/dogovor"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              📄 Договор
            </a>
            <a
              href="/api/templates/nda"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              🔒 NDA
            </a>
            <a
              href="/api/templates/sla"
              download
              className="text-muted-foreground hover:text-gold-text underline"
            >
              ✅ SLA
            </a>
          </div>
        </div>

        {/* === TRUST SIGNALS — якорь-обоснование премиум-цен === */}
        <div className="from-gold-tint/10 border-gold-tint/30 mb-16 rounded-2xl border bg-gradient-to-br to-transparent p-6 md:p-8">
          <h2 className="font-heading mb-4 text-center text-xl font-bold md:text-2xl">
            Почему мы стоим дороже — и почему это оправдано
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-center text-sm">
            Наши цены выше среднего по рынку СПб. Вот что вы получаете за эту разницу:
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-card rounded-xl p-4 text-center">
              <div className="bg-gold-tint/30 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
                <Award className="text-gold-text h-7 w-7" />
              </div>
              <div className="text-gold-text text-2xl font-bold">19 лет</div>
              <p className="text-muted-foreground mt-1 text-xs">на рынке кейтеринга</p>
            </div>

            <div className="bg-card rounded-xl p-4 text-center">
              <div className="bg-gold-tint/30 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
                <Users className="text-gold-text h-7 w-7" />
              </div>
              <div className="text-gold-text text-2xl font-bold">3000+</div>
              <p className="text-muted-foreground mt-1 text-xs">проведённых мероприятий</p>
            </div>

            <div className="bg-card rounded-xl p-4 text-center">
              <div className="bg-gold-tint/30 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
                <Building2 className="text-gold-text h-7 w-7" />
              </div>
              <div className="text-gold-text text-sm leading-tight font-bold">
                Эрмитаж
                <br />
                Мариинский
              </div>
              <p className="text-muted-foreground mt-1 text-xs">официальный партнёр</p>
            </div>

            <div className="bg-card rounded-xl p-4 text-center">
              <div className="bg-gold-tint/30 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
                <Flame className="text-gold-text h-7 w-7" />
              </div>
              <div className="text-gold-text text-sm leading-tight font-bold">
                Sous-Vide
                <br />
                63°C
              </div>
              <p className="text-muted-foreground mt-1 text-xs">технологии мишлен</p>
            </div>
          </div>

          {/* Дополнительные доказательства */}
          <div className="border-line mt-6 grid grid-cols-1 gap-3 border-t pt-5 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <ChefHat className="text-gold-text mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-medium">Шефы с опытом 15+ лет</p>
                <p className="text-muted-foreground text-xs">Ученики ведущих шефов России</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="text-gold-text mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-medium">98% клиентов возвращаются</p>
                <p className="text-muted-foreground text-xs">По результатам опроса 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-gold-text mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-medium">Гарантия качества</p>
                <p className="text-muted-foreground text-xs">Вернём деньги если не понравится</p>
              </div>
            </div>
          </div>
        </div>

        {/* === URGENCY BANNER — летнее меню + занятые даты === */}
        <div className="mb-12 rounded-xl border border-amber-300 bg-amber-50 p-4 md:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">
                  🌞 Летнее меню — ограниченное предложение
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  Окрошка на квасе, гаспачо, салат с клубникой, гриль-меню.
                  <span className="font-semibold"> До 31 августа</span> — затем осеннее меню
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">
                Август: <span className="font-bold text-red-600">7 дат занято</span>
              </span>
            </div>
          </div>
        </div>

        {/* НАВИГАЦИЯ ПО ФОРМАТАМ */}
        <div className="mb-12 grid grid-cols-3 gap-4">
          <a
            href="#furshet"
            className="border-line bg-card hover:border-gold-text group flex flex-col items-center rounded-xl border p-4 transition-all"
          >
            <div className="bg-gold-tint/20 group-hover:bg-gold-tint/40 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-xl">🥂</span>
            </div>
            <h3 className="font-heading text-sm font-semibold">Фуршет</h3>
            <p className="text-muted-foreground text-xs">от 2 450 ₽/гость</p>
            <p className="text-gold-text mt-1 text-xs">4 тарифа</p>
          </a>
          <a
            href="#banquet"
            className="border-line bg-card hover:border-gold-text group flex flex-col items-center rounded-xl border p-4 transition-all"
          >
            <div className="bg-gold-tint/20 group-hover:bg-gold-tint/40 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-xl">🍽️</span>
            </div>
            <h3 className="font-heading text-sm font-semibold">Банкет</h3>
            <p className="text-muted-foreground text-xs">от 4 470 ₽/гость</p>
            <p className="text-gold-text mt-1 text-xs">3 тарифа</p>
          </a>
          <a
            href="#coffee"
            className="border-line bg-card hover:border-gold-text group flex flex-col items-center rounded-xl border p-4 transition-all"
          >
            <div className="bg-gold-tint/20 group-hover:bg-gold-tint/40 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-xl">☕</span>
            </div>
            <h3 className="font-heading text-sm font-semibold">Кофе-брейк</h3>
            <p className="text-muted-foreground text-xs">от 950 ₽/гость</p>
            <p className="text-gold-text mt-1 text-xs">4 тарифа</p>
          </a>
        </div>

        {/* === ФУРШЕТ — 4 ТАРИФА === */}
        <TariffSection
          title="🥂 Фуршет на заказ"
          subtitle="Гости едят стоя. Канапе, тарталетки, мини-бургеры. Минимальный заказ — 20 гостей."
          tariffs={FURSHET_TARIFFS}
          type="furshet"
          href="/menu/furshet"
        />

        {/* === БАНКЕТ — 3 ТАРИФА === */}
        <TariffSection
          title="🍽️ Банкет под ключ"
          subtitle="Полный ужин с посадкой. Для свадеб, юбилеев, корпоративов. Минимальный заказ — 15 гостей."
          tariffs={BANQUET_TARIFFS}
          type="banquet"
          href="/menu/banquet"
        />

        {/* === КОФЕ-БРЕЙК — 4 ТАРИФА === */}
        <TariffSection
          title="☕ Кофе-брейк"
          subtitle="Для конференций, тренингов, совещаний. Минимальный заказ — 10 гостей."
          tariffs={COFFEE_BREAK_TARIFFS}
          type="coffee"
          href="/menu/coffee-break"
        />

        {/* ПРИМЕРЫ РЕАЛЬНЫХ СЧЕТОВ */}
        <div className="mb-16">
          <h2 className="font-heading mb-2 text-center text-2xl font-bold">
            Примеры реальных заказов
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Сколько это стоит на практике (всё включено, доставка по КАД бесплатно)
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.map((ex) => (
              <div key={ex.event} className="border-line bg-card rounded-xl border p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-semibold">{ex.event}</h3>
                    <p className="text-muted-foreground text-xs">{ex.format}</p>
                  </div>
                  <Users className="text-muted-foreground h-5 w-5" />
                </div>
                <div className="border-line flex items-baseline justify-between border-t pt-3">
                  <div className="text-muted-foreground text-sm">
                    {ex.perGuest.toLocaleString("ru-RU")} ₽ × {ex.guests} чел
                  </div>
                  <div className="text-gold-text text-xl font-bold">
                    {(ex.total / 1000).toFixed(0)} тыс ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ЧТО ВХОДИТ В ЛЮБУЮ ЦЕНУ */}
        <div className="bg-secondary/50 mb-16 rounded-2xl p-6">
          <h2 className="font-heading mb-6 text-center text-2xl font-bold">
            Что входит в любую цену
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: "🍽️", t: "Меню", d: "124+ блюд" },
              { icon: "👨‍🍳", t: "Официанты", d: "Профи" },
              { icon: "🚚", t: "Доставка", d: "По КАД — 0 ₽" },
              { icon: "🍽️", t: "Посуда", d: "Сервировка" },
              { icon: "📋", t: "Координатор", d: "Личный менеджер" },
              { icon: "🧹", t: "Уборка", d: "После события" },
            ].map((s) => (
              <div
                key={s.t}
                className="bg-card border-line flex flex-col items-center rounded-xl border p-4 text-center"
              >
                <span className="mb-2 text-3xl">{s.icon}</span>
                <p className="text-sm font-semibold">{s.t}</p>
                <p className="text-muted-foreground text-xs">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Конструктор */}
        <div className="from-gold-tint/30 border-gold-tint/50 mb-16 rounded-2xl border bg-gradient-to-br to-transparent p-8 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold">Нужен индивидуальный расчёт?</h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-xl">
            Соберите меню под себя или запросите точное коммерческое предложение — ответим за 15
            минут
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/plan/constructor"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            >
              Собрать своё меню <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/plan/helper"
              className="border-line bg-card hover:border-gold-text inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Получить КП
            </Link>
          </div>
        </div>

        {/* Связанные страницы */}
        <RelatedPages context="info" slug="pricing" />
        <SmartCTA
          context="pricing"
          title="Нужна помощь с выбором?"
          description="Наши менеджеры подберут оптимальный формат под ваш бюджет и мероприятие"
        />
      </div>
    </main>
  );
}
