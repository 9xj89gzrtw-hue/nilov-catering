import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary" aria-labelledby="cta-heading">
      <div className="container-site text-center max-w-xl mx-auto">
        <h2 id="cta-heading" className="font-heading text-3xl md:text-4xl font-medium mb-4 text-primary-foreground">
          Рассчитаем стоимость за 2 минуты
        </h2>
        {/* A11y: subtitle uses full-opacity primary-foreground on gold = 5.71:1 AA.
            Previous /80 opacity gave 4.22:1 (FAIL). */}
        <p className="text-primary-foreground mb-8 text-lg">
          Ответьте на 3 вопроса — подберём меню и рассчитаем цену. Без звонка, без регистрации.
        </p>

        <Link
          href="/plan/helper"
          className="inline-flex items-center gap-2 rounded-lg bg-background text-foreground px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 no-underline"
        >
          Рассчитать стоимость →
        </Link>

        {/* A11y: /90 opacity = 4.95:1 AA pass on gold. Previous /60 = 2.89:1 (FAIL). */}
        <p className="mt-8 text-sm text-primary-foreground/90">
          Или позвоните: <a href={`tel:${SITE.phoneTel}`} className="text-primary-foreground font-medium underline underline-offset-2 hover:no-underline">{SITE.phone}</a>
        </p>
      </div>
    </section>
  );
}
