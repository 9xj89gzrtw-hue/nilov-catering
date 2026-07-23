'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { RecapClip } from '@/lib/video';

interface Props {
  clips: RecapClip[];
  heading?: string;
  ctaLabel?: string;
}

export default function EventsRecapHome({
  clips,
  heading = 'События в кадре',
  ctaLabel = 'Смотреть все рекапы →',
}: Props) {
  if (clips.length === 0) return null;

  return (
    <section aria-label={heading} className="py-20 md:py-28">
      <div className="container-site">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-text mb-3">Видео-рекапы</p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-medium">{heading}</h2>
          <Link href="/events/recap" className="hidden md:inline text-sm text-gold-text hover:underline whitespace-nowrap ml-4">{ctaLabel}</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {clips.slice(0, 8).map((clip, i) => (
            <motion.a
              key={i}
              href={`/events/recap#clip-${i}`}
              className="group relative rounded-xl overflow-hidden bg-card border border-line aspect-[3/4] block"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              aria-label={`Рекап: ${clip.title}, ${clip.durationSec} секунд`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={clip.posterSrc}
                alt={clip.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <div className="text-[10px] md:text-xs text-gold/90 font-medium uppercase tracking-wider">{clip.eventType}</div>
                <div className="text-xs md:text-sm text-white font-medium mt-0.5">{clip.title}</div>
                {clip.venue && <div className="text-[10px] md:text-xs text-white/70 mt-0.5">{clip.venue} · {clip.guests ? `${clip.guests} гостей` : ''}</div>}
                <div className="text-[10px] md:text-xs text-white/60">{clip.durationSec}с</div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/events/recap" className="text-sm text-gold-text underline underline-offset-4">{ctaLabel}</Link>
        </div>
      </div>
    </section>
  );
}
