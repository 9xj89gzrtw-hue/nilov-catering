"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { RecapClip } from "@/lib/video";

interface Props {
  clips: RecapClip[];
  heading?: string;
  ctaLabel?: string;
}

export default function EventsRecapHome({
  clips,
  heading = "События в кадре",
  ctaLabel = "Смотреть все рекапы →",
}: Props) {
  if (clips.length === 0) return null;

  return (
    <section aria-label={heading} className="py-20 md:py-28">
      <div className="container-site">
        <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Видео-рекапы</p>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">{heading}</h2>
          <Link
            href="/events/recap"
            className="text-gold-text ml-4 hidden text-sm whitespace-nowrap hover:underline md:inline"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {clips.slice(0, 8).map((clip, i) => (
            <motion.a
              key={i}
              href={`/events/recap#clip-${i}`}
              className="group bg-card border-line relative block aspect-[3/4] overflow-hidden rounded-xl border"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              aria-label={`Рекап: ${clip.title}, ${clip.durationSec} секунд`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={clip.posterSrc}
                alt={clip.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <div className="text-gold/90 text-[10px] font-medium tracking-wider uppercase md:text-xs">
                  {clip.eventType}
                </div>
                <div className="mt-0.5 text-xs font-medium text-white md:text-sm">{clip.title}</div>
                {clip.venue && (
                  <div className="mt-0.5 text-[10px] text-white/70 md:text-xs">
                    {clip.venue} · {clip.guests ? `${clip.guests} гостей` : ""}
                  </div>
                )}
                <div className="text-[10px] text-white/60 md:text-xs">{clip.durationSec}с</div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/events/recap"
            className="text-gold-text text-sm underline underline-offset-4"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
