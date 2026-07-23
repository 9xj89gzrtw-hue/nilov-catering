import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Площадки',
  description: 'Рекомендованные площадки для кейтеринга в Санкт-Петербурге. Работаем на вашей площадке.',
};

const VENUES = [
  { name: 'Лофт «Большая Морская»', type: 'Лофт', capacity: 'до 150', features: 'Кухня, парковка, световое оборудование' },
  { name: 'Особняк на Фонтанке', type: 'Особняк', capacity: 'до 80', features: 'Исторический зал, рояль, сад' },
  { name: 'Бизнес-центр «Невский»', type: 'Конференц-зал', capacity: 'до 300', features: 'Проектор, звук, Wi-Fi, кейтеринг-зона' },
  { name: 'Шатёр на заливе', type: 'Шатёр', capacity: 'до 200', features: 'Вид на воду, летняя веранда, гриль-зона' },
  { name: 'Дом культуры «Выборгский»', type: 'ДК', capacity: 'до 500', features: 'Сцена, гримёрки, большая кухня' },
  { name: 'Ваша площадка', type: 'Любая', capacity: 'без ограничений', features: 'Приедем куда скажете. Оценим кухню и логистику за 1 день.' },
];

export default function VenuesPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site">
      <h1 className="text-center mb-2">Площадки, которые мы обслуживаем</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Работаем на вашей площадке в СПб и ЛО. Нет кухни? Привезём всё с собой.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {VENUES.map(v => (
          <div key={v.name} className="rounded-xl border border-line bg-card p-5">
            <h2 className="font-heading text-lg font-medium mb-1">{v.name}</h2>
            <p className="text-xs text-gold-text font-medium mb-3">{v.type} · {v.capacity} гостей</p>
            <p className="text-sm text-muted-foreground">{v.features}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">Не нашли свою площадку? Обсудим.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Связаться →</Link>
      </div>
    </div></main>
  );
}
