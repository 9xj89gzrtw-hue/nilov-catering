"use client";
import { useState, useRef, useEffect } from "react";

interface FoodPhotoProps {
  src: string;
  alt: string;
  className?: string;
  animate?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  objectPosition?: string;
  overlay?: React.ReactNode;
  eager?: boolean;
}

// Responsive image sizes for food photos
// Breakpoints: mobile (768px), tablet (1024px), desktop (default)
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;
const FOOD_PHOTO_SIZES = `(max-width: ${MOBILE_BREAKPOINT}px) 50vw, (max-width: ${TABLET_BREAKPOINT}px) 33vw, 25vw`;

// SrcSet generators for AVIF/WebP formats
const getAvifSrcSet = (_src: string, avifSrc: string) =>
  `${avifSrc.replace(/\.avif$/, "-480.avif")} 480w, ${avifSrc.replace(/\.avif$/, "-768.avif")} 768w, ${avifSrc} 1920w`;

const getWebpSrcSet = (_src: string, webpSrc: string) =>
  `${webpSrc.replace(/\.webp$/, "-480.webp")} 480w, ${webpSrc.replace(/\.webp$/, "-768.webp")} 768w, ${webpSrc} 1920w`;

// Aspect ratio mapping for Tailwind classes
const ASPECT_RATIOS: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[4/3]",
};

// Beautiful gradient combinations for fallback placeholders
const GRADIENTS = [
  "from-amber-900 via-yellow-800 to-orange-900",
  "from-emerald-900 via-teal-800 to-green-900",
  "from-rose-900 via-pink-800 to-red-900",
  "from-violet-900 via-purple-800 to-indigo-900",
  "from-blue-900 via-cyan-800 to-teal-900",
  "from-stone-900 via-neutral-800 to-zinc-900",
];

// Get consistent gradient based on alt text
function getGradientClass(alt: string): string {
  let hash = 0;
  for (let i = 0; i < alt.length; i++) {
    hash = (hash << 5) - hash + alt.charCodeAt(i);
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
  src,
  alt,
  className = "",
  animate = true,
  aspectRatio = "square",
  objectPosition = "center 40%",
  overlay,
  eager = false,
}: FoodPhotoProps) {
  // W85: Start with loaded=true so photo is visible immediately (no skeleton flash)
  // Skeleton only shows if onError fires (photo failed to load)
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const gradientClass = getGradientClass(alt);

  return (
    <div
      className={`bg-card relative overflow-hidden ${ASPECT_RATIOS[aspectRatio]} ${className} group`}
    >
      {/* Use plain <img> for all sources — many gallery images lack -480/-768
          responsive variants, which caused 404s in the previous <picture> srcSet.
          Format conversion (AVIF/WebP) and size variants are disabled to ensure
          every image loads reliably. Lazy-loading + async decoding preserved. */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={800}
        height={600}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 h-full w-full object-cover ${error ? "opacity-0" : "z-10 opacity-100"} ${animate ? "transition-transform duration-700 group-hover:scale-110" : ""}`}
        style={{
          objectPosition,
          animation: animate && loaded && !error ? "kenBurns 4s ease-out both" : undefined,
        }}
      />

      {/* Beautiful gradient placeholder with icon when image fails to load */}
      {mounted && error && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientClass} pointer-events-none z-20 flex flex-col items-center justify-center`}
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm md:h-16 md:w-16">
            <ImagePlaceholderIcon className="h-7 w-7 text-white/70 md:h-8 md:w-8" />
          </div>
          <span className="line-clamp-2 max-w-[200px] px-4 text-center text-xs font-medium text-white/60 drop-shadow-lg md:text-sm">
            {alt || "Изображение"}
          </span>
          {/* Decorative elements */}
          <div className="absolute top-3 right-3 h-16 w-16 rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-4 left-4 h-20 w-20 rounded-full bg-white/5 blur-2xl" />
        </div>
      )}

      {overlay && loaded && !error && (
        <div className="pointer-events-none absolute inset-0">{overlay}</div>
      )}
      {loaded && !error && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      )}
    </div>
  );
}
