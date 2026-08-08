import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PrintButton from '@/components/common/PrintButton';
import { FileText, FileSignature, ShieldCheck } from 'lucide-react';
import FoodPhoto from '@/components/common/FoodPhoto';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing', languages: { 'ru': '/pricing', 'en': '/en', 'x-default': '/pricing' } },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

export const dynamic = 'force-static';

// W83: фото-карточки тарифов — каждая с реальным фото, описанием, чек-листом
const PRICING_CARDS = [
  {
    event: 'Свадьба',
    href: '/pricing?event=svadba',
    img: '/images/real/beef-medallions.jpg',
    price: 'от 3 950 ₽',
    unit: '/ гость',
    min: 'мин. 30 гостей',
    desc: 'Банкет под ключ: закуски, горячее, десерт, торт. Официанты, координатор, доставка включены.',
    features: ['Банкет с посадкой', 'Меню от 4 перемен', 'Официант на 10 чел', 'Координатор вечера'],
    accent: true,
    badge: 'Популярно',
  },
  {
    event: 'Кофе-брейк',
    href: '/pricing?event=coffee-break',
    img: '/images/menu/deserty/d1.jpg',
    price: 'от 390 ₽',
    unit: '/ гость',
    min: 'мин. 10 гостей',
    desc: 'Для конференций и тренингов. Выпечка, сэндвичи, кофе, чай. Без официантов — простая доставка.',
    features: ['Сэндвичи и выпечка', 'Кофе / чай', 'Фрукты', 'Доставка включена'],
  },
  {
    event: 'Корпоратив',
    href: '/pricing?event=korporativ',
    img: '/images/menu/kanape/k1.jpg',
    price: 'от 2 450 ₽',
    unit: '/ гость',
    min: 'мин. 20 гостей',
    desc: 'Фуршет для офиса или гала-ужина. Канапе, тарталетки, мини-бургеры. Гости едят стоя.',
    features: ['Канапе и тарталетки', 'Мини-бургеры', 'Напитки', 'Официант на 15 чел'],
  },
  {
    event: 'Детское',
    href: '/pricing?event=detskoe',
    img: '/images/menu/goryachee/h1.jpg',
    price: 'от 1 550 ₽',
    unit: '/ гость',
    min: 'мин. 10 гостей',
    desc: 'Безопасное детское меню: бургеры, наггетсы, фрукты, капкейки. Аниматор опционально.',
    features: ['Мини-бургеры', 'Наггетсы', 'Фрукты', 'Капкейки'],
  },
  {
    event: 'Поминки',
    href: '/pricing?event=pominki',
    img: '/images/real/salmon-dish.jpg',
    price: 'от 1 800 ₽',
    unit: '/ гость',
    min: 'мин. 10 гостей',
    desc: 'Поминальный обед по православной традиции: кутья, блины, кисель, рыба. Без алкоголя.',
    features: ['Кутья, блины', 'Кисель', 'Рыба', 'Без алкоголя'],
  },
  {
    event: 'Шеф на дом',
    href: '/pricing?event=chef-at-home',
    img: '/images/dishes-new/beef-steak.jpg',
    price: 'от 4 500 ₽',
    unit: '/ гость',
    min: 'мин. 6 гостей',
    desc: 'Шеф-повар приезжает к вам. Авторское меню, сомелье опционально. Премиум-ингредиенты.',
    features: ['Шеф дома', '5 перемен', 'Сервировка', 'Сомелье опц.'],
  },
];

