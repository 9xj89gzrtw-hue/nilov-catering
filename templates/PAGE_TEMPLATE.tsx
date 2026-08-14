// ============================================================================
// 📄 ШАБЛОН ПОДСТРАНИЦЫ — Нилов Кейтеринг
// ============================================================================
//
// ⚠️  ВАЖНО: Это ОТПРАВНАЯ ТОЧКА, НЕ ФИНАЛЬНЫЙ ШАБЛОН!
//
//  ПЕРЕД ИСПОЛЬЗОВАНИЕМ:
//  1. Исследуйте актуальные тренды дизайна 2025-2026 через web_search
//  2. Изучите лучшие примеры на Awwwards.com
//  3. Сравните с конкурентами
//  4. УЛУЧШИТЕ этот шаблон если нашли лучшее решение!
//
// ============================================================================

import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ============================================================================
// 1. METADATA (ОБЯЗАТЕЛЬНО! SEO + Social sharing)
// ============================================================================
export const metadata: Metadata = {
  title: "Название Услуги | Нилов Кейтеринг",
  description: "Уникальное описание 150-300 символов для SEO.",

  // Open Graph (для соцсетей)
  openGraph: {
    title: "Название Услуги | Нилов Кейтеринг",
    description: "Описание для социальных сетей.",
    type: "website",
    locale: "ru_RU",
    siteName: "Нилов Кейтеринг",
    images: [
      {
        url: "/images/og/page-name.jpg", // 1200x630px
        width: 1200,
        height: 630,
        alt: "Нилов Кейтеринг",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Название Услуги | Нилов Кейтеринг",
    description: "Описание для Twitter",
  },
};

// ============================================================================
// 2. СТРУКТУРНЫЕ ДАННЫЕ (Schema.org — для SEO)
// ============================================================================
// import { generateEventSchema, generateFAQSchema } from "@/lib/schema";

// const jsonLd = generateEventSchema({
//   name: "Название услуги",
//   description: "Описание...",
//   url: "https://nilov-catering.ru/page-url",
// });

// ============================================================================
// 3. ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ
// ============================================================================
export default function PageName() {
  return (
    <ErrorBoundary>
      {/* Schema.org JSON-LD (раскомментируйте если нужен) */}
      {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> */}

      <main className="min-h-screen">
        {/* ================================================================ */}
        {/* HERO СЕКЦИЯ */}
        {/*
         * Требования:
         * - Сильный визуальный impact
         * - Уникальный H1 (только один на странице!)
         * - Чёткий UVP (Unique Value Proposition)
         * - CTA близко к началу
         *
         * ИССЛЕДОВАТЬ: Лучшие Hero секции ресторанов/кейтеринга 2026!
         * → web_search("best hero section restaurant website 2026")
         */}
        {/* ================================================================ */}
        <section className="relative flex min-h-[80vh] items-center overflow-hidden">
          {/*
           * ФОН: Выберите подходящий вариант после исследования:
           *
           * Варианты (тренды 2026):
           * - Full-screen видео с оверлеем
           * - Качественное фото с параллаксом
           * - Градиент + геометрические паттерны
           * - Dark mode luxury aesthetic
           * - 3D элементы (умеренно!)
           */}

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb (хлебные крошки) */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm opacity-70">
                <li>
                  <a href="/">Главная</a>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li>
                  <a href="/parent">Родитель</a>
                </li>
                <li>
                  <span>/</span>
                </li>
                <li className="opacity-100">Текущая</li>
              </ol>
            </nav>

            {/* H1 — уникальный, эмоциональный, с ключевыми словами */}
            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Заголовок H1 —{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
                уникальное преимущество
              </span>
            </h1>

            {/* Подзаголовок — поддержка, детали */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
              Описание — что клиент найдёт? Почему это важно? Эмоционально, но по делу.
            </p>

            {/* CTA — призыв к действию */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-all"
                /*
                 *СТИЛЬ: Определите после исследования цветовой палитры!
                 *Варианты 2026:
                 *- Champagne Gold на тёмном фоне
                 *- White/cream на gradient background
                 *- Bold accent color
                 */
              >
                Действие (Рассчитать / Заказать / Узнать)
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* ОСНОВНОЙ КОНТЕНТ */}
        {/*
         * Структура зависит от типа страницы!
         *
         * ИССЛЕДОВАТЬ: Лучшие паттерны контента для вашего типа страницы
         * → web_search("best [page type] page layout 2026")
         */}
        {/* ================================================================ */}

        {/* ПРИМЕР: Секция с описанием */}
        {/* Адаптируйте под свои нужды! */}

        {/* ПРИМЕР: Сетка услуг/возможностей */}
        {/* Используйте компоненты из COMPONENTS-CATALOG.md */}

        {/* ПРИМЕР: Галерея работ */}
        {/* ImageLightbox или кастомная галерея */}

        {/* ПРИМЕР: Цены/тарифы */}
        {/* Исследуйте лучшие pricing page designs */}

        {/* ================================================================ */}
        {/* FAQ СЕКЦИЯ (рекомендуется для SEO!) */}
        {/* ================================================================ */}
        {/* Используйте Accordion из COMPONENTS-CATALOG.md */}
        {/* Вопросы должны быть РЕАЛЬНЫМИ вопросами клиентов! */}

        {/* ================================================================ */}
        {/* CTA СЕКЦИЯ (ОБЯЗАТЕЛЬНА в конце!) */}
        {/* ================================================================ */}
        <section className="py-20 md:py-28">
          {/*
           * Дизайн CTA зависит от общего стиля страницы
           *
           * Варианты:
           * - Dark секция со светлым текстом
           * - Gradient фон
           * - Фотофон с оверлеем
           * - Минималистичный белый/кремовый
           */}
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Готовы обсудить ваш праздник?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg opacity-80">
              Свяжитесь с нами для бесплатной консультации и расчёта
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 font-semibold transition-all"
            >
              Получить предложение
            </a>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}

// ============================================================================
// ПРИМЕЧАНИЯ ДЛЯ АГЕНТА:
//
// 1. Этот шаблон — ОТПРАВНАЯ ТОЧКА, не финальный дизайн!
// 2. Перед использованием — ИССЛЕДУЙТЕ тренды 2025-2026
// 3. Цвета/стили — определите на основе исследования
// 4. Если нашли ЛУЧШЕЕ решение — используйте ЕГО!
// 5. Обновите этот файл после улучшений
//
// РЕСУРСЫ ДЛЯ ИССЛЕДОВАНИЯ:
// - Awwards.com/hotel-restaurant — лучшие сайты мира
// - Dribbble.com/tags/catering — концепты
// - web_search("trends 2026") — актуальные тренды
//
// ============================================================================
