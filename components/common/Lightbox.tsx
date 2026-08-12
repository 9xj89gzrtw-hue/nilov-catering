'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () =>void;
}

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() =>setIndex(i =>(i + 1) % images.length), [images.length]);
  const prev = useCallback(() =>setIndex(i =>(i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', handleKey);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-line text-foreground hover:bg-secondary transition-colors touch-target"
        aria-label="Закрыть"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Previous button — only if more than 1 image */}
      {images.length >1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-line text-foreground hover:bg-secondary transition-colors touch-target"
          aria-label="Предыдущая фотография"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>
      )}

      {/* Image + caption */}
      <figure
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) =>e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          fetchPriority="high"
        />
        {current.caption && (
          <figcaption className="mt-4 text-center text-sm text-muted-foreground max-w-2xl">
            {current.caption}
            {images.length >1 && (
              <span className="ml-3 text-xs">·</span>
            )}
            {images.length >1 && (
              <span className="ml-3 text-xs">{index + 1} / {images.length}</span>
            )}
          </figcaption>
        )}
      </figure>

      {/* Next button */}
      {images.length >1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-card border border-line text-foreground hover:bg-secondary transition-colors touch-target"
          aria-label="Следующая фотография"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
