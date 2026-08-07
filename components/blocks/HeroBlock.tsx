import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/data';

/**
 * HeroBlock — asymmetric editorial split.
 *
 * Design director audit: "asymmetric 12-col split. Left 5 cols = solid ivory panel with type.
 * Right 7 cols = ONE art-directed full-bleed banquet photograph, NO overlay gradients."
 *
 * Performance audit: "Hero <h1> uses motion.* initial={{opacity:0}} — LCP text hidden until
 * framer-motion hydrates." Fixed: pure HTML, CSS animation only.
 *
 * Copy audit: "headline 'Ресторан, который приезжает к вам' is metaphor cold visitors decode
 * as food delivery." Fixed: concrete headline with event types.
 *
 * UX audit: "Hero price 'от 390 ₽' is misleading bait-and-switch." Fixed: real price ladder.
 */

const STATS_INLINE = '19 лет в Санкт-Петербурге · 4.8/5 по 27 отзывам · 124 блюда в меню';

export default function HeroBlock() {
  return (
    <section className="relative bg-background" aria-labelledby="hero-heading">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[88vh] py-20 md:py-24">
          {/* Left — type column (5 cols) */}
          <div className="md:col-span-5 order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-text font-semibold mb-4">
              Кейтеринг в Санкт-Петербурге с 2007 года
            </p>

            <h1
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05] mb-5"
              style={{ fontWeight: 500 }}
            >
              Кейтеринг от шефа Дмитрия Нилова
            </h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-lg">
              Готовим на вашей площадке, не везём разогретое. Свадьбы, корпоративы, дни рождения в Петербурге —
              с 2007 года. Фуршет от 2 450 ₽, банкет от 3 950 ₽ — за гостя, меню и официанты включены.
            </p>

            {/* Price ladder — answers "how much?" in 3 seconds */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center rounded-full bg-card border border-line px-3 py-1.5 text-xs font-medium text-foreground">
                Фуршет <span className="text-gold-text ml-1.5">2 450 ₽/гость</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-card border border-line px-3 py-1.5 text-xs font-medium text-foreground">
                Банкет <span className="text-gold-text ml-1.5">3 950 ₽/гость</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-card border border-line px-3 py-1.5 text-xs font-medium text-foreground">
                Кофе-брейк <span className="text-gold-text ml-1.5">390 ₽/гость</span>
              </span>
            </div>

            {/* Primary CTA — single action */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
              <Link
                href="/plan/helper"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-base font-semibold hover:bg-primary/90 transition-colors no-underline shadow-sm min-w-[240px]"
              >
                Узнать цену — 3 вопроса, 30 секунд
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-7 py-4 text-base font-semibold transition-colors no-underline min-w-[180px] shadow-sm"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            {/* Trust strip — single line, not 4-col grid */}
            <p className="text-sm text-muted-foreground">
              {STATS_INLINE}
            </p>
          </div>

          {/* Right — photo column (7 cols) */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-2xl overflow-hidden bg-secondary">
              <picture>
                <source srcSet="/images/real/wedding-banquet-480.avif 480w, /images/real/wedding-banquet-768.avif 768w, /images/real/wedding-banquet.avif 1920w" sizes="(max-width: 768px) 100vw, 58vw" type="image/avif" />
                <source srcSet="/images/real/wedding-banquet-480.webp 480w, /images/real/wedding-banquet-768.webp 768w, /images/real/wedding-banquet.webp 1920w" sizes="(max-width: 768px) 100vw, 58vw" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/real/wedding-banquet.jpg"
                  alt="Свадебный банкет — кейтеринг NiloV в Санкт-Петербурге"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              {/* Photo caption — chef attribution */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-tint flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold-text" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path d="M11 29 L11 11 L29 29 L29 11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">Шеф Дмитрий Нилов</p>
                  <p className="text-xs text-muted-foreground">19 лет на кухне Петербурга</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
