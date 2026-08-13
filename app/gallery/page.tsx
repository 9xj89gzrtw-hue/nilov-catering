'use client';

import { useState } from 'react';
import { GALLERY_IMAGES, REAL_GALLERY_IMAGES } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import Lightbox from '@/components/common/Lightbox';

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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {photos.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="relative rounded-lg md:rounded-xl overflow-hidden border border-line bg-secondary group focus:outline-none focus-visible:outline-2 focus-visible:outline-[#6E5530] focus-visible:outline-offset-2 focus:ring-2 focus:ring-gold-text focus:ring-offset-2 cursor-zoom-in transition-all hover:border-gold-text hover:shadow-lg"
                style={{ aspectRatio: '4 / 3' }}
                aria-label={`Открыть фото: ${p.alt}. ${p.caption || ''}`}
              >
                <FoodPhoto
                  src={p.src}
                  alt={p.alt}
                  aspectRatio="wide"
                  objectPosition="center 40%"
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 md:p-4 z-10 flex items-end">
                  <p className="text-xs md:text-sm font-medium text-white line-clamp-2 drop-shadow-md">{p.caption}</p>
                </div>
                {/* Zoom icon overlay — visible on hover (desktop) AND on touch (active state) */}
                <div className="absolute top-2 right-2 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:active:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={photos.map(p => ({ src: p.src, alt: p.alt, caption: p.caption }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

        {/* Video section */}
        <div className="mt-12 container-site">
          <h2 className="font-heading text-2xl font-medium mb-6">Видео-иллюстрации форматов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-line">
              <video
                src="/videos/hero/banquet.mp4"
                poster="/images/gallery/wedding-banquet.jpg"
                controls
                playsInline
                className="w-full aspect-video object-cover"
                preload="metadata"
              >
                <source src="/videos/hero/banquet.webm" type="video/webm" />
                <source src="/videos/hero/banquet.mp4" type="video/mp4" />
              </video>
              <p className="p-3 text-sm text-muted-foreground">Свадебный банкет · сервировка · подача</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-line">
              <video
                src="/videos/gallery/food.webm"
                controls
                playsInline
                className="w-full aspect-video object-cover"
                preload="metadata"
              >
                <source src="/videos/gallery/food.webm" type="video/webm" />
              </video>
              <p className="p-3 text-sm text-muted-foreground">Приготовление блюд · живая готовка</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-line">
              <video
                src="/videos/gallery/cooking.webm"
                controls
                playsInline
                className="w-full aspect-video object-cover"
                preload="metadata"
              >
                <source src="/videos/gallery/cooking.webm" type="video/webm" />
              </video>
              <p className="p-3 text-sm text-muted-foreground">Шеф-повар за работой</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-line">
              <video
                src="/videos/gallery/chef.webm"
                controls
                playsInline
                className="w-full aspect-video object-cover"
                preload="metadata"
              >
                <source src="/videos/gallery/chef.webm" type="video/webm" />
              </video>
              <p className="p-3 text-sm text-muted-foreground">Шеф за работой</p>
            </div>
          </div>
        </div>
    </main>
  );
}
