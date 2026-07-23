import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/gallery' }, title: 'Галерея' };

const PHOTOS = Array.from({ length: 12 }).map((_, i) => ({
  src: `/placeholders/hero-${['furshet','banket','coffee-break','detskoe','chef-at-home','poster'][i % 6]}.svg`,
  caption: ['Свадьба · 120 гостей','Корпоратив · 300 гостей','Камерный ужин','Детский праздник','Выезд шефа','Банкет под ключ'][i % 6],
}));

export default function GalleryPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        <h1 className="mb-2">Галерея</h1>
        <p className="text-muted-foreground mb-8">Фото и видео с наших событий.</p>

        {/* Mobile: 2-col compact, Desktop: 3-col */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {PHOTOS.map((p, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden border border-line bg-secondary group">
              <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2 md:p-3">
                <p className="text-[10px] md:text-xs font-medium text-foreground">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
