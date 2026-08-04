'use client';
import { useState, useRef, useEffect } from 'react';

interface FoodPhotoProps {
  src: string;
  alt: string;
  className?: string;
  animate?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  objectPosition?: string;
  overlay?: React.ReactNode;
  eager?: boolean;
}

const RATIOS: Record<string, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
};

export default function FoodPhoto({
  src, alt, className = '', animate = true, aspectRatio = 'square',
  objectPosition = 'center 40%', overlay, eager = false,
}: FoodPhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // SSR race condition fix: check if img already loaded before React hydrated
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Only generate AVIF/WebP srcset for JPG sources
  const isJpg = /\.jpe?g$/i.test(src);
  const avifSrc = isJpg ? src.replace(/\.jpe?g$/i, '.avif') : '';
  const webpSrc = isJpg ? src.replace(/\.jpe?g$/i, '.webp') : '';

  return (
    <div className={`relative overflow-hidden bg-secondary ${RATIOS[aspectRatio]} ${className} group`}>
      {isJpg ? (
        <picture>
          <source srcSet={`${avifSrc.replace(/\.avif$/, '-480.avif')} 480w, ${avifSrc.replace(/\.avif$/, '-768.avif')} 768w, ${avifSrc} 1920w`} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" type="image/avif" />
          <source srcSet={`${webpSrc.replace(/\.webp$/, '-480.webp')} 480w, ${webpSrc.replace(/\.webp$/, '-768.webp')} 768w, ${webpSrc} 1920w`} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" type="image/webp" />
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={800}
            height={600}
            loading={eager ? 'eager' : 'lazy'}
            decoding={eager ? 'sync' : 'async'}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover ${loaded ? 'opacity-100 z-10' : 'skeleton-shimmer'} ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
            style={{ objectPosition, animation: animate && loaded ? 'kenBurns 4s ease-out both' : undefined }}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={800}
          height={600}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover ${loaded ? 'opacity-100 z-10' : 'skeleton-shimmer'} ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
          style={{ objectPosition }}
        />
      )}
      {mounted && !loaded && <div className="absolute inset-0 skeleton-shimmer pointer-events-none" />}
      {overlay && loaded && <div className="absolute inset-0 pointer-events-none">{overlay}</div>}
      {loaded && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />}
    </div>
  );
}
