"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKey);
    // Lock scroll
    document.body.style.overflow = "hidden";
    // Move focus into dialog
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  // Focus trap
  const handleTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
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
      className="bg-background/95 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
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
        className="bg-card border-line text-foreground hover:bg-secondary touch-target absolute top-4 right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors"
        aria-label="Закрыть"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Previous button — only if more than 1 image */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="bg-card border-line text-foreground hover:bg-secondary touch-target absolute top-1/2 left-2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-colors sm:left-4"
          aria-label="Предыдущая фотография"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Image + caption */}
      <figure
        className="relative flex max-h-[85vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
          fetchPriority="high"
        />
        {current.caption && (
          <figcaption className="text-muted-foreground mt-4 max-w-2xl text-center text-sm">
            {current.caption}
            {images.length > 1 && <span className="ml-3 text-xs">·</span>}
            {images.length > 1 && (
              <span className="ml-3 text-xs">
                {index + 1} / {images.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="bg-card border-line text-foreground hover:bg-secondary touch-target absolute top-1/2 right-2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-colors sm:right-4"
          aria-label="Следующая фотография"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
