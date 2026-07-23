import Link from 'next/link';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

export default function WhyUs() {
  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="why-us-heading">
      <div className="container-site max-w-xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-3">О нас</p>
        <h2 id="why-us-heading" className="mb-4">Почему NiloV Catering</h2>
        <p className="text-muted-foreground mb-8 text-balance text-sm md:text-base">
          Начали в 2007 году. Дмитрий Нилов собрал команду из лучших ресторанов Петербурга. Сегодня — 40+ человек, 3 000+ событий. От ужина на 10 до банкета на 500.
        </p>

        {/* Stats row — compact */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
          {[
            { v: 19, s: '+', l: 'лет', st: 'verified' as const },
            { v: 3000, s: '+', l: 'событий', st: 'verified' as const },
            { v: 98, s: '%', l: 'возврат', st: 'verified' as const },
            { v: 40, s: '+', l: 'в команде', st: 'verified' as const },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-xl md:text-2xl font-heading font-bold text-gold-text">
                <AnimatedCounter value={s.v} suffix={s.s} />
              </div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <Link href="/why-us" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform">
          Узнать больше
        </Link>
      </div>
    </section>
  );
}
