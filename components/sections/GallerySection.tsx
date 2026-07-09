'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/lib/data';
import MaskReveal from '@/components/effects/TextReveal';

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const images = galleryImages.slice(0, 9);

  const heights = [
    'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]',
    'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]'
  ];

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const goNext = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % images.length }));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }));
  }, [images.length]);

  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, goNext, goPrev]);

  return (
    <>
      <section ref={ref} className="py-24 md:py-36" aria-label="Галерея">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20">
            <div>
              <MaskReveal>
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Галерея</p>
              </MaskReveal>
              <MaskReveal delay={0.1}>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
                  Наши
                  <br />
                  <span className="text-cream/40">мероприятия</span>
                </h2>
              </MaskReveal>
            </div>
            <MaskReveal delay={0.2}>
              <p className="text-sm text-cream-muted max-w-sm leading-relaxed">
                Каждое событие — уникальная история. Вот несколько моментов, которые мы создали вместе с нашими клиентами.
              </p>
            </MaskReveal>
          </div>

          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {images.map((img, i) => (
              <motion.button
                key={img.id}
                onClick={() => openLightbox(i)}
                className="relative w-full break-inside-avoid overflow-hidden group block cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                aria-label={`Открыть фото: ${img.alt}`}
              >
                <div className={`${heights[i]} relative overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-[#0A0A0A] transition-opacity duration-500 ${
                    hoveredIdx === i ? 'opacity-50' : 'opacity-0'
                  }`} />
                  {/* Category label */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                    hoveredIdx === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <span className="text-[10px] uppercase tracking-widest text-cream/80 font-medium">
                      {img.categoryLabel}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#0A0A0A]/95 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фотографии"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-cream/70 hover:text-cream transition-colors cursor-hover"
              aria-label="Закрыть"
              autoFocus
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors cursor-hover"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              className="relative w-full max-w-4xl mx-16 aspect-[4/3]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={images[lightbox.index].src}
                alt={images[lightbox.index].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              onClick={goNext}
              className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors cursor-hover"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <span className="text-xs text-cream-muted">
                {images[lightbox.index].alt}
              </span>
              <span className="text-xs text-cream-muted/50 font-mono">
                {lightbox.index + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}