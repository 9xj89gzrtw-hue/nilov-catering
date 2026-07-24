import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Медиа-кит', description: 'Пресс-релизы, логотипы и материалы для СМИ.' };

export default function MediaKitPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-xl">
        <h1 className="mb-4">Медиа-кит</h1>
        <p className="text-muted-foreground mb-8">Материалы для журналистов, блогеров и партнёров.</p>

        <div className="grid gap-4">
          {[
            { file: 'Логотип NiloV (SVG + PNG)', size: 'ZIP, 2.4 МБ', href: '/media/nilov-logo.zip' },
            { file: 'Фото блюд (подборка)', size: 'ZIP, 12 МБ', href: '/media/nilov-dishes.zip' },
            { file: 'Фото команды', size: 'ZIP, 5.8 МБ', href: '/media/nilov-team.zip' },
            { file: 'Пресс-релиз 2026', size: 'PDF, 340 КБ', href: '/media/nilov-press-2026.pdf' },
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