const COMPARISON_ROWS = [
  { label: 'Меню включено', furshet: '12+ канапе/тарталеток', banket: '4 перемены блюд', coffee: '8+ позиций выпечки', detskoe: '5 позиций', chef: '5 перемен авторских' },
  { label: 'Официанты', furshet: '1 на 15 чел', banket: '1 на 10 чел', coffee: '—', detskoe: '1 на 10 чел', chef: '1 на 6 чел' },
  { label: 'Координатор', furshet: '+', banket: '+', coffee: '—', detskoe: '+', chef: '+' },
  { label: 'Доставка по КАД', furshet: 'включена', banket: 'включена', coffee: 'включена', detskoe: 'включена', chef: 'включена' },
  { label: 'Сервировка', furshet: 'фуршетная', banket: 'банкетная', coffee: 'бумажная', detskoe: 'детская', chef: 'премиум-фарфор' },
  { label: 'Уборка', furshet: '+', banket: '+', coffee: '+', detskoe: '+', chef: '+' },
  { label: 'Торт', furshet: 'опц.', banket: 'включён', coffee: '—', detskoe: 'включён', chef: 'опц.' },
  { label: 'Алкоголь', furshet: 'опц.', banket: 'опц.', coffee: '—', detskoe: '—', chef: 'опц.' },
];

