'use client';

import { useState, useRef, useEffect } from 'react';

interface FoodPhotoProps {
  src: string;
  alt: string;
  className?: string;
  /** Анимация Drinqit: ken-burns zoom при появлении + hover-zoom */
  animate?: boolean;
  /** Размер */
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  /** object-position */
  objectPosition?: string;
  /** Показывать overlay с ценой */
  overlay?: React.ReactNode;
}

const RATIOS: Record<string, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
};

/**
 * FoodPhoto — компонент фотографии блюда с анимацией в стиле Drinqit.
 *
 * КЛЮЧЕВОЕ: <img> рендерится ВСЕГДА (в SSR тоже) — для SEO и LCP.
 *
 * W36: мигрирован на <picture> с AVIF + WebP + JPG fallback.
 * AVIF/WebP варианты генерируются из JPG через sharp при сборке.
 * Если AVIF/WebP файла нет — браузер использует JPG fallback.
 */
export default function FoodPhoto({
  src,
  alt,
  className = '',
  animate = true,
  aspectRatio = 'square',
  objectPosition = 'center 40%',
  overlay,
}: FoodPhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate AVIF and WebP paths from JPG src
  const avifSrc = src.replace(/\.jpg$|\.jpeg$/i, '.avif');
  const webpSrc = src.replace(/\.jpg$|\.jpeg$/i, '.webp');

  return (
    <div
      className={`relative overflow-hidden bg-secondary ${RATIOS[aspectRatio]} ${className} group`}
    >
      <picture>
        {/* AVIF — best compression, modern browsers. Responsive srcset. */}
        <source
          srcSet={`${avifSrc.replace(/\.avif$/, '-480.avif')} 480w, ${avifSrc.replace(/\.avif$/, '-768.avif')} 768w, ${avifSrc} 1920w`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          type="image/avif"
        />
        {/* WebP — good compression, wider support. Responsive srcset. */}
        <source
          srcSet={`${webpSrc.replace(/\.webp$/, '-480.webp')} 480w, ${webpSrc.replace(/\.webp$/, '-768.webp')} 768w, ${webpSrc} 1920w`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          type="image/webp"
        />
        {/* JPG fallback — universal */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover ${
            loaded ? 'opacity-100 z-10' : 'foodphoto-ssr-visible'
          } ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
          style={{
            objectPosition,
            animation: animate && loaded
              ? 'kenBurns 4s ease-out both'
              : undefined,
          }}
        />
      </picture>

      {/* Subtle placeholder только ПОСЛЕ client-side hydration и пока фото не загружилось.
          No animate-pulse — it looks like an eternal skeleton-loader. Just static bg. */}
      {mounted && !loaded && (
        <div className="absolute inset-0 bg-secondary pointer-events-none" />
      )}

      {/* Overlay */}
      {overlay && loaded && (
        <div className="absolute inset-0 pointer-events-none">
          {overlay}
        </div>
      )}

      {/* Градиент для читаемости текста */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}
