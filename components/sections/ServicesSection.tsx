'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data';
import MaskReveal from '@/components/effects/TextReveal';

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36" aria-label="Наши услуги">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <MaskReveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Услуги</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Форматы
              <br />
              <span className="text-cream/40">мероприятий</span>
            </h2>
          </MaskReveal>
        </div>

        {/* Bento grid — featured first card larger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className={`group relative overflow-hidden border border-border bg-card cursor-hover ${
                i === 0 ? 'md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 50vw'}
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Content overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 ${i === 0 ? 'lg:p-10' : ''}`}>
                {/* Service number */}
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold/60 font-mono mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`font-heading font-semibold text-cream mb-2 ${
                  i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm text-cream/50 leading-relaxed mb-5 ${
                  i === 0 ? 'max-w-sm line-clamp-3' : 'line-clamp-2'
                }`}>
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold/80 hover:text-gold transition-colors duration-300 font-medium group/link cursor-hover"
                  aria-label={`Подробнее: ${service.title}`}
                >
                  Подробнее
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}