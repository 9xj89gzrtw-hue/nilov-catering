'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
    // Move focus into dialog
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  // Focus trap
  const handleTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const current = images[index];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      onClick={onClose}
      onKeyDown={handleTab}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
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
