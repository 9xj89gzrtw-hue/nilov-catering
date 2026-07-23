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
 * FoodPhoto — компонент фотографии блюда с анимацией в стиле Drinqit:
 * - Ken Burns: медленный zoom-in при появлении (4s ease-out)
 * - Hover-zoom: плавное увеличение при наведении (0.6s)
 * - Shimmer: эффект загрузки (blur → sharp)
 * - Lazy loading с native loading="lazy"
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
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-secondary ${RATIOS[aspectRatio]} ${className}`}
    >
      {/* Shimmer placeholder пока фото не загрузилось */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
      )}

      {/* Фото с Ken Burns + hover-zoom */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${animate ? 'group-hover:scale-110' : ''}`}
          style={{
            objectPosition,
            animation: animate && loaded
              ? 'kenBurns 4s ease-out both'
              : undefined,
          }}
        />
      )}

      {/* Overlay */}
      {overlay && loaded && (
        <div className="absolute inset-0 pointer-events-none">
          {overlay}
        </div>
      )}

      {/* Цена бейдж — по умолчанию в правом нижнем углу */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}
