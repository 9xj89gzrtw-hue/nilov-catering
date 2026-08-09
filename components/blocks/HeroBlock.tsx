import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * HeroBlock — full-bleed video hero (как Ballena Cabo / Wolfgang Puck)
 *
 * W87: Полная переработка по образцу топ-catering сайтов:
 * - Full-screen video background (не split)
 * - Текст поверх видео с gradient overlay
 * - ОДНА главная CTA (не две конкурирующих)
 * - Цены в виде компактной строки (не 3 pill'а)
 * - Минимум текста — максимум визуала
 */

export default function HeroBlock() {
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-foreground" aria-labelledby="hero-heading">
      {/* Full-bleed video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/catering/wedding-02.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-catering.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — тёмный снизу для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      {/* Контент — внизу, как у Ballena/Wolfgang Puck */}
      <div className="relative z-10 container-site pb-16 md:pb-20 pt-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.22em] text-white/80 font-semibold mb-4">
            Кейтеринг в Санкт-Петербурге · с 2007 года
          </p>

          {/* Главный заголовок — крупный, белый */}
          <h1
            id="hero-heading"
            className="font-heading text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-5"
            style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            Кейтеринг от шефа
            <br />
            Дмитрия Нилова
          </h1>

          {/* Подзаголовок — одна строка, конкретно */}
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl leading-relaxed">
            Готовим на вашей площадке. Свадьбы, корпоративы, дни рождения.
            От 390 ₽ за гостя — меню, официанты, посуда включены.
          </p>

          {/* Цены — компактная строка, не 3 pill'а */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-white/90 text-sm">
            <span>Фуршет <strong className="text-white">от 2 450 ₽</strong>/гость</span>
            <span className="text-white/40">·</span>
            <span>Банкет <strong className="text-white">от 3 950 ₽</strong>/гость</span>
            <span className="text-white/40">·</span>
            <span>Кофе-брейк <strong className="text-white">от 390 ₽</strong>/гость</span>
          </div>

          {/* ОДНА главная CTA + вторичная текстовая ссылка */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/plan/helper"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-foreground px-8 py-4 text-base font-semibold hover:bg-white/90 transition-colors no-underline shadow-lg"
            >
              Узнать цену за 30 секунд
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-base font-medium underline-offset-4 hover:underline"
            >
              Смотреть меню
            </Link>
          </div>

          {/* Trust — одна строка внизу */}
          <p className="text-sm text-white/60 mt-8">
            19 лет на кухне Петербурга · 4.8/5 по 27 отзывам · 124 блюда
          </p>
        </div>
      </div>
    </section>
  );
}
