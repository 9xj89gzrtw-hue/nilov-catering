'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { menuItems } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function MenuPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const highlights = menuItems.filter((item) => item.isPopular).slice(0, 6);

  return (
    <section ref={ref} className="py-20 md:py-28" aria-label="Избранные блюда">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Меню</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
              Фирменные блюда
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors duration-200 font-medium shrink-0"
          >
            Всё меню
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              className="group bg-card border border-border rounded-md overflow-hidden card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-cream truncate">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-cream-muted line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gold whitespace-nowrap">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}