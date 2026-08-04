'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WowCase() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="wowcase-heading">
      <div className="container-site max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-line bg-card shadow-lg"
        >
          <div className="grid md:grid-cols-2">
            {/* Photo */}
            <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden bg-secondary">
              <picture>
                <source srcSet="/images/real/wedding-banquet-480.avif 480w, /images/real/wedding-banquet-768.avif 768w, /images/real/wedding-banquet.avif 1920w" sizes="(max-width: 768px) 100vw, 50vw" type="image/avif" />
                <source srcSet="/images/real/wedding-banquet-480.webp 480w, /images/real/wedding-banquet-768.webp 768w, /images/real/wedding-banquet.webp 1920w" sizes="(max-width: 768px) 100vw, 50vw" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/real/wedding-banquet.jpg"
                  alt="Корпоративный фестиваль 800 человек — кейтеринг NiloV"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 md:bg-gradient-to-r md:from-transparent md:to-card/30" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">Избранный кейс</p>
              <h2 id="wowcase-heading" className="font-heading text-2xl md:text-4xl mb-3" style={{ fontWeight: 500 }}>
                Фестиваль на 800 гостей
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Двухдневный корпоративный фестиваль в конгресс-холле «Экспофорум». Полный банкет-сервис:
                3 выездные кухни, 40 официантов, 4 бармена, 2 сомелье. Меню из 85 блюд — от канапе до авторских десертов.
                SLA ±15 минут, страхование ответственности 30 млн ₽.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { v: '800', l: 'гостей в день' },
                  { v: '2',   l: 'дня фестиваля' },
                  { v: '12',  l: 'шоу-станций' },
                ].map((s) => (
                  <div key={s.l} className="text-center md:text-left">
                    <p className="font-heading text-3xl md:text-4xl text-gold-text" style={{ fontWeight: 500 }}>{s.v}</p>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/events/recap"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-text hover:underline no-underline self-start"
              >
                Смотреть все кейсы и видео
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
