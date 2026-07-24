import type { Metadata } from 'next';
import Link from 'next/link';
import SeasonalPackages from '@/components/blocks/SeasonalPackages';

export const metadata: Metadata = {
  title: 'ББQ-лето — кейтеринг',
  description: 'Летний кейтеринг NiloV: гриль-меню на открытом воздухе. Шашлыки, стейки, овощи гриль — выезд в СПб и область.',
};

const DISHES = [
  { name: 'Шашлык из свинины', desc: 'Свиная шея в луковом маринаде, 200 г', price: 480 },
  { name: 'Шашлык из курицы', desc: 'Куриное бедро в аджике, 200 г', price: 380 },
  { name: 'Люля-кебаб из баранины', desc: 'Рубленая баранина с зеленью, 150 г', price: 450 },
  { name: 'Стейк из лосося', desc: 'Лосось на гриле с лимоном, 180 г', price: 620 },
  { name: 'Овощи гриль', desc: 'Баклажан, перец, цуккини, шампиньоны', price: 250 },
  { name: 'Картофель по-деревенски', desc: 'С розмарином и чесноком', price: 180 },
  { name: 'Кукуруза гриль', desc: 'С маслом и паприкой', price: 160 },
  { name: 'Салат «Греческий»', desc: 'Помидоры, огурцы, фета, оливки', price: 220 },
  { name: 'Лимонад домашний', desc: 'Лимон, мята, содовая', price: 120 },
  { name: 'Мохито 0%', desc: 'Лайм, мята, сахарный сироп, содовая', price: 140 },
];

export default function BBQPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">ББQ-лето</h1>
        <p className="text-muted-foreground mb-8">
          Гриль-меню на открытом воздухе. Выезд на дачу, веранду, берег залива. Меню и цены ориентировочные.
        </p>

        <SeasonalPackages season="bbq" label="ББQ" ctaFormat="furshet" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Блюда гриль-меню</h2>
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
          <a href="/menu/bbq/pdf" download className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium hover:border-gold-text transition-all">
            Скачать ББQ-меню (PDF)
          </a>
          <div className="flex flex-wrap gap-4">
            <Link href="/plan/calculator?format=furshet" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Рассчитать ББQ</Link>
            <Link href="/plan/constructor" className="rounded-lg border border-gold-text text-gold-text px-6 py-3 text-sm font-semibold hover:bg-gold-tint transition-all">Собрать меню в конструкторе</Link>
          </div>
          <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
            <p className="text-sm font-medium mb-1">Нужен особый формат? Составим индивидуально</p>
            <p className="text-xs text-muted-foreground mb-3">Шеф разработает гриль-меню под вашу площадку и количество гостей.</p>
            <Link href="/plan/constructor" className="text-sm text-gold-text font-semibold hover:underline">Составить меню с шефом →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}