import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FoodPhoto from '@/components/common/FoodPhoto';
import { Check, ArrowRight, Calculator, Users } from 'lucide-react';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Цены на кейтеринг в СПб — от 390 ₽/гость',
  description: 'Прозрачные цены: фуршет от 2 450 ₽, банкет от 3 950 ₽, кофе-брейк от 390 ₽ за гостя. Всё включено. Без скрытых платежей.',
};

export const dynamic = 'force-static';

// === 4 ОСНОВНЫХ ФОРМАТА — простая таблица ===
const FORMATS = [
  {
    name: 'Кофе-брейк',
    href: '/menu/coffee-break',
    img: '/images/menu/deserty/d1.jpg',
    price: 390,
    min: 10,
    hours: '1–2 ч',
    desc: 'Выпечка, сэндвичи, кофе. Для конференций и тренингов.',
    includes: ['Сэндвичи и выпечка', 'Кофе и чай', 'Фрукты', 'Бумажная посуда', 'Доставка по КАД'],
  },
  {
    name: 'Фуршет',
    href: '/menu/furshet',
    img: '/images/menu/kanape/k1.jpg',
    price: 2450,
    min: 15,
    hours: '2–3 ч',
    desc: 'Канапе, тарталетки, мини-бургеры. Гости едят стоя.',
    includes: ['12+ закусок', 'Напитки', 'Официант 1/15', 'Фуршетная сервировка', 'Доставка по КАД'],
  },
  {
    name: 'Банкет',
    href: '/menu/banquet',
    img: '/images/real/beef-medallions.jpg',
    price: 3950,
    min: 30,
    hours: '4–6 ч',
    desc: 'Полный ужин с посадкой. Для свадеб и торжеств.',
    includes: ['4 перемены блюд', 'Торт включён', 'Официант 1/10', 'Банкетная сервировка', 'Координатор'],
    popular: true,
  },
  {
    name: 'Шеф на дом',
    href: '/events/chef-at-home',
    img: '/images/dishes-new/beef-steak.jpg',
    price: 4500,
    min: 6,
    hours: '3–4 ч',
    desc: 'Шеф-повар приезжает к вам. Авторское меню.',
    includes: ['5 перемен блюд', 'Премиум-фарфор', 'Сервировка и уборка', 'Все продукты', 'Сомелье (опц.)'],
  },
];

// === Примеры реальных счетов ===
const EXAMPLES = [
  { event: 'Свадьба 50 чел', format: 'Банкет', perGuest: 3950, guests: 50, total: 197500 },
  { event: 'Корпоратив 30 чел', format: 'Фуршет', perGuest: 2450, guests: 30, total: 73500 },
  { event: 'Конференция 20 чел', format: 'Кофе-брейк', perGuest: 600, guests: 20, total: 12000 },
  { event: 'День рождения 8 чел', format: 'Шеф на дом', perGuest: 4500, guests: 8, total: 36000 },
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <Breadcrumbs />

        {/* HERO — простая, с одной цифрой */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
            Цены на кейтеринг
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            4 формата. От <strong className="text-foreground">390 ₽/гость</strong>. Всё включено — еда, персонал, посуда, доставка.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/plan/helper" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Calculator className="w-4 h-4" />
              Рассчитать за 2 минуты
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-6 py-3 text-sm font-semibold hover:border-gold-text transition-colors">
              {SITE.phone}
            </a>
          </div>
        </div>

        {/* 4 ФОРМАТА — простые карточки с ценой */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {FORMATS.map((fmt) => (
            <div
              key={fmt.name}
              className={`relative rounded-2xl overflow-hidden border-2 ${fmt.popular ? 'border-gold-text shadow-lg shadow-gold/10' : 'border-line'} bg-card flex`}
            >
              {fmt.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-xs bg-gold-text text-white px-2 py-1 rounded-full font-semibold">Популярно</span>
                </div>
              )}

              {/* Фото — фиксированная ширина, квадрат */}
              <div className="w-36 md:w-40 shrink-0 relative overflow-hidden bg-secondary">
                <FoodPhoto
                  src={fmt.img}
                  alt={fmt.name}
                  aspectRatio="square"
                  className="w-full h-full"
                />
              </div>

              {/* Контент — занимает остаток */}
              <div className="flex-1 p-5 flex flex-col">
                <h2 className="font-heading text-xl font-medium mb-1">{fmt.name}</h2>
                  <p className="text-xs text-muted-foreground mb-3">{fmt.desc}</p>

                  {/* Цена — КРУПНО */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-gold-text">{fmt.price.toLocaleString('ru-RU')}</span>
                    <span className="text-sm text-muted-foreground">₽/гость</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    мин. {fmt.min} гостей · {fmt.hours}
                  </p>

                  {/* Что входит — чек-лист */}
                  <ul className="space-y-1">
                    {fmt.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-gold-text shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={fmt.href}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gold-text hover:underline pt-3"
                  >
                    Выбрать {fmt.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
            </div>
          ))}
        </div>

        {/* ПРИМЕРЫ РЕАЛЬНЫХ СЧЕТОВ — конкретика */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-medium mb-2 text-center">Примеры реальных заказов</h2>
          <p className="text-muted-foreground mb-6 text-center">Сколько это стоит на практике</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXAMPLES.map((ex) => (
              <div key={ex.event} className="p-5 rounded-xl border border-line bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-base font-medium">{ex.event}</h3>
                    <p className="text-xs text-muted-foreground">{ex.format}</p>
                  </div>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex items-baseline justify-between pt-3 border-t border-line">
                  <div className="text-sm text-muted-foreground">
                    {ex.perGuest.toLocaleString('ru-RU')} ₽ × {ex.guests}
                  </div>
                  <div className="text-xl font-bold text-gold-text">
                    {ex.total.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ЧТО ВХОДИТ В ЛЮБУЮ ЦЕНУ */}
        <div className="mb-16 p-6 rounded-2xl bg-secondary/50">
          <h2 className="font-heading text-2xl font-medium mb-4 text-center">Что входит в любую цену</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: '🍽', t: 'Меню', d: 'Выбор из 124 блюд' },
              { icon: '👨‍🍳', t: 'Официанты', d: 'Профессионалы' },
              { icon: '🚚', t: 'Доставка', d: 'По КАД бесплатно' },
              { icon: '🍽', t: 'Посуда', d: 'Сервировка' },
              { icon: '📋', t: 'Координатор', d: 'Личный менеджер' },
              { icon: '🧹', t: 'Уборка', d: 'После мероприятия' },
            ].map((s) => (
              <div key={s.t} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-line">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-medium">{s.t}</p>
                  <p className="text-xs text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gold-tint/30 to-transparent border border-gold-tint">
          <h2 className="font-heading text-2xl font-medium mb-3">Не нашли подходящий формат?</h2>
          <p className="text-muted-foreground mb-6">Соберите меню под себя — выберите блюда поштучно</p>
          <Link
            href="/plan/constructor"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Собрать своё меню <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
