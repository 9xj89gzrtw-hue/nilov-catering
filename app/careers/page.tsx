import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Карьера в NiloV Catering',
  description: 'Вакансии NiloV Catering в Санкт-Петербурге. Повара, кондитеры, менеджеры событий.',
};

export default function CareersPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-2">Карьера в NiloV</h1>
      <p className="text-muted-foreground mb-10">Мы растём и ищем профессионалов. Актуальные вакансии уточняются у менеджера.</p>
      {[
        { t: 'Шеф-повар', d: 'Опыт от 5 лет. Французская и итальянская кухня. Работа на выезде.' },
        { t: 'Менеджер событий', d: 'Опыт в event-сфере. Коммуникабельность, ответственность, авто.' },
        { t: 'Кондитер', d: 'Опыт от 3 лет. Торты, десерты, капкейки. Портфолио обязательно.' },
        { t: 'Официант (выезд)', d: 'Опыт от 1 года. Аккуратность, знание сервировки, английский — плюс.' },
      ].map(v => (
        <div key={v.t} className="mb-4 p-5 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-1">{v.t}</h2>
          <p className="text-sm text-muted-foreground">{v.d}</p>
        </div>
      ))}
      <Link href="mailto:job@odaeda.ru" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground mt-4">Откликнуться</Link>
    </div></main>
  );
}