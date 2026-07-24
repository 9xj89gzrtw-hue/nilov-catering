import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/events/recap' },
  title: 'Видео-рекапы событий',
  description: 'Видео-рекапы прошедших событий NiloV Catering. Посмотрите, как проходят наши мероприятия.',
};

const RECAPS = [
  { t: 'Свадьба Екатерины и Дмитрия', d: 'Август 2024', g: '60 гостей', v: 'Особняк Бруноз, СПб', ref: 'rev-001', tags: ['Свадьба', '3 диеты', 'БГ-торт'] },
  { t: 'Корпоратив IT-стартапа', d: 'Декабрь 2024', g: '50 гостей', v: 'Лофт «Севкабель», СПб', ref: 'rev-003', tags: ['B2B', 'ЭДО', 'УСН→ОСН'] },
  { t: 'Конференция в Expoforum', d: 'Октябрь 2024', g: '150 гостей × 2 дня', v: 'Конгресс-холл «Экспофорум»', ref: 'rev-006', tags: ['B2B', 'SLA', '900 порций', 'форс-мажор'] },
  { t: 'Никях (халяль-банкет)', d: 'Август 2025', g: '60 гостей', v: 'Ресторан «Восток», СПб', ref: 'rev-015', tags: ['Халяль', 'СМР', 'без алкоголя'] },
  { t: 'Детский день рождения (БГ+анафилаксия)', d: 'Ноябрь 2025', g: '8 детей', v: 'Дом клиента, СПб', ref: 'rev-017', tags: ['БГ', '<20 ppm', 'nut-free', 'EpiPen'] },
  { t: 'Корпоратив 120 чел', d: 'Октябрь 2025', g: '120 гостей', v: 'ККТ «Космос», СПб', ref: 'rev-016', tags: ['B2B', 'SLA', '3 диеты'] },
];

export default function RecapPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-2">Кейсы и рекапы</h1>
        <p className="text-muted-foreground mb-8">
          Реальные события с датой, площадкой, количеством гостей. Кейсы привязаны к отзывам —
          кликните на карточку, чтобы прочитать полный отзыв клиента.
        </p>

        <div className="space-y-4 mb-12">
          {RECAPS.map((r) => (
            <Link
              key={r.t}
              href={r.ref ? `/reviews#${r.ref}` : '/reviews'}
              className="block rounded-xl border border-line bg-card overflow-hidden group hover:border-gold-text transition-colors"
            >
              {/* Photo placeholder — replaced with venue/abstract image when video unavailable */}
              <div className="aspect-video bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                <span aria-hidden="true">🎬</span>
              </div>
              <div className="p-4">
                <h2 className="font-heading text-lg font-medium mb-1">{r.t}</h2>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                  <span>{r.d}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.g}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.v}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gold-text font-semibold">
                  Читать отзыв клиента →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="p-4 rounded-xl border border-line bg-secondary/30 mb-8">
          <p className="text-sm text-muted-foreground">
            📹 <strong>Видео-рекапы:</strong> мы снимаем видео только с согласия клиентов.
            Видео-материалы доступны по запросу — отправим ссылку на закрытый альбом в течение
            1 рабочего дня. Запрос: <a href="mailto:info@odaeda.ru" className="underline text-gold-text">info@odaeda.ru</a>{' '}
            или <a href="tel:+78129195911" className="underline text-gold-text">+7 (812) 919-59-11</a>.
          </p>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-4">
          Фото с событий — в{' '}
          <Link href="/gallery" className="text-gold-text hover:underline">галерее</Link>.
          Полный список отзывов — на странице{' '}
          <Link href="/reviews" className="text-gold-text hover:underline">/reviews</Link>.
        </p>
        <div className="text-center">
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Смотреть галерею
          </Link>
        </div>
      </div>
    </main>
  );
}
