import type { Metadata } from 'next';
import { GALLERY_IMAGES } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

export const metadata: Metadata = {
  alternates: { canonical: '/gallery' },
  title: 'Галерея',
  description: 'Фото с наших мероприятий: свадьбы, корпоративы, банкеты, фуршеты, детские праздники. Реальные события NiloV Catering.',
};

export default function GalleryPage() {
  // Дублируем фото для большего визуального объема
  const photos = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        <h1 className="mb-2">Галерея</h1>
        <p className="text-muted-foreground mb-8">Фото и видео с наших событий.</p>

        {/* Mobile: 2-col compact, Desktop: 3-col */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {photos.map((p, i) => (
            <div key={i} className="relative rounded-lg md:rounded-xl overflow-hidden border border-line bg-secondary group">
              <FoodPhoto
                src={p.src}
                alt={p.alt}
                aspectRatio="wide"
                objectPosition="center 40%"
                className="w-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-3 z-10">
                <p className="text-[10px] md:text-xs font-medium text-white">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
