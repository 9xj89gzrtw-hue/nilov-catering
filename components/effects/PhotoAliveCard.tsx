'use client';

import { useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';

type FrameShape = 'circle' | 'diamond' | 'rounded-xl';

interface Props {
  posterSrc: string;
  videoSrc?: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
  overlay?: React.ReactNode;
  href?: string;
  frameShape?: FrameShape;
  objectPosition?: string;
  blurDataURL?: string;
}

const RATIOS = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
};

const FRAME_CLASSES: Record<FrameShape, string> = {
  'rounded-xl': 'rounded-xl',
  circle: 'rounded-full',
  diamond: 'rounded-none', // clip-path handles shape
};

export default function PhotoAliveCard({
  posterSrc,
  videoSrc,
  alt,
  caption,
  aspectRatio = 'square',
  className = '',
  overlay,
  href,
  frameShape = 'rounded-xl',
  objectPosition = 'center 40%',
  blurDataURL,
}: Props) {
  const reducedMotion = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onHoverStart = useCallback(() => {
    if (!videoSrc || reducedMotion) return;
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc, reducedMotion]);

  const onHoverEnd = useCallback(() => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const isDiamond = frameShape === 'diamond';
  const frameClass = FRAME_CLASSES[frameShape];

  const mediaStyle: React.CSSProperties = {
    objectPosition,
    ...(isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : {}),
  };

  const content = (
    <div
      className={`relative overflow-hidden bg-card border border-line group ${frameClass} ${RATIOS[aspectRatio]} ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={videoSrc && !reducedMotion ? onHoverStart : undefined}
      onTouchEnd={videoSrc && !reducedMotion ? onHoverEnd : undefined}
      style={isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : {}}
    >
      {/* Blur placeholder - tiny base64 data URL, no optimization needed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-[20px] scale-110"
          style={mediaStyle}
        />
      )}

      {/* Poster */}
      <motion.img
        src={posterSrc}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-350"
        style={mediaStyle}
        animate={{ opacity: showVideo && videoLoaded ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Video layer */}
      {videoSrc && !reducedMotion && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-350"
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            ...mediaStyle,
            opacity: showVideo && videoLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Ken Burns fallback when no video or reduced motion */}
      {(!videoSrc || reducedMotion) && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${posterSrc})`,
            ...mediaStyle,
          }}
          whileHover={reducedMotion ? {} : { scale: 1.08 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          role="img"
          aria-label={alt}
        />
      )}

      {/* Gold frame accent for circle/diamond */}
      {(frameShape === 'circle' || frameShape === 'diamond') && (
        <div
          className="absolute inset-0 border-[1px] border-gold/50 pointer-events-none"
          style={isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : { borderRadius: '50%' }}
        />
      )}

      {/* Overlay + Caption */}
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
          {overlay}
        </div>
      )}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-xs text-white font-medium">{caption}</p>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : {}}
      >
        {content}
      </a>
    );
  }

  return content;
}

/** Pure CSS Ken Burns variant — lighter, no JS */
export function KenBurnsCard({
  src,
  alt,
  caption,
  aspectRatio = 'square',
  className = '',
  frameShape = 'rounded-xl',
  objectPosition = 'center 40%',
}: {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
  frameShape?: FrameShape;
  objectPosition?: string;
}) {
  const isDiamond = frameShape === 'diamond';
  const frameClass = FRAME_CLASSES[frameShape];

  return (
    <div
      className={`relative overflow-hidden bg-card border border-line group ${frameClass} ${RATIOS[aspectRatio]} ${className}`}
      style={isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : {}}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: objectPosition,
          ...(isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : {}),
        }}
        role="img"
        aria-label={alt}
      />
      {(frameShape === 'circle' || frameShape === 'diamond') && (
        <div
          className="absolute inset-0 border-[1px] border-gold/50 pointer-events-none"
          style={isDiamond ? { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' } : { borderRadius: '50%' }}
        />
      )}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-xs text-white font-medium">{caption}</p>
        </div>
      )}
    </div>
  );
}