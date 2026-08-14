"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause } from "lucide-react";
import type { HomeShowcaseClip } from "@/lib/video";
import { getEmbedUrl } from "@/lib/video";

interface Props {
  clips: HomeShowcaseClip[];
  heading?: string;
  variant?: "single" | "grid";
}

export default function HomeVideoShowcase({
  clips,
  heading = "Живые моменты наших событий",
  variant = "single",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%", once: false });
  const [playing, setPlaying] = useState<number | null>(null);
  const [manualPause, setManualPause] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Автозапуск по IntersectionObserver (не autoplay-атрибут)
  useEffect(() => {
    if (reduced || manualPause) return;
    if (inView && clips.length > 0) {
      setPlaying(0); // первый клип по умолчанию
    } else if (!inView) {
      setPlaying(null);
    }
  }, [inView, reduced, manualPause, clips.length]);

  const toggle = useCallback(
    (idx: number) => {
      setManualPause(() => {
        if (playing === idx) {
          // останавливаем
          setPlaying(null);
          return true;
        }
        setPlaying(idx);
        return true; // ручной контроль
      });
    },
    [playing]
  );

  if (clips.length === 0) return null;

  return (
    <section ref={ref} aria-label={heading} className="bg-secondary py-24 md:py-32">
      <div className="container-site">
        <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Наши события</p>
        <h2 className="font-heading mb-10 text-3xl font-medium md:mb-14 md:text-4xl">{heading}</h2>

        <div
          className={
            variant === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              : "grid grid-cols-1 gap-8"
          }
        >
          {clips.slice(0, variant === "grid" ? 3 : 1).map((clip, idx) => {
            const isActive = playing === idx;
            const embedUrl = getEmbedUrl(clip.video);

            return (
              <motion.div
                key={idx}
                className="bg-card border-line group relative overflow-hidden rounded-xl border"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
              >
                {/* Poster + Play overlay */}
                <div className="relative aspect-video w-full">
                  <Image
                    src={clip.posterSrc}
                    alt={clip.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {/* Iframe — only when active + not reduced */}
                  {isActive && !reduced && embedUrl && (
                    <iframe
                      src={`${embedUrl}?autoplay=1&muted=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                      title={clip.title}
                    />
                  )}

                  {/* Play/Pause button */}
                  <button
                    onClick={() => toggle(idx)}
                    className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? "bg-black/20 opacity-0 hover:opacity-100" : "bg-black/30 hover:bg-black/40"}`}
                    aria-label={`${isActive ? "Пауза" : "Воспроизвести видео"}: ${clip.title}, ${clip.durationSec} секунд`}
                  >
                    <div className="bg-gold/90 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 md:h-14 md:w-14">
                      {isActive ? (
                        <Pause className="text-ink h-5 w-5" />
                      ) : (
                        <Play className="text-ink ml-0.5 h-5 w-5" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Caption */}
                <div className="px-4 py-3 md:px-5 md:py-4">
                  <span className="text-gold-text text-xs font-medium">{clip.eventType}</span>
                  <p className="mt-0.5 text-sm font-medium">
                    {clip.title} · {clip.durationSec}с
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return reduced;
}
