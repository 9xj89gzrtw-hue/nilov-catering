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
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-burgundy text-cream'
                    : 'bg-muted text-cream-muted hover:text-cream border border-border'
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
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((img, i) => (
                <motion.button
                  key={img.id}
                  onClick={() => openLightbox(i)}
                  className="relative w-full break-inside-avoid overflow-hidden rounded-md group block"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  aria-label={`Открыть: ${img.alt}`}
                >
                  <div className={`${heights[i % heights.length]} relative overflow-hidden`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-cream bg-[#0A0A0A]/60 backdrop-blur-sm px-2 py-1 rounded-sm">
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
              src={filtered[lightbox.index].src}
              alt={filtered[lightbox.index].alt}
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
            {filtered[lightbox.index].alt} — {lightbox.index + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}