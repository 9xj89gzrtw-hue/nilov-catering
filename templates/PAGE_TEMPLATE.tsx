/**
 * PAGE TEMPLATE FOR SUBPAGES
 *
 * Используйте этот шаблон для создания новых подстраниц.
 * Это гарантирует что все страницы будут иметь:
 * - Единый layout
 * - Правильную структуру
 * - SEO метаданные
 * - Error boundary
 * - Корректные импорты
 */

// ============================================
// FILE: app/[section]/[page-name]/page.tsx
// ============================================

import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ============================================
// 1. METADATA (SEO) - ОБЯЗАТЕЛЬНО для каждой страницы
// ============================================
export const metadata: Metadata = {
  title: "Название страницы | Нилов Кейтеринг",
  description: "Описание страницы для SEO (150-300 символов)",
  openGraph: {
    title: "Название страницы",
    description: "Описание для соцсетей",
    type: "website",
  },
};

// ============================================
// 2. MAIN PAGE COMPONENT
// ============================================
export default function PageNamePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/*
         * СТРУКТУРА ПОДСТРАНИЦЫ:
         *
         * 1. Hero Section (опционально)
         * 2. Основной контент
         * 3. CTA секция (призыв к действию)
         * 4. Связанные разделы/ссылки
         */}

        {/* ===== HERO SECTION ===== */}
        <section className="from-primary/5 relative bg-gradient-to-b to-transparent py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Заголовок H1 страницы
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              Подзаголовок с описанием что на этой странице. Должен быть уникальным и информативным.
            </p>
          </div>
        </section>

        {/* ===== ОСНОВНОЙ КОНТЕНТ ===== */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              {/* Введение */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Текст контента страницы. Используйте семантическую разметку. Каждый параграф
                  должен нести смысл.
                </p>
              </div>

              {/* Карточки / Сетка (если нужно) */}
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Карточка 1", desc: "Описание" },
                  { title: "Карточка 2", desc: "Описание" },
                  { title: "Карточка 3", desc: "Описание" },
                ].map((item, i) => (
                  <article
                    key={i}
                    className="bg-card rounded-xl border p-6 transition-shadow hover:shadow-lg"
                  >
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Готовы заказать?</h2>
            <p className="mb-8 opacity-90">Свяжитесь с нами для расчёта стоимости</p>
            <a
              href="/contact"
              className="bg-background text-foreground hover:bg-background/90 inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors"
            >
              Связаться с нами
            </a>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}

// ============================================
// CHECKLIST ПЕРЕД ЗАВЕРШЕНИЕМ:
// ============================================
/*
✓ Metadata заполнены (title, description, OG)
✓ H1 заголовок уникальный и информативный
✓ Семантические теги (main, section, article)
✓ Адаптивная вёрстка (mobile-first)
✓ ErrorBoundary обёртка
✓ CTA секция в конце
✓ Правильные пути к ссылкам (/contact, /pricing и т.д.)
✓ Alt тексты для изображений
✓ Цвета из design system (primary, muted, etc.)
✓ Нет хардкодных значений цветов (#fff → bg-white)
*/
