'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { menuItems } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import MaskReveal from '@/components/effects/TextReveal';

export default function MenuPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const highlights = menuItems.filter((item) => item.isPopular).slice(0, 6);

  return (
    <section ref={ref} className="py-24 md:py-36" aria-label="Избранные блюда">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20">
          <div>
            <MaskReveal>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Меню</p>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
                Фирменные
                <br />
                <span className="text-cream/40">блюда</span>
              </h2>
            </MaskReveal>
          </div>
          <MaskReveal delay={0.2}>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-widest text-gold hover:text-gold-light transition-colors duration-300 font-medium shrink-0 group cursor-hover"
            >
              Всё меню
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </MaskReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              className="group bg-card border border-border overflow-hidden cursor-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-cream-muted line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gold/80 whitespace-nowrap mt-0.5">
                    {item.price.toLocaleString('ru-RU')} &#8381;
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mt-3">
                  {item.isVegetarian && (
                    <span className="text-[9px] uppercase tracking-wider text-cream-muted/60 border border-border px-2 py-0.5">
                      Вегетарианское
                    </span>
                  )}
                  {item.calories > 0 && (
                    <span className="text-[9px] uppercase tracking-wider text-cream-muted/60 border border-border px-2 py-0.5">
                      {item.calories} ккал
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}