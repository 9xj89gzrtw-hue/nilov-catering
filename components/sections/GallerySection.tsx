'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/lib/data';

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const images = galleryImages.slice(0, 8);

  // Asymmetric grid: alternate between tall and short items
  const heights = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]'];

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const goNext = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % images.length }));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }));
  }, [images.length]);

  // Keyboard nav
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
      <section ref={ref} className="py-20 md:py-28" aria-label="Галерея">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Галерея</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
              Наши мероприятия
            </h2>
          </div>

          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {images.map((img, i) => (
              <motion.button
                key={img.id}
                onClick={() => openLightbox(i)}
                className="relative w-full break-inside-avoid overflow-hidden rounded-md group block"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                aria-label={`Открыть фото: ${img.alt}`}
              >
                <div className={`${heights[i]} relative overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-300" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[60] bg-[#0A0A0A]/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
            aria-label="Закрыть"
            autoFocus
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl mx-16 aspect-[4/3]">
            <Image
              src={images[lightbox.index].src}
              alt={images[lightbox.index].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={goNext}
            className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream transition-colors"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-cream-muted">
            {images[lightbox.index].alt} — {lightbox.index + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}