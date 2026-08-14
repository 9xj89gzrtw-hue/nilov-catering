"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

type FrameShape = "circle" | "diamond" | "rounded-xl";

interface Props {
  posterSrc: string;
  videoSrc?: string;
  alt: string;
  caption?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
  overlay?: React.ReactNode;
  href?: string;
  frameShape?: FrameShape;
  objectPosition?: string;
  blurDataURL?: string;
}

const RATIOS = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

const FRAME_CLASSES: Record<FrameShape, string> = {
  "rounded-xl": "rounded-xl",
  circle: "rounded-full",
  diamond: "rounded-none", // clip-path handles shape
};

export default function PhotoAliveCard({
  posterSrc,
  videoSrc,
  alt,
  caption,
  aspectRatio = "square",
  className = "",
  overlay,
  href,
  frameShape = "rounded-xl",
  objectPosition = "center 40%",
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

  const isDiamond = frameShape === "diamond";
  const frameClass = FRAME_CLASSES[frameShape];

  const mediaStyle: React.CSSProperties = {
    objectPosition,
    ...(isDiamond ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" } : {}),
  };

  const content = (
    <div
      className={`bg-card border-line group relative overflow-hidden border ${frameClass} ${RATIOS[aspectRatio]} ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={videoSrc && !reducedMotion ? onHoverStart : undefined}
      onTouchEnd={videoSrc && !reducedMotion ? onHoverEnd : undefined}
      style={isDiamond ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" } : {}}
    >
      {/* Blur placeholder - tiny base64 data URL, no optimization needed */}
      {blurDataURL && (
        <Image
          src={blurDataURL}
          alt=""
          width={100}
          height={100}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-[20px]"
          style={mediaStyle}
        />
      )}

      {/* Poster */}
      <motion.img
        src={posterSrc}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-350"
        style={mediaStyle}
        animate={{ opacity: showVideo && videoLoaded ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Video layer */}
      {videoSrc && !reducedMotion && (
        <video controls
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-350"
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
          transition={{ duration: 2.5, ease: "easeOut" }}
          role="img"
          aria-label={alt}
        />
      )}

      {/* Gold frame accent for circle/diamond */}
      {(frameShape === "circle" || frameShape === "diamond") && (
        <div
          className="border-gold/50 pointer-events-none absolute inset-0 border-[1px]"
          style={
            isDiamond
              ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }
              : { borderRadius: "50%" }
          }
        />
      )}

      {/* Overlay + Caption */}
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
          {overlay}
        </div>
      )}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-xs font-medium text-white">{caption}</p>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="focus-visible:ring-ring block focus-visible:ring-2 focus-visible:ring-offset-2"
        style={isDiamond ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" } : {}}
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
  aspectRatio = "square",
  className = "",
  frameShape = "rounded-xl",
  objectPosition = "center 40%",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
  frameShape?: FrameShape;
  objectPosition?: string;
}) {
  const isDiamond = frameShape === "diamond";
  const frameClass = FRAME_CLASSES[frameShape];

  return (
    <div
      className={`bg-card border-line group relative overflow-hidden border ${frameClass} ${RATIOS[aspectRatio]} ${className}`}
      style={isDiamond ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" } : {}}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: objectPosition,
          ...(isDiamond ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" } : {}),
        }}
        role="img"
        aria-label={alt}
      />
      {(frameShape === "circle" || frameShape === "diamond") && (
        <div
          className="border-gold/50 pointer-events-none absolute inset-0 border-[1px]"
          style={
            isDiamond
              ? { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }
              : { borderRadius: "50%" }
          }
        />
      )}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-xs font-medium text-white">{caption}</p>
        </div>
      )}
    </div>
  );
}
