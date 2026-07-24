import type { Metadata } from 'next';
import Link from 'next/link';
import SeasonalPackages from '@/components/blocks/SeasonalPackages';

export const metadata: Metadata = {
  title: 'Масленица — кейтеринг',
  description: 'Масленица с NiloV: блины, самовар, народные гуляния. Выездной кейтеринг в СПб.',
};

const DISHES = [
  { name: 'Блины классические', desc: 'Тонкие блины со сметаной, мёдом, вареньем', price: 120 },
  { name: 'Блины с красной икрой', desc: 'Тонкий блин, сливочное масло, икра лососёвая', price: 280 },
  { name: 'Блины с сёмгой', desc: 'Слабосолёная сёмга, творожный сыр, укроп', price: 250 },
  { name: 'Блины с грибами', desc: 'Жульен из шампиньонов и лисичек в блинном мешочке', price: 220 },
  { name: 'Блины с мясом', desc: 'Томлёная говядина, лук, сметанный соус', price: 240 },
  { name: 'Блинный торт', desc: '10 слоёв с заварным кремом и ягодами', price: 180 },
  { name: 'Оладьи яблочные', desc: 'Пышные оладьи с карамелизированными яблоками', price: 150 },
  { name: 'Самовар (чай)', desc: 'Традиционный самовар с чёрным чаем, травами, мёдом', price: 90 },
  { name: 'Сбитень медовый', desc: 'Горячий напиток с мёдом, имбирём и пряностями', price: 130 },
  { name: 'Морс клюквенный', desc: 'Домашний морс из клюквы с мятой', price: 100 },
];

export default function MaslenitsaPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Масленица</h1>
        <p className="text-muted-foreground mb-8">
          Блины, самовар, народные гуляния — выездной кейтеринг на Масленицу. Меню согласовывается индивидуально.
        </p>

        <SeasonalPackages season="maslenitsa" label="Масленица" ctaFormat="furshet" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все масленичные блюда</h2>
        <div className="space-y-3 mb-10">
          {DISHES.map(d => (
            <div key={d.name} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                </div>
                <span className="text-sm font-semibold text-gold-text shrink-0 ml-4">{d.price} ₽/гость</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <a href="/menu/maslenitsa/pdf" download className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium hover:border-gold-text transition-all">
            Скачать меню Масленицы (PDF)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link href="/plan/calculator?format=furshet" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Рассчитать Масленицу</Link>
            <Link href="/plan/constructor" className="rounded-lg border border-gold-text text-gold-text px-6 py-3 text-sm font-semibold hover:bg-gold-tint transition-all">Собрать меню в конструкторе</Link>
          </div>
          <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
            <p className="text-sm font-medium mb-1">Нужен особый формат? Составим индивидуально</p>
            <p className="text-xs text-muted-foreground mb-3">Шеф разработает масленичное меню под количество гостей и площадку.</p>
            <Link href="/plan/constructor" className="text-sm text-gold-text font-semibold hover:underline">Составить меню с шефом →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}