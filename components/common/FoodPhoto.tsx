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
 * ВАЖНО (W20 fix): shimmer overlay рендерится ТОЛЬКО после client-side
 * hydration (useEffect → mounted=true). В SSR overlay отсутствует — фото
 * видно сразу с лёгкой fade-in анимацией. После hydration если фото ещё
 * не загрузилось — показывается shimmer.
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

  return (
    <div
      className={`relative overflow-hidden bg-secondary ${RATIOS[aspectRatio]} ${className} group`}
    >
      {/* Фото рендерится ВСЕГДА — SSR + клиент. Lazy loading через native attribute. */}
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

      {/* Shimmer overlay только ПОСЛЕ client-side hydration и пока фото не загружилось.
          В SSR — фото видно сразу, без overlay. */}
      {mounted && !loaded && (
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
