import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Медиа-кит', description: 'Пресс-релизы, логотипы и материалы для СМИ.', alternates: { canonical: '/media-kit', languages: { 'ru': '/media-kit', 'x-default': '/media-kit' } } };

export default function MediaKitPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-xl">
        <h1 className="mb-4">Медиа-кит</h1>
        <p className="text-muted-foreground mb-8">Материалы для журналистов, блогеров и партнёров.</p>

        <div className="grid gap-4">
          {[
            { file: 'Логотип NiloV (SVG)', size: 'SVG · 0.6 КБ', href: '/press-kit/nilov-logo.svg', download: true },
            { file: 'OG-изображение (SVG)', size: 'SVG · 0.9 КБ', href: '/og-image.svg', download: true },
            { file: 'Фото блюд (подборка)', size: 'ZIP · по запросу', href: 'mailto:info@nilov-catering.ru?subject=Фото блюд' },
            { file: 'Фото команды', size: 'по запросу', href: 'mailto:info@nilov-catering.ru?subject=Фото команды' },
            { file: 'Пресс-релиз 2026', size: 'HTML · 4 КБ', href: '/press-kit/press-release-2026.html', download: true },
          ].map(f =>(
            <a key={f.file} href={f.href} download={f.download || undefined} className="flex items-center justify-between rounded-lg border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <span className="font-medium text-sm">{f.file}</span>
              <span className="text-xs text-muted-foreground">{f.size}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}