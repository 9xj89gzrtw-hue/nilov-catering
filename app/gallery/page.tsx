"use client";

import { useState } from "react";
import { GALLERY_IMAGES, REAL_GALLERY_IMAGES } from "@/lib/dish-images";
import FoodPhoto from "@/components/common/FoodPhoto";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PageHeader from "@/components/common/PageHeader";
import Lightbox from "@/components/common/Lightbox";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = [...REAL_GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        <Breadcrumbs />

        <PageHeader
          title="Галерея"
          eyebrow="Реальные события"
          subtitle="Фото с наших событий + видео-иллюстрации форматов. Нажмите на любое фото, чтобы увеличить."
        />

        {/* Mobile: 2-col compact, Desktop: 3-col */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="border-line bg-secondary group focus:ring-gold-text hover:border-gold-text relative cursor-zoom-in overflow-hidden rounded-lg border transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E5530] md:rounded-xl"
              style={{ aspectRatio: "4 / 3" }}
              aria-label={`Открыть фото: ${p.alt}. ${p.caption || ""}`}
            >
              <FoodPhoto
                src={p.src}
                alt={p.alt}
                aspectRatio="wide"
                objectPosition="center 40%"
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 md:p-4">
                <p className="line-clamp-2 text-xs font-medium text-white drop-shadow-md md:text-sm">
                  {p.caption}
                </p>
              </div>
              {/* Zoom icon overlay — visible on hover (desktop) AND on touch (active state) */}
              <div className="bg-background/80 absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full opacity-100 backdrop-blur-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:active:opacity-100">
                <svg
                  className="text-foreground h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={photos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Video section */}
      <div className="container-site mt-12">
        <h2 className="font-heading mb-6 text-2xl font-medium">Видео-иллюстрации форматов</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="border-line overflow-hidden rounded-xl border">
            <video
              src="/videos/hero/banquet.mp4"
              poster="/images/gallery/wedding-banquet.jpg"
              controls
              playsInline
              className="aspect-video w-full object-cover"
              preload="metadata"
            >
              <source src="/videos/hero/banquet.webm" type="video/webm" />
              <source src="/videos/hero/banquet.mp4" type="video/mp4" />
            </video>
            <p className="text-muted-foreground p-3 text-sm">
              Свадебный банкет · сервировка · подача
            </p>
          </div>
          <div className="border-line overflow-hidden rounded-xl border">
            <video
              src="/videos/gallery/food.webm"
              controls
              playsInline
              className="aspect-video w-full object-cover"
              preload="metadata"
            >
              <source src="/videos/gallery/food.webm" type="video/webm" />
            </video>
            <p className="text-muted-foreground p-3 text-sm">Приготовление блюд · живая готовка</p>
          </div>
          <div className="border-line overflow-hidden rounded-xl border">
            <video
              src="/videos/gallery/cooking.webm"
              controls
              playsInline
              className="aspect-video w-full object-cover"
              preload="metadata"
            >
              <source src="/videos/gallery/cooking.webm" type="video/webm" />
            </video>
            <p className="text-muted-foreground p-3 text-sm">Шеф-повар за работой</p>
          </div>
          <div className="border-line overflow-hidden rounded-xl border">
            <video
              src="/videos/gallery/chef.webm"
              controls
              playsInline
              className="aspect-video w-full object-cover"
              preload="metadata"
            >
              <source src="/videos/gallery/chef.webm" type="video/webm" />
            </video>
            <p className="text-muted-foreground p-3 text-sm">Шеф за работой</p>
          </div>
        </div>
      </div>
    </main>
  );
}
