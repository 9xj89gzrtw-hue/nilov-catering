"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KenBurnsCard } from "@/components/effects/PhotoAliveCard";

const PHOTOS = [
  { src: "/images/gallery/wedding-120.svg", caption: "Свадьба · 120 гостей" },
  { src: "/images/gallery/corporate-300.svg", caption: "Корпоратив · 300 гостей" },
  { src: "/images/gallery/intimate-dinner.svg", caption: "Камерный ужин" },
  { src: "/images/gallery/anniversary.svg", caption: "Юбилей" },
  { src: "/images/gallery/chef-at-home.svg", caption: "Выезд шефа" },
  { src: "/images/gallery/banquet-turnkey.svg", caption: "Банкет под ключ" },
];

export default function GalleryTeaser() {
  return (
    <section className="bg-secondary py-16 md:py-20" aria-labelledby="gallery-heading">
      <div className="container-site">
        <div className="mb-8">
          <p className="text-gold-text mb-2 font-mono text-xs tracking-[0.2em] uppercase">
            Наши события
          </p>
          <h2 id="gallery-heading">То, что вы запомните</h2>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory scrollbar-none gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:px-0">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              className="w-[60vw] max-w-[220px] shrink-0 snap-start md:w-auto md:max-w-none"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href="/gallery">
                {/* Circle frames for gallery teaser */}
                <KenBurnsCard
                  src={p.src}
                  alt={p.caption}
                  caption={p.caption}
                  aspectRatio="video"
                  frameShape="circle"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/gallery"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
          >
            Вся галерея →
          </Link>
        </div>
      </div>
    </section>
  );
}
