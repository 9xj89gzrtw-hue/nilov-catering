import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary" aria-labelledby="cta-heading">
      <div className="container-site text-center max-w-xl mx-auto">
        <h2 id="cta-heading" className="font-heading text-3xl md:text-4xl font-medium mb-4 text-primary-foreground">
          Рассчитаем стоимость за 2 минуты
        </h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">
          Ответьте на 3 вопроса — подберём меню и рассчитаем цену. Без звонка, без регистрации.
        </p>

        <Link
          href="/plan/helper"
          className="inline-flex items-center gap-2 rounded-lg bg-background text-foreground px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 no-underline"
        >
          Рассчитать стоимость →
        </Link>

        <p className="mt-8 text-sm text-primary-foreground/60">
          Или позвоните: <a href={`tel:${SITE.phoneTel}`} className="text-primary-foreground font-medium underline underline-offset-2 hover:no-underline">{SITE.phone}</a>
        </p>
      </div>
    </section>
  );
}
