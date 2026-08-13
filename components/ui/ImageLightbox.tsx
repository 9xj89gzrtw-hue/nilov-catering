"use client";

/**
 * IMAGE LIGHTBOX GALLERY
 *
 * Использует yet-another-react-lightbox для красивой галереи
 * Клик по изображению открывает полноэкранный просмотр с зумом
 *
 * Пример:
 * <ImageLightbox
 *   images={[
 *     { src: '/images/photo1.jpg', alt: 'Описание' },
 *     { src: '/images/photo2.jpg', alt: 'Описание' },
 *   ]}
 * />
 */

import { useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  /** Показывать превью сеткой или нет */
  showGrid?: boolean;
  /** Колонки в grid */
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ImageLightbox({
  images,
  showGrid = true,
  columns = 3,
  className = "",
}: ImageLightboxProps) {
  const [index, setIndex] = useState(-1);

  const openLightbox = useCallback((idx: number) => setIndex(idx), []);
  const closeLightbox = useCallback(() => setIndex(-1), []);

  // Преобразуем для lightbox
  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width || 1920,
    height: img.height || 1080,
  }));

  if (!showGrid) {
    return (
      <>
        {/* Триггеры - скрытые изображения */}
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className="inline-block"
            aria-label={`Открыть изображение: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="cursor-pointer rounded-lg transition-opacity hover:opacity-90"
              loading="lazy"
            />
          </button>
        ))}

        {/* Lightbox */}
        <Lightbox index={index} slides={slides} open={index >= 0} close={closeLightbox} />
      </>
    );
  }

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`image-lightbox ${className}`}>
      {/* Grid превью */}
      <div className={`grid ${gridCols[columns]} gap-2`}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group focus-visible:ring-primary relative aspect-[4/3] overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2"
            aria-label={`Открыть изображение: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay иконка на hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <svg
                className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox index={index} slides={slides} open={index >= 0} close={closeLightbox} />
    </div>
  );
}

export default ImageLightbox;
