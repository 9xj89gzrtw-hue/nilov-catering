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
 * Анимации (ken-burns, shimmer, hover-zoom) работают поверх через CSS-классы.
 *
 * ПРОБЛЕМА W14→W18: фото имели opacity-0 в SSR без JS — блогеры и скриншот-боты
 * видели серые placeholder'ы вместо еды. ФИКС: используем CSS animation
 * (fade-in 0.6s), которая работает даже без JS hydration. Если JS загрузился —
 * onLoad переключает на opacity-100 мгновенно (без анимации).
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

  return (
    <div
      className={`relative overflow-hidden bg-secondary ${RATIOS[aspectRatio]} ${className} group`}
    >
      {/* Фото рендерится ВСЕГДА — SSR + клиент. Lazy loading через native attribute. */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover ${
          loaded ? 'opacity-100' : 'foodphoto-ssr-visible'
        } ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
        style={{
          objectPosition,
          animation: animate && loaded
            ? 'kenBurns 4s ease-out both'
            : undefined,
        }}
      />

      {/* Shimmer placeholder только пока фото загружается (поверх фото) */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-muted/80 to-secondary/80 animate-pulse pointer-events-none" />
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
