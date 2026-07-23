import type { Metadata } from 'next';
import Link from 'next/link';
import SeasonalPackages from '@/components/blocks/SeasonalPackages';

export const metadata: Metadata = {
  title: 'Новый год — кейтеринг',
  description: 'Новогодний кейтеринг NiloV: корпоративы, частные вечеринки. Меню, бар, декор — под ключ в СПб.',
};

const DISHES = [
  { name: 'Оливье с раковыми шейками', desc: 'Раковые шейки, картофель, яйцо, горошек, майонез', price: 320 },
  { name: 'Запечённый гусь с яблоками', desc: 'Гусь, яблоки, чернослив, 200 г', price: 580 },
  { name: 'Корюшка горячего копчения', desc: 'Корюшка на ольховой щепе', price: 250 },
  { name: 'Сало в шоколаде (сет)', desc: 'Солёное сало, бельгийский шоколад 70%', price: 180 },
  { name: 'Мандариновый десерт', desc: 'Мусс, бисквит, цедра', price: 200 },
  { name: 'Имбирный чай с облепихой', desc: 'Облепиха, имбирь, мёд, корица', price: 120 },
  { name: 'Глинтвейн (безалкогольный)', desc: 'Виноградный сок, пряности, апельсин', price: 150 },
  { name: 'Шампанское (игристое)', desc: 'Брют/просекко', price: 350 },
];

export default function NewYearPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Новый год</h1>
        <p className="text-muted-foreground mb-8">
          Корпоративы и частные вечеринки. 🎄 Бронируйте заранее — декабрь и январь разбирают быстро. Цены ориентировочные.
        </p>

        <SeasonalPackages season="new-year" label="Новый год" ctaFormat="furshet" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Новогодние блюда</h2>
        <div className="space-y-3 mb-10">
          {DISHES.map(d => (
            <div key={d.name} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                </div>
                <span className="text-sm font-semibold text-gold-text shrink-0 ml-4">{d.price} ₽</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <a href="/menu/new-year/pdf" download className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium hover:border-gold-text transition-all">
            Скачать новогоднее меню (PDF)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link href="/plan/calculator?format=banket" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Рассчитать новый год</Link>
            <Link href="/plan/constructor" className="rounded-lg border border-gold-text text-gold-text px-6 py-3 text-sm font-semibold hover:bg-gold-tint transition-all">Собрать меню в конструкторе</Link>
          </div>
          <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
            <p className="text-sm font-medium mb-1">Нужен особый формат? Составим индивидуально</p>
            <p className="text-xs text-muted-foreground mb-3">Шеф разработает новогоднее меню под ваш бюджет и площадку.</p>
            <Link href="/plan/constructor" className="text-sm text-gold-text font-semibold hover:underline">Составить меню с шефом →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}