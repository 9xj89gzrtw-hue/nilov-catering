'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import type { Format } from '@/lib/types';

type EventCard = {
  format: Format;
  href: string;
  price: string;
  label: string;
  desc: string;
  photo: string;
  photoUrl?: string; // Full path for new photos without AVIF/WebP variants
  features: string[];
};

const EVENTS: EventCard[] = [
  {
    format: 'banket',
    href: '/events/svadba',
    price: 'от 3 950 ₽',
    label: 'Свадьба',
    desc: 'От камерной на 20 гостей до банкета на 200 персон: выездная регистрация, приветственный фуршет, банкет с подачей, десертный стол.',
    photo: 'wedding-banquet',
    photoUrl: '/images/catering/wedding-01.jpg',
    features: ['Координатор дня', 'Сервировка и текстиль', 'Торт в подарок'],
  },
  {
    format: 'furshet',
    href: '/events/korporativ',
    price: 'от 2 450 ₽',
    label: 'Корпоратив',
    desc: 'Фуршет в офисе, банкет с посадкой, кофе-брейки для конференции, гала-ужин. Работаем по безналу (УСН, без НДС).',
    photo: 'corporate-buffet',
    photoUrl: '/images/catering/corporate-01.jpg',
    features: ['Договор и счёт', 'Без НДС (УСН)', 'От 15 гостей (банкет) / от 10 (кофе-брейк)'],
  },
  {
    format: 'furshet',
    href: '/events/chastnoe',
    price: 'от 2 450 ₽',
    label: 'День рождения',
    desc: 'Дни рождения, юбилеи, частные ужины. Камерные на 8 персон и крупные на 80. Выезд шефа и сомелье.',
    photo: 'canape-platter',
    photoUrl: '/images/catering/canape-02.jpg',
    features: ['Шеф на дом', 'Сомелье + винное сопровождение', 'Посуда и текстиль'],
  },
  {
    format: 'coffee-break',
    href: '/pricing?event=coffee-break',
    price: 'от 390 ₽',
    label: 'Кофе-брейк',
    desc: 'Конференции, семинары, тренинги. Кофе-станция, выпечка, сэндвичи, фрукты. Подача в 2 тура.',
    photo: 'coffee-drink',
    photoUrl: '/images/catering/coffee-02.jpg',
    features: ['Аренда кофе-машин', '2 тура подачи', 'От 10 гостей'],
  },
  {
    format: 'banket',
    href: '/events/yubiley',
    price: 'от 3 950 ₽',
    label: 'Юбилей',
    desc: 'Торжественный банкет для семьи и друзей. Камерный на 15 персон или крупный на 100.',
    photo: 'beef-medallions',
    photoUrl: '/images/catering/finedining-02.jpg',
    features: ['Сомелье', 'Праздничный торт', 'Фуршет-станции'],
  },
  // Поминки removed from homepage events grid — copy critic: "emotionally catastrophic
  // to have funeral catering next to wedding/birthday". Kept in helper wizard OCCASIONS
  // where user explicitly selects it. /events/pominki page still exists.
];

export default function EventTypeSelector() {

  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="events-heading">
      <div className="container-site">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p
            className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3"
          >
            Форматы и поводы
          </p>
          <h2
            id="events-heading"
            className="font-heading text-3xl md:text-5xl mb-4"
            style={{ fontWeight: 500 }}
          >
            Какое у вас событие?
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg"
          >
            Подбираем формат, меню и тариф под повод и бюджет.
            Прозрачные цены — без скрытых платежей за посуду, доставку и уборку.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {EVENTS.map((e, idx) =>(
            <div
              key={e.href}
            >
              <Link
                href={e.href}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-card hover:border-gold-text/40 transition-all no-underline hover:shadow-lg"
              >
                {/* Photo — uses photoUrl (new photos) or picture/AVIF (old photos) */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {e.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={e.photoUrl}
                      alt={e.label}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <picture>
                      <source srcSet={`/images/real/${e.photo}-480.avif 480w, /images/real/${e.photo}-768.avif 768w, /images/real/${e.photo}.avif 1920w`} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" type="image/avif" />
                      <source srcSet={`/images/real/${e.photo}-480.webp 480w, /images/real/${e.photo}-768.webp 768w, /images/real/${e.photo}.webp 1920w`} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" type="image/webp" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/real/${e.photo}.jpg`}
                        alt={e.label}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h3 className="font-heading text-xl md:text-2xl text-white" style={{ fontWeight: 500 }}>{e.label}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-text">
                      {e.price}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{e.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {e.features.map((f) =>(
                      <li key={f} className="text-xs text-foreground/80 flex items-start gap-2">
                        <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold-text" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-sm font-medium text-foreground group-hover:text-gold-text transition-colors">
                    <span>Смотреть меню</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* All events link */}
        <div
          className="mt-10 text-center"
        >
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline no-underline">
            Все 8 типов событий
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
