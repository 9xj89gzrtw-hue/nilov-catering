"use client";

import { useState } from "react";
import { galleryImages } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Галерея", href: "/gallery" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Галерея</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">Фотографии с наших мероприятий — каждый кадр рассказывает историю вкуса и стиля</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryFilter active={activeFilter} onChange={setActiveFilter} />
          <GalleryGrid images={filtered} onImageClick={setLightboxIndex} />
        </div>
      </section>
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
          onNext={() => setLightboxIndex((i) => i !== null ? (i + 1) % filtered.length : null)}
        />
      )}
    </main>
  );
}
