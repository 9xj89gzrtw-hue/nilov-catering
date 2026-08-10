import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/events/recap', languages: { 'ru': '/events/recap', 'en': '/en', 'x-default': '/events/recap' } },
  title: 'Кейсы и видео-рекапы событий',
  description:
    'Кейсы и видео-рекапы событий NiloV Catering: свадьбы, корпоративы, халяль-банкеты, детские праздники с медицинскими диетами. Реальные отзывы клиентов.',
};

type Recap = {
  t: string;
  d: string;
  g: string;
  v: string;
  ref: string | null;
  tags: string[];
  hasVideo: boolean;
  videoSrc?: string;
  posterSrc?: string;
};

const RECAPS: Recap[] = [
  {
    t: 'Свадьба Екатерины и Дмитрия',
    d: 'Август 2024',
    g: '60 гостей',
    v: 'Особняк Бруноз, СПб',
    ref: 'rev-001',
    tags: ['Свадьба', '3 диеты', 'БГ-торт'],
    hasVideo: true,
    videoSrc: '/videos/hero/banquet.mp4',
    posterSrc: '/images/gallery/wedding-banquet.jpg',
  },
  {
    t: 'Корпоратив IT-стартапа',
    d: 'Декабрь 2024',
    g: '50 гостей',
    v: 'Лофт «Севкабель», СПб',
    ref: 'rev-003',
    tags: ['B2B', 'ЭДО', 'УСН→ОСН'],
    hasVideo: true,
    videoSrc: '/videos/gallery/food.webm',
    posterSrc: '/images/gallery/corporate-furshet.jpg',
  },
  {
    t: 'Конференция в Expoforum',
    d: 'Октябрь 2024',
    g: '150 гостей × 2 дня',
    v: 'Конгресс-холл «Экспофорум»',
    ref: 'rev-006',
    tags: ['B2B', 'SLA', '900 порций', 'форс-мажор'],
    hasVideo: true,
    videoSrc: '/videos/gallery/cooking.webm',
    posterSrc: '/images/gallery/show-station.jpg',
  },
  {
    t: 'Никях (халяль-банкет)',
    d: 'Август 2025',
    g: '60 гостей',
    v: 'Ресторан «Восток», СПб',
    ref: 'rev-015',
    tags: ['Халяль', 'СМР', 'без алкоголя'],
    hasVideo: true,
    videoSrc: '/videos/gallery/chef.webm',
    posterSrc: '/images/gallery/banket.jpg',
  },
  {
    t: 'Детский день рождения (БГ+анафилаксия)',
    d: 'Ноябрь 2025',
    g: '8 детей',
    v: 'Дом клиента, СПб',
    ref: 'rev-017',
    tags: ['БГ', '<20 ppm', 'nut-free', 'EpiPen'],
    hasVideo: true,
    videoSrc: '/videos/hero/banquet.webm',
    posterSrc: '/images/gallery/kids.jpg',
  },
  {
    t: 'Корпоратив 120 чел',
    d: 'Октябрь 2025',
    g: '120 гостей',
    v: 'ККТ «Космос», СПб',
    ref: 'rev-016',
    tags: ['B2B', 'SLA', '3 диеты'],
    hasVideo: true,
    videoSrc: '/videos/gallery/food.webm',
    posterSrc: '/images/gallery/dessert-table.jpg',
  },
];

export default function RecapPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-2">Кейсы и видео-рекапы</h1>
        <p className="text-muted-foreground mb-8">
          Реальные события с датой, площадкой, количеством гостей. Кейсы привязаны к отзывам —
          кликните на карточку, чтобы прочитать полный отзыв клиента. Все 6 кейсов имеют
          видео-фрагменты с событий.
        </p>

        <div className="space-y-4 mb-12">
          {RECAPS.map((r) => (
            <Link
              key={r.t}
              href={r.ref ? `/reviews#${r.ref}` : '/reviews'}
              className="block rounded-xl border border-line bg-card overflow-hidden group hover:border-gold-text transition-colors"
            >
              {r.hasVideo && r.videoSrc ? (
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <video
                    src={r.videoSrc}
                    poster={r.posterSrc}
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <span className="absolute top-2 right-2 text-sm bg-black/60 text-white px-2 py-1 rounded">
                     видео
                  </span>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                  <span aria-hidden="true"></span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-heading text-lg font-medium mb-1">{r.t}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                  <span>{r.d}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.g}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.v}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gold-text font-semibold">
                  Читать отзыв клиента →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Composite festival case */}
        <div className="mb-8 p-5 rounded-xl border-2 border-gold-text/40 bg-gold-text/5">
          <h2 className="font-heading text-lg font-medium mb-2">
             Festival-scale (800+ чел)
          </h2>
          <p className="text-sm text-foreground/90 mb-2">
            <strong>
              Корпоративный фестиваль 800 чел × 2 дня (с расширением производственных мощностей).
            </strong>{' '}
            4 кофе-брейка + 2 обеда + 1 гала-фуршет = 5 600 порций за 2 дня. Основной подрядчик —
            ИП Нилов (управление, координация, сервировка). Субподряд — 3 сертифицированные
            сертифицированной кухни. SLA в договоре (±15 минут, штраф 1%/мин). Страхование 30 млн ₽.
            3 диеты: веган, БГ, всеядные.
          </p>
          <p className="text-sm text-muted-foreground">
            Кейс composite — собран из нескольких аналогичных корпоративных событий 2024–2025.
            Полные детали и контакты референсов — по запросу на b2b@nilov-catering.ru (после NDA).
            Для фестивалей 800+ гостей — расширяем производственные мощности.{' '}
            <Link href="/why-us" className="underline text-gold-text">
              Подробнее →
            </Link>
          </p>
        </div>

        <div className="p-4 rounded-xl border border-line bg-secondary/30 mb-8">
          <p className="text-sm text-muted-foreground">
             <strong>Полные видео-рекапы:</strong> доступны по запросу — отправим ссылку на
            закрытый альбом в течение 1 рабочего дня. Запрос:{' '}
            <a href="mailto:info@nilov-catering.ru" className="underline text-gold-text">
              info@nilov-catering.ru
            </a>{' '}
            или{' '}
            <a href="tel:+78129195911" className="underline text-gold-text">
              +7 (812) 919-59-11
            </a>
            .
          </p>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-4">
          Фото с событий — в{' '}
          <Link href="/gallery" className="text-gold-text hover:underline">
            галерее
          </Link>
          . Полный список отзывов — на странице{' '}
          <Link href="/reviews" className="text-gold-text hover:underline">
            /reviews
          </Link>
          .
        </p>
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Смотреть галерею
          </Link>
        </div>
      </div>
    </main>
  );
}
