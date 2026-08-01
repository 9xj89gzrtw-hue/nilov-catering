'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import type { HomeShowcaseClip } from '@/lib/video';
import { getEmbedUrl } from '@/lib/video';

interface Props {
  clips: HomeShowcaseClip[];
  heading?: string;
  variant?: 'single' | 'grid';
}

export default function HomeVideoShowcase({ clips, heading = 'Живые моменты наших событий', variant = 'single' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20%', once: false });
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

  const toggle = useCallback((idx: number) => {
    setManualPause(prev => {
      if (playing === idx) {
        // останавливаем
        setPlaying(null);
        return true;
      }
      setPlaying(idx);
      return true; // ручной контроль
    });
  }, [playing]);

  if (clips.length === 0) return null;

  return (
    <section ref={ref} aria-label={heading} className="py-24 md:py-32 bg-secondary">
      <div className="container-site">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-text mb-3">Наши события</p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium mb-10 md:mb-14">{heading}</h2>

        <div className={
          variant === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
            : 'grid grid-cols-1 gap-8'
        }>
          {clips.slice(0, variant === 'grid' ? 3 : 1).map((clip, idx) => {
            const isActive = playing === idx;
            const embedUrl = getEmbedUrl(clip.video);

            return (
              <motion.div
                key={idx}
                className="relative rounded-xl overflow-hidden bg-card border border-line group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
              >
                {/* Poster + Play overlay */}
                <div className="relative aspect-video w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={clip.posterSrc}
                    alt={clip.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  {/* Iframe — only when active + not reduced */}
                  {isActive && !reduced && embedUrl && (
                    <iframe
                      src={`${embedUrl}?autoplay=1&muted=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      title={clip.title}
                    />
                  )}

                  {/* Play/Pause button */}
                  <button
                    onClick={() => toggle(idx)}
                    className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? 'bg-black/20 opacity-0 hover:opacity-100' : 'bg-black/30 hover:bg-black/40'}`}
                    aria-label={`${isActive ? 'Пауза' : 'Воспроизвести видео'}: ${clip.title}, ${clip.durationSec} секунд`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                      {isActive ? <Pause className="w-5 h-5 text-ink" /> : <Play className="w-5 h-5 text-ink ml-0.5" />}
                    </div>
                  </button>
                </div>

                {/* Caption */}
                <div className="px-4 py-3 md:px-5 md:py-4">
                  <span className="text-xs text-gold-text font-medium">{clip.eventType}</span>
                  <p className="text-sm font-medium mt-0.5">{clip.title} · {clip.durationSec}с</p>
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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);
  return reduced;
}
