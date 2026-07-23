import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Видео-рекапы событий',
  description: 'Видео-рекапы прошедших событий NiloV Catering. Посмотрите, как проходят наши мероприятия.',
};

const RECAPS = [
  { t: 'Свадьба Елены и Андрея', d: '15.06.2026', g: '80 гостей', v: 'Ресторан «Мост»' },
  { t: 'Корпоратив IT-компании', d: '01.06.2026', g: '200 гостей', v: 'Лофт на Большой Морской' },
  { t: 'День рождения: 35 лет', d: '20.05.2026', g: '25 гостей', v: 'Загородный дом' },
  { t: 'Выпускной-2026', d: '28.05.2026', g: '120 гостей', v: 'Дворец на Мойке' },
  { t: 'Девичник', d: '10.05.2026', g: '15 гостей', v: 'Квартира на крыше' },
  { t: 'Бизнес-ланч Сбера', d: '05.05.2026', g: '40 гостей', v: 'БЦ «Невская ратуша»' },
];

export default function RecapPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-2">Видео-рекапы</h1>
      <p className="text-muted-foreground mb-8">Как проходят наши события — в 60-секундных рекапах. Настоящие моменты, настоящие эмоции.</p>

      <div className="space-y-4 mb-12">
        {RECAPS.map((r) => (
          <div key={r.t} className="rounded-xl border border-line bg-card overflow-hidden group hover:border-gold-text transition-colors">
            <div className="aspect-video bg-secondary flex items-center justify-center text-4xl">🎬</div>
            <div className="p-4">
              <h2 className="font-heading text-lg font-medium mb-1">{r.t}</h2>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>{r.d}</span>
                <span aria-hidden="true">·</span>
                <span>{r.g}</span>
                <span aria-hidden="true">·</span>
                <span>{r.v}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center mb-4">Реальные фото и видео будут добавлены после съёмки следующих событий.</p>
      <div className="text-center">
        <Link href="/gallery" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Смотреть галерею</Link>
      </div>
    </div></main>
  );
}