const TIERS = [
  { event: 'Свадьба', tier: 'Эконом', price: '3 950 ₽', min: 30 },
  { event: 'Свадьба', tier: 'Стандарт', price: '5 470 ₽', min: 30, recommended: true },
  { event: 'Свадьба', tier: 'Расширенный', price: '7 350 ₽', min: 30 },
  { event: 'Свадьба', tier: 'Максимальный', price: '9 950 ₽', min: 30 },
  { event: 'Кофе-брейк', tier: 'Эконом', price: '390 ₽', min: 10 },
  { event: 'Корпоратив', tier: 'Фуршет', price: '2 450 ₽', min: 20 },
  { event: 'Корпоратив', tier: 'Банкет', price: '3 950 ₽', min: 30 },
  { event: 'Поминки', tier: 'Базовый', price: '1 800 ₽', min: 10 },
  { event: 'Поминки', tier: 'Расширенный', price: '2 500 ₽', min: 10 },
  { event: 'Детское', tier: 'Стандарт', price: '1 550 ₽', min: 10 },
  { event: 'Шеф на дом', tier: 'Премиум', price: '4 500 ₽', min: 6 },
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-6xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">Прозрачные цены</p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">Тарифы и цены</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Все тарифы включают: меню, официантов, координатора, доставку в пределах КАД,
            сервировку и уборку. <strong className="text-foreground">Без скрытых платежей.</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/api/templates/dogovor" download="nilov-dogovor-template.pdf" className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors">
              <FileText className="w-4 h-4" aria-hidden="true" />
              Договор PDF
            </Link>
            <Link href="/api/templates/nda" download="nilov-nda-template.pdf" className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors">
              <FileSignature className="w-4 h-4" aria-hidden="true" />
              NDA PDF
            </Link>
            <Link href="/api/templates/sla" download="nilov-sla-template.pdf" className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              SLA PDF
            </Link>
            <PrintButton label="Печать тарифов" />
          </div>
        </div>

        {/* Pricing cards grid — main attraction */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-medium mb-2">Выберите формат события</h2>
          <p className="text-muted-foreground mb-8">Нажмите на карточку — увидите состав меню и сможете изменить блюда под себя</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRICING_CARDS.map((card) => (
              <Link
                key={card.event}
                href={card.href}
                className={`group rounded-2xl overflow-hidden border ${card.accent ? 'border-gold-text ring-2 ring-gold-text/30' : 'border-line'} bg-card hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <FoodPhoto
                    src={card.img}
                    alt={card.event}
                    aspectRatio="wide"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {card.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-xs bg-gold-text text-white px-3 py-1 rounded-full font-semibold shadow-md">{card.badge}</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <h3 className="font-heading text-xl font-medium mb-1">{card.event}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{card.price}</span>
                      <span className="text-xs opacity-90">{card.unit}</span>
                    </div>
                    <p className="text-[11px] opacity-90 mt-0.5">{card.min}</p>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{card.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {card.features.map(f => (
                      <span key={f} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-gold-text">
                    Выбрать тариф
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comparison table — what's included */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-medium mb-2">Что входит в тариф</h2>
          <p className="text-muted-foreground mb-6">Сравните включённые услуги по форматам</p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <caption className="sr-only">Сравнение включённых услуг по форматам</caption>
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">Услуга</th>
                  <th scope="col" className="text-center p-3 font-semibold">Фуршет</th>
                  <th scope="col" className="text-center p-3 font-semibold">Банкет</th>
                  <th scope="col" className="text-center p-3 font-semibold">Кофе-брейк</th>
                  <th scope="col" className="text-center p-3 font-semibold">Детское</th>
                  <th scope="col" className="text-center p-3 font-semibold">Шеф на дом</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}>
                    <th scope="row" className="text-left p-3 font-medium">{row.label}</th>
                    <td className="text-center p-3 text-muted-foreground">{row.furshet}</td>
                    <td className="text-center p-3 text-muted-foreground">{row.banket}</td>
                    <td className="text-center p-3 text-muted-foreground">{row.coffee}</td>
                    <td className="text-center p-3 text-muted-foreground">{row.detskoe}</td>
                    <td className="text-center p-3 text-muted-foreground">{row.chef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full tariff selector — TariffOffersSection */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-medium mb-2">Все тарифы по событиям</h2>
          <p className="text-muted-foreground mb-6">Выберите тип события — увидите 4 уровня тарифов с возможностью изменить состав</p>
          <TariffOffersSection />
        </div>

        {/* Full price table */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-medium mb-2">Полная таблица цен</h2>
          <p className="text-muted-foreground mb-6">Все тарифы и их стоимость</p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <caption className="sr-only">Полная таблица цен на кейтеринг по типам событий</caption>
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">Тип события</th>
                  <th scope="col" className="text-left p-3 font-semibold">Тариф</th>
                  <th scope="col" className="text-right p-3 font-semibold">Цена/гость</th>
                  <th scope="col" className="text-right p-3 font-semibold">Мин. гостей</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier, i) => (
                  <tr key={i} className={`border-t border-line ${tier.recommended ? 'bg-gold-tint/20' : i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
                    <td scope="row" className="p-3 font-medium">{tier.event}</td>
                    <td className="p-3">
                      {tier.tier}
                      {tier.recommended && <span className="ml-2 text-[10px] bg-gold-text text-white px-2 py-0.5 rounded-full font-semibold">Рекомендуем</span>}
                    </td>
                    <td className="p-3 text-right font-semibold text-gold-text">{tier.price}</td>
                    <td className="p-3 text-right text-muted-foreground">{tier.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Все цены включают: еду, персонал, посуду, доставку по КАД. Доставка за КАД — от 3 000 ₽.</p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="p-6 rounded-2xl border border-line bg-card text-center">
            <div className="text-3xl font-bold text-gold-text mb-1">3000+</div>
            <p className="text-sm text-muted-foreground">событий с 2007 года</p>
          </div>
          <div className="p-6 rounded-2xl border border-line bg-card text-center">
            <div className="text-3xl font-bold text-gold-text mb-1">4.8</div>
            <p className="text-sm text-muted-foreground">средний рейтинг отзывов</p>
          </div>
          <div className="p-6 rounded-2xl border border-line bg-card text-center">
            <div className="text-3xl font-bold text-gold-text mb-1">12 лет</div>
            <p className="text-sm text-muted-foreground">гарантии качества</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gold-tint/40 to-transparent border border-gold-tint text-center">
          <h2 className="font-heading text-3xl font-medium mb-3">Не нашли подходящий тариф?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Соберите меню под себя — выберите блюда поштучно. Для особых диет или если ни один тариф не подходит.
            Можно включить «Несколько групп гостей» — каждая группа получит своё под-меню.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/plan/constructor"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
            >
              Собрать своё меню
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/plan/helper"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-8 py-4 text-base font-semibold hover:border-gold-text transition-colors"
            >
              Помогите выбрать
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
