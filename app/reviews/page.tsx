import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' }, title: 'Отзывы' };

export default function ReviewsPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="text-center mb-4">Отзывы</h1>
      <p className="text-center text-muted-foreground mb-16">Настоящие истории от наших клиентов.</p>
      {[
        { author: 'Анна и Михаил', text: 'NiloV сделали нашу свадьбу такой, как мы мечтали.', date: 'Июнь 2026' },
        { author: 'Марина К.', text: 'Детский день рождения прошёл на ура.', date: 'Май 2026' },
        { author: 'Сергей П.', text: 'Корпоратив — коллеги до сих пор вспоминают.', date: 'Июль 2026' },
      ].map((r) => (
        <div key={r.author} className="mb-6 p-6 rounded-xl border border-line bg-card">
          <p className="text-foreground mb-3">&ldquo;{r.text}&rdquo;</p>
          <p className="text-sm font-semibold">{r.author}</p>
          <p className="text-xs text-muted-foreground">{r.date}</p>
        </div>
      ))}
    </div></main>
  );
}
