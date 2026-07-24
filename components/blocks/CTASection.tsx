import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-secondary" aria-labelledby="cta-heading">
      <div className="container-site text-center max-w-xl mx-auto">
        <h2 id="cta-heading" className="mb-3">Готовы спланировать событие?</h2>
        <p className="text-muted-foreground mb-8 text-balance">
          Оставьте заявку — мы подберём решение под ваш бюджет. Перезвоним за 15 минут.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            href="/plan/constructor"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Спланировать событие
          </Link>
          <Link
            href="/plan/calculator"
            className="inline-flex items-center gap-2 rounded-lg border border-gold-text px-6 py-3.5 text-sm font-medium text-gold-text hover:bg-gold-tint transition-colors"
          >
            Рассчитать цену
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Или позвоните: <a href={`tel:${SITE.phoneTel}`} className="text-foreground font-medium hover:text-gold-text transition-colors">{SITE.phone}</a>
        </p>
      </div>
    </section>
  );
}