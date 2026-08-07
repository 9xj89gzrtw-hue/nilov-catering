

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

/**
 * NamedPackageGrid — A-Catering pattern: 6 named packages with from-prices.
 * Competitor critic: "Named-package from-price grid — buyers screenshot and forward."
 *
 * Each package has: name, price/guest, min guests, what's included, photo.
 */
const PACKAGES = [
  {
    name: 'Фуршет «Гавань»',
    price: '2 450 ₽',
    unit: '/гость',
    min: 'от 20 гостей',
    photo: 'canape-platter',
    includes: ['12 закусок', '2 горячего', '1 десерт', 'Официанты', 'Посуда'],
    href: '/menu/furshet',
    badge: 'Хит',
  },
  {
    name: 'Банкет «Гранд»',
    price: '3 950 ₽',
    unit: '/гость',
    min: 'от 30 гостей',
    photo: 'beef-medallions',
    includes: ['4 закуски', '2 горячего', 'Десерт', 'Винная карта', 'Координатор'],
    href: '/menu/banquet',
    badge: null,
  },
  {
    name: 'Кофе-брейк «Лайт»',
    price: '390 ₽',
    unit: '/гость',
    min: 'от 10 гостей',
    photo: 'coffee-drink',
    includes: ['Кофе-станция', '3 выпечки', 'Сэндвичи', 'Фрукты', '2 тура'],
    href: '/menu/coffee-break',
    badge: 'от 390₽',
  },
  {
    name: 'BBQ «Пикник»',
    price: '2 700 ₽',
    unit: '/гость',
    min: 'от 15 гостей',
    photo: 'grilled-chicken',
    includes: ['Мангал', '3 вида мяса', 'Овощи-гриль', 'Соусы', 'Бармен'],
    href: '/seasonal/bbq',
    badge: null,
  },
  {
    name: 'Детский «Праздник»',
    price: '1 550 ₽',
    unit: '/гость',
    min: 'от 10 детей',
    photo: 'dessert-table',
    includes: ['Детское меню', 'Аниматор 2ч', 'Капкейки', 'Сок-бар', 'Шоу-программа'],
    href: '/events/detskoe',
    badge: null,
  },
  {
    name: 'Шеф на дом',
    price: '5 000 ₽',
    unit: '/час',
    min: 'от 6 гостей',
    photo: 'salmon-dish',
    includes: ['Шеф-повар', '6 подач', 'Сомелье', 'Продукты', 'Уборка'],
    href: '/events/chef-at-home',
    badge: 'Премиум',
  },
];

export default function NamedPackageGrid() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="packages-heading">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p
              
              
              
              
              className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3"
            >
              Готовые пакеты
            </p>
            <h2
              id="packages-heading"
              
              
              
              
              className="font-heading text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              6 пакетов с фиксированной ценой
            </h2>
          </div>
          <div
            
            
            
            
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-colors no-underline"
            >
              Все тарифы и сравнение
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.name}
              
              
              
              
            >
              <Link
                href={pkg.href}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-card hover:border-gold-text/40 hover:shadow-lg transition-all no-underline"
              >
                {/* Photo with badge */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <picture>
                    <source srcSet={`/images/real/${pkg.photo}-480.avif 480w, /images/real/${pkg.photo}-768.avif 768w`} sizes="(max-width: 768px) 100vw, 33vw" type="image/avif" />
                    <source srcSet={`/images/real/${pkg.photo}-480.webp 480w, /images/real/${pkg.photo}-768.webp 768w`} sizes="(max-width: 768px) 100vw, 33vw" type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/real/${pkg.photo}.jpg`}
                      alt={pkg.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </picture>
                  {pkg.badge && (
                    <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-foreground text-background px-3 py-1 text-xs font-semibold">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg md:text-xl mb-2" style={{ fontWeight: 500 }}>
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-heading text-2xl md:text-3xl text-foreground" style={{ fontWeight: 600 }}>
                      от {pkg.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{pkg.unit}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{pkg.min}</span>
                  </div>

                  {/* Includes */}
                  <ul className="space-y-1.5 mb-5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="text-xs text-foreground/80 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0 text-gold-text" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-sm font-medium text-foreground group-hover:text-gold-text transition-colors">
                    <span>Выбрать пакет</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
