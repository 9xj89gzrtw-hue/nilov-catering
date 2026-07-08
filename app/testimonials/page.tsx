import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { testimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Отзывы клиентов Нилов Кейтеринг — свадьбы, корпоративы и частные мероприятия.",
};

export default function TestimonialsPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Отзывы" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Отзывы
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Более 847 довольных клиентов. Вот некоторые из их историй.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="relative bg-card border border-border rounded-md p-6 md:p-8"
              >
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="text-sm text-cream/80 leading-relaxed mt-6">
                  {t.text}
                </p>
                <footer className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <cite className="not-italic">
                    <span className="block text-sm font-medium text-cream">{t.name}</span>
                    <span className="block text-xs text-cream-muted mt-0.5">{t.event}</span>
                  </cite>
                  <time className="text-xs text-cream-muted" dateTime={t.date}>
                    {new Date(t.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}