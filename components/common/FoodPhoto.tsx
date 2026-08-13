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

// Beautiful gradient combinations for fallback placeholders
const GRADIENTS = [
  'from-amber-900 via-yellow-800 to-orange-900',
  'from-emerald-900 via-teal-800 to-green-900',
  'from-rose-900 via-pink-800 to-red-900',
  'from-violet-900 via-purple-800 to-indigo-900',
  'from-blue-900 via-cyan-800 to-teal-900',
  'from-stone-900 via-neutral-800 to-zinc-900',
];

// Get consistent gradient based on alt text
function getGradientClass(alt: string): string {
  let hash = 0;
  for (let i = 0; i < alt.length; i++) {
    hash = ((hash << 5) - hash) + alt.charCodeAt(i);
    hash |= 0;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

// Camera/Image icon SVG component
function ImagePlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function FoodPhoto({
  src, alt, className = '', animate = true, aspectRatio = 'square',
  objectPosition = 'center 40%', overlay, eager = false,
}: FoodPhotoProps) {
  // W85: Start with loaded=true so photo is visible immediately (no skeleton flash)
  // Skeleton only shows if onError fires (photo failed to load)
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // SSR race condition fix: check if img already loaded before React hydrated
  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setLoaded(true);
        setError(false);
      } else if (imgRef.current.naturalWidth === 0 && imgRef.current.complete) {
        setError(true);
      }
    }
  }, [src]);

  // Only generate AVIF/WebP srcset for JPG sources
  const isJpg = /\.jpe?g$/i.test(src);
  const avifSrc = isJpg ? src.replace(/\.jpe?g$/i, '.avif') : '';
  const webpSrc = isJpg ? src.replace(/\.jpe?g$/i, '.webp') : '';

  const handleLoad = () => { setLoaded(true); setError(false); };
  const handleError = () => { setError(true); setLoaded(true); };

  const gradientClass = getGradientClass(alt);

  return (
    <div className={`relative overflow-hidden bg-card ${RATIOS[aspectRatio]} ${className} group`}>
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
            onLoad={handleLoad}
            onError={handleError}
            className={`absolute inset-0 w-full h-full object-cover ${error ? 'opacity-0' : 'opacity-100 z-10'} ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
            style={{ objectPosition, animation: animate && loaded && !error ? 'kenBurns 4s ease-out both' : undefined }}
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
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover ${error ? 'opacity-0' : 'opacity-100 z-10'} ${animate ? 'group-hover:scale-110 transition-transform duration-700' : ''}`}
          style={{ objectPosition }}
        />
      )}
      
      {/* Beautiful gradient placeholder with icon when image fails to load */}
      {mounted && error && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center pointer-events-none z-20`}>
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
            <ImagePlaceholderIcon className="w-7 h-7 md:w-8 md:h-8 text-white/70" />
          </div>
          <span className="text-xs md:text-sm font-medium text-white/60 text-center px-4 max-w-[200px] line-clamp-2 drop-shadow-lg">
            {alt || 'Изображение'}
          </span>
          {/* Decorative elements */}
          <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
        </div>
      )}
      
      {overlay && loaded && !error && <div className="absolute inset-0 pointer-events-none">{overlay}</div>}
      {loaded && !error && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />}
    </div>
  );
}
