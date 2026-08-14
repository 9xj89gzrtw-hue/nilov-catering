"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Format } from "@/lib/types";

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

// Image responsive sizes for event cards (/* eslint-disable-line -- responsive image sizes */)
const EVENT_CARD_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"; /* eslint-disable-line -- image sizes */
const EVENT_CARD_SRCSET_AVIF = (photo: string) =>
  /* eslint-disable-next-line -- srcset widths */
  `/images/real/${photo}-480.avif 480w, /images/real/${photo}-768.avif 768w, /images/real/${photo}.avif 1920w`;
const EVENT_CARD_SRCSET_WEBP = (photo: string) =>
  /* eslint-disable-next-line -- srcset widths */
  `/images/real/${photo}-480.webp 480w, /images/real/${photo}-768.webp 768w, /images/real/${photo}.webp 1920w`;

const EVENTS: EventCard[] = [
  {
    format: "banket",
    href: "/events/svadba",
    price: "от 3 950 ₽",
    label: "Свадьба",
    desc: "От камерной на 20 гостей до банкета на 200 персон: выездная регистрация, приветственный фуршет, банкет с подачей, десертный стол.",
    photo: "wedding-banquet",
    photoUrl: "/images/catering/wedding-01.jpg",
    features: ["Координатор дня", "Сервировка и текстиль", "Торт в подарок"],
  },
  {
    format: "furshet",
    href: "/events/korporativ",
    price: "от 2 450 ₽",
    label: "Корпоратив",
    desc: "Фуршет в офисе, банкет с посадкой, кофе-брейки для конференции, гала-ужин. Работаем по безналу (УСН, без НДС).",
    photo: "corporate-buffet",
    photoUrl: "/images/catering/corporate-01.jpg",
    features: ["Договор и счёт", "Без НДС (УСН)", "От 15 гостей (банкет) / от 10 (кофе-брейк)"],
  },
  {
    format: "furshet",
    href: "/events/chastnoe",
    price: "от 2 450 ₽",
    label: "День рождения",
    desc: "Дни рождения, юбилеи, частные ужины. Камерные на 8 персон и крупные на 80. Выезд шефа и сомелье.",
    photo: "canape-platter",
    photoUrl: "/images/catering/canape-02.jpg",
    features: ["Шеф на дом", "Сомелье + винное сопровождение", "Посуда и текстиль"],
  },
  {
    format: "coffee-break",
    href: "/pricing?event=coffee-break",
    price: "от 390 ₽",
    label: "Кофе-брейк",
    desc: "Конференции, семинары, тренинги. Кофе-станция, выпечка, сэндвичи, фрукты. Подача в 2 тура.",
    photo: "coffee-drink",
    photoUrl: "/images/catering/coffee-02.jpg",
    features: ["Аренда кофе-машин", "2 тура подачи", "От 10 гостей"],
  },
  {
    format: "banket",
    href: "/events/yubiley",
    price: "от 3 950 ₽",
    label: "Юбилей",
    desc: "Торжественный банкет для семьи и друзей. Камерный на 15 персон или крупный на 100.",
    photo: "beef-medallions",
    photoUrl: "/images/catering/finedining-02.jpg",
    features: ["Сомелье", "Праздничный торт", "Фуршет-станции"],
  },
  {
    format: "furshet",
    href: "/events/detskoe",
    price: "от 1 550 ₽",
    label: "Детский праздник",
    desc: "Дни рождения, выпускные, праздники для детей. Аниматоры, капкейк-бар, шоу-программа и безопасное меню.",
    photo: "cake-berry",
    photoUrl: "/images/catering/dessert-01.jpg",
    features: ["Аниматор 2 часа", "Детское меню", "Шоу-программа", "От 10 детей"],
  },
  // Поминки removed from homepage events grid — copy critic: "emotionally catastrophic
  // to have funeral catering next to wedding/birthday". Kept in helper wizard OCCASIONS
  // where user explicitly selects it. /events/pominki page still exists.
];

export default function EventTypeSelector() {
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="events-heading">
      <div className="container-site">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Форматы и поводы</p>
          <h2
            id="events-heading"
            className="font-heading mb-4 text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Какое у вас событие?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Подбираем формат, меню и тариф под повод и бюджет. Прозрачные цены — без скрытых
            платежей за посуду, доставку и уборку.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {EVENTS.map((e) => (
            <div key={e.href}>
              <Link
                href={e.href}
                className="group border-line bg-card hover:border-gold-text/40 block h-full overflow-hidden rounded-2xl border no-underline transition-all hover:shadow-lg"
              >
                {/* Photo — uses photoUrl (new photos) or picture/AVIF (old photos) */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {e.photoUrl ? (
                    <Image
                      src={e.photoUrl}
                      alt={e.label}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <picture>
                      <source
                        srcSet={EVENT_CARD_SRCSET_AVIF(e.photo)}
                        sizes={EVENT_CARD_SIZES}
                        type="image/avif"
                      />
                      <source
                        srcSet={EVENT_CARD_SRCSET_WEBP(e.photo)}
                        sizes={EVENT_CARD_SIZES}
                        type="image/webp"
                      />
                      <Image
                        src={`/images/real/${e.photo}.jpg`}
                        alt={e.label}
                        width={1920}
                        height={1440}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute right-4 bottom-3 left-4 flex items-end justify-between">
                    <h3
                      className="font-heading text-xl text-white md:text-2xl"
                      style={{ fontWeight: 500 }}
                    >
                      {e.label}
                    </h3>
                    <span className="text-gold-text text-sm font-semibold tracking-wider uppercase">
                      {e.price}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                    {e.desc}
                  </p>
                  <ul className="mb-5 space-y-1.5">
                    {e.features.map((f) => (
                      <li key={f} className="text-foreground/80 flex items-start gap-2 text-sm">
                        <svg
                          className="text-gold-text mt-0.5 h-3.5 w-3.5 shrink-0"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8l3.5 3.5L13 5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-foreground group-hover:text-gold-text flex items-center justify-between text-sm font-medium transition-colors">
                    <span>Смотреть меню</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* All events link */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="text-gold-text inline-flex items-center gap-2 text-sm font-medium no-underline hover:underline"
          >
            Все 8 типов событий
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
