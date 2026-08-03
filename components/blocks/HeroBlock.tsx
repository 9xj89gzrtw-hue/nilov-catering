'use client';

import Link from 'next/link';

/**
 * Hero — world-class catering layout (Great Performances / Wolfgang Puck style).
 * Full-screen atmospheric food photo, dark gradient overlay, centered text.
 * Elegant Cormorant serif H1 with gold italic accent. Single primary CTA.
 *
 * Replaces previous split layout (text on white + blurry autoplay video).
 */
interface Props {
  subtitle?: string;
  disclaimer?: string;
}

export default function HeroBlock({ subtitle, disclaimer }: Props) {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Background photo — full screen */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/images/real/wedding-banquet.avif" type="image/avif" />
          <source srcSet="/images/real/wedding-banquet.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/wedding-banquet.jpg"
            alt="Свадебный банкет — сервировка стола"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Dark gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.65) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 max-w-3xl py-32">
        <p className="text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 animate-fade-up">
          Санкт-Петербург · с 2007
        </p>

        <h1
          className="font-heading text-5xl md:text-7xl text-white mb-6 leading-[1.1] animate-fade-up"
          style={{ fontWeight: 500, animationDelay: '0.1s' }}
        >
          Кейтеринг
          <br />
          <span className="italic" style={{ color: '#C5A059' }}>
            от фермы к столу
          </span>
        </h1>

        <p
          className="text-white/85 text-base md:text-xl mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {subtitle ||
            '17 лет создаём события в Петербурге. 3000+ банкетов, фуршетов, свадеб. Халяль-сертификат. 124 блюда с контролем 14 аллергенов.'}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <Link
            href="/plan/helper"
            className="rounded-full bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition-all no-underline shadow-lg"
          >
            Подобрать меню →
          </Link>
          <a
            href="tel:+78129195911"
            className="rounded-full border border-white/40 text-white px-8 py-4 text-base font-medium hover:bg-white/10 transition-all no-underline"
          >
            +7 (812) 919-59-11
          </a>
        </div>

        {/* Price anchor */}
        <p
          className="text-white/55 text-sm mt-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {disclaimer || 'От 390 ₽/гость · Фуршет · Банкет · Кофе-брейк'}
        </p>
      </div>
    </section>
  );
}
