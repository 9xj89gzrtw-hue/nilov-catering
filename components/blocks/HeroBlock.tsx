'use client';

import Link from 'next/link';

interface Props {
  subtitle?: string;
  disclaimer?: string;
}

export default function HeroBlock({ subtitle, disclaimer }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/images/real/wedding-banquet.avif" type="image/avif" />
          <source srcSet="/images/real/wedding-banquet.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/wedding-banquet.jpg"
            alt="Свадебный банкет — кейтеринг NiloV"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl py-32">
        <h1 className="font-heading text-4xl md:text-6xl text-white mb-4 leading-[1.15]" style={{ fontWeight: 500 }}>
          Кейтеринг в Санкт-Петербурге
        </h1>

        <p className="text-white/90 text-lg md:text-xl mb-8">
          От 390 ₽/гость · 17 лет · 3000+ событий
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/plan/helper"
            className="rounded-full bg-white text-black px-8 py-3.5 text-base font-medium hover:bg-white/90 transition-all no-underline"
          >
            Подобрать меню
          </Link>
          <a
            href="tel:+78129195911"
            className="rounded-full border border-white/50 text-white px-8 py-3.5 text-base font-medium hover:bg-white/10 transition-all no-underline"
          >
            +7 (812) 919-59-11
          </a>
        </div>
      </div>
    </section>
  );
}
