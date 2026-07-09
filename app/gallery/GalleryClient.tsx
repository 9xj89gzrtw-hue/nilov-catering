'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, galleryCategories } from '@/lib/data';

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const goNext = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % filtered.length }));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));
  }, [filtered.length]);

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

  const heights = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/3]'];

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 cursor-hover ${
                  activeCategory === cat.value
                    ? 'bg-gold/20 border border-gold/40 text-gold'
                    : 'text-cream-muted hover:text-cream border border-border hover:border-border-light'
                }`}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((img, i) => (
                <motion.button
                  key={img.id}
                  onClick={() => openLightbox(i)}
                  className="relative w-full break-inside-avoid overflow-hidden rounded-md group block cursor-hover"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                  aria-label={`Открыть: ${img.alt}`}
                >
                  <div className={`${heights[i % heights.length]} relative overflow-hidden`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[10px] uppercase tracking-widest text-cream/80 font-medium">
                        {img.categoryLabel}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
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
              transition={{ duration: 0.3 }}
            >
              <Image
                src={filtered[lightbox.index].src}
                alt={filtered[lightbox.index].alt}
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
              <span className="text-xs text-cream-muted">{filtered[lightbox.index].alt}</span>
              <span className="text-xs text-cream-muted/50 font-mono">{lightbox.index + 1} / {filtered.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}