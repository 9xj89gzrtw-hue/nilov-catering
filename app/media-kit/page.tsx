import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Медиа-кит', description: 'Пресс-релизы, логотипы и материалы для СМИ.' };

export default function MediaKitPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-xl">
        <h1 className="mb-4">Медиа-кит</h1>
        <p className="text-muted-foreground mb-8">Материалы для журналистов, блогеров и партнёров.</p>

        <div className="grid gap-4">
          {[
            { file: 'Логотип NiloV (SVG + PNG)', size: 'По запросу', href: 'mailto:info@nilov-catering.ru?subject=Логотип' },
            { file: 'Фото блюд (подборка)', size: 'По запросу', href: 'mailto:info@nilov-catering.ru?subject=Фото блюд' },
            { file: 'Фото команды', size: 'По запросу', href: 'mailto:info@nilov-catering.ru?subject=Фото команды' },
            { file: 'Пресс-релиз 2026', size: 'По запросу', href: 'mailto:info@nilov-catering.ru?subject=Пресс-релиз' },
          ].map(f => (
            <a key={f.file} href={f.href} className="flex items-center justify-between rounded-lg border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <span className="font-medium text-sm">{f.file}</span>
              <span className="text-xs text-muted-foreground">{f.size}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}