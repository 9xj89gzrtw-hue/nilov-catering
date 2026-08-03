import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-foreground" aria-labelledby="cta-heading">
      <div className="container-site text-center max-w-xl mx-auto">
        <h2 id="cta-heading" className="font-heading text-3xl md:text-4xl font-medium mb-4 text-background">
          Готовы обсудить ваше событие?
        </h2>
        <p className="text-background/70 mb-8 text-lg">
          Ответьте на 3 вопроса — подберём меню и рассчитаем цену.
        </p>

        <Link
          href="/plan/helper"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all no-underline shadow-lg"
        >
          Подобрать меню →
        </Link>

        <p className="mt-6 text-sm text-background/60">
          Или позвоните: <a href={`tel:${SITE.phoneTel}`} className="text-background/80 font-medium underline underline-offset-2">{SITE.phone}</a>
        </p>
      </div>
    </section>
  );
}
