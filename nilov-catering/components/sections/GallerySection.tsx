"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/common/AnimatedSection";
import { galleryImages } from "@/lib/data";
import { Camera, X } from "lucide-react";
import { useState, useCallback } from "react";

const categories = [
  { value: "all", label: "Все" },
  { value: "weddings", label: "Свадьбы" },
  { value: "corporate", label: "Корпоративы" },
  { value: "private", label: "Частные" },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((p) => p !== null ? (p + 1) % filtered.length : null), [filtered.length]);
  const prev = useCallback(() => setLightbox((p) => p !== null ? (p - 1 + filtered.length) % filtered.length : null), [filtered.length]);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Портфолио
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Наши <span className="gradient-text">работы</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Каждый кадр — история удачного мероприятия. Посмотрите, как мы создаём атмосферу
            </p>
          </div>
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/50 hover:border-accent/30"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Masonry grid */}
        <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <div className="relative rounded-xl overflow-hidden img-zoom">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    placeholder="empty"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{img.alt}</p>
                    <p className="text-white/60 text-xs">{img.categoryLabel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              &#8592;
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                placeholder="empty"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-medium">{filtered[lightbox].alt}</p>
                <p className="text-white/60 text-sm">{filtered[lightbox].categoryLabel}</p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              &#8594;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}