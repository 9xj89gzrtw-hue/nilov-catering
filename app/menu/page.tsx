import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Меню и цены — NiloV Catering',
  description: 'Фуршет, банкет, кофе-брейк — меню и цены на кейтеринг в СПб. От 390 ₽/гость. Все блюда с ценами и составом.',
};

// Группируем блюда по форматам
const FORMATS = [
  { slug: 'furshet', label: 'Фуршет', href: '/menu/furshet', price: 'от 2 450 ₽/гость', emoji: '🥪', desc: 'Канапе, тарталетки, закуски. Для корпоративов и дней рождения. Гости едят стоя.' },
  { slug: 'banket', label: 'Банкет', href: '/menu/banquet', price: 'от 3 950 ₽/гость', emoji: '🍽️', desc: 'Полноценный обед с посадкой. Салаты, суп, горячее. Для свадеб и торжеств.' },
  { slug: 'coffee-break', label: 'Кофе-брейк', href: '/menu/coffee-break', price: 'от 390 ₽/гость', emoji: '☕', desc: 'Выпечка, сэндвичи, десерты, кофе. Для конференций и тренингов.' },
  { slug: 'detskoe', label: 'Детское', href: '/menu/detskoe', price: 'от 1 550 ₽/гость', emoji: '🎈', desc: 'Бургеры, наггетсы, смузи. Безопасное и вкусное меню для детей.' },
  { slug: 'vegan', label: 'Веган', href: '/menu/vegan', price: 'от 1 500 ₽/гость', emoji: '🥬', desc: 'Растительное меню без продуктов животного происхождения.' },
  { slug: 'show-cooking', label: 'Show-cooking', href: '/menu/show-cooking', price: '', emoji: '🔥', desc: 'Живые станции: паста, суши, пицца. Еда как шоу для ваших гостей.' },
];

// Популярные блюда со всех меню (для витрины)
const POPULAR = ALL_DISHES.filter(d => d.id.startsWith('canape-') || d.id.startsWith('tartaletka-')).slice(0, 8);

function DishCard({ dish }: { dish: typeof ALL_DISHES[number] }) {
  const colors = ['from-amber-100 to-amber-200', 'from-rose-100 to-rose-200', 'from-emerald-100 to-emerald-200', 'from-sky-100 to-sky-200', 'from-violet-100 to-violet-200', 'from-orange-100 to-orange-200', 'from-pink-100 to-pink-200', 'from-lime-100 to-lime-200'];
  const color = colors[dish.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length];
  return (
    <div className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text hover:-translate-y-0.5 transition-all duration-300 group">
      <div className={`aspect-[4/3] bg-gradient-to-br ${color} flex items-center justify-center relative`}>
        <span className="text-4xl opacity-40 select-none">{dish.name.charAt(0)}</span>
        <div className="absolute bottom-2 right-2">
          <span className="text-xs bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 font-semibold">{dish.pricePerGuest} ₽/гость</span>
        </div>
        {dish.dietBadges.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {dish.dietBadges.includes('vegan') && <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">VEGAN</span>}
            {dish.dietBadges.includes('gluten-free') && <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold">GF</span>}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium leading-tight mb-1 group-hover:text-gold-text transition-colors">{dish.name}</h3>
        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{dish.description}</p>
        {/* Allergen chips — visible на /menu */}
        {dish.allergens.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {dish.allergens.slice(0, 4).map(a => {
              const isHighRisk = a === 'nuts' || a === 'peanuts' || a === 'gluten' || a === 'fish' || a === 'crustaceans' || a === 'molluscs';
              return (
                <span key={a} className={`text-[9px] px-1 py-0.5 rounded leading-none ${
                  isHighRisk ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                }`} title={ALLERGEN_LABEL[a]}>
                  {ALLERGEN_LABEL[a].slice(0, 4)}
                </span>
              );
            })}
            {dish.allergens.length > 4 && (
              <span className="text-[9px] bg-muted text-muted-foreground px-1 py-0.5 rounded leading-none">+{dish.allergens.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Меню и цены</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Любой формат — от кофе-брейка до банкета. Все цены указаны за человека.
          </p>
        </div>

        {/* Quick price anchors */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FORMATS.filter(f => f.price).map(f => (
            <Link key={f.slug} href={f.href} className="rounded-full border border-line px-5 py-2 text-sm hover:border-gold-text hover:bg-gold-tint transition-colors">
              {f.emoji} {f.label} — <span className="font-semibold text-gold-text">{f.price}</span>
            </Link>
          ))}
        </div>

        {/* Format grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {FORMATS.map(f => (
            <Link
              key={f.slug}
              href={f.href}
              className="group relative rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:border-gold-text hover:-translate-y-1 overflow-hidden"
            >
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h2 className="font-heading text-xl font-medium mb-2 group-hover:text-gold-text transition-colors">{f.label}</h2>
              <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
              {f.price && (
                <span className="text-sm font-bold text-gold-text">{f.price}</span>
              )}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-gold-text text-white px-3 py-1 rounded-full">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* POPULAR DISHES SHOWCASE */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-medium mb-2">Популярные блюда</h2>
          <p className="text-muted-foreground mb-6">Примеры того, что мы готовим. Каждое блюдо — под заказ.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {POPULAR.map(dish => <DishCard key={dish.id} dish={dish} />)}
          </div>
        </div>

        {/* Diet lines */}
        <div className="mb-16 p-8 rounded-2xl bg-muted/30 border border-line">
          <h2 className="text-2xl font-heading font-medium mb-3 text-center">Специальные линии меню</h2>
          <p className="text-muted-foreground text-center mb-6">Для гостей с особыми предпочтениями</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: '🥬 Веган', href: '/menu/vegan', desc: 'Без мяса, молока, яиц' },
              { label: '🌾 Без глютена', href: '/menu/gluten-free', desc: 'Для целиакии и чувствительности' },
              { label: '☪️ Халяль', href: '/menu/halal', desc: 'Сертифицированное халяль-меню' },
            ].map(d => (
              <Link key={d.href} href={d.href} className="rounded-xl border border-line bg-card px-5 py-3 hover:border-gold-text hover:-translate-y-0.5 transition-all">
                <div className="text-sm font-medium mb-0.5">{d.label}</div>
                <div className="text-[11px] text-muted-foreground">{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-10 rounded-2xl bg-gradient-to-b from-muted/50 to-transparent border border-line">
          <p className="text-xl font-heading font-medium mb-2">Не нашли то, что ищете?</p>
          <p className="text-muted-foreground mb-5">Мы составим индивидуальное меню под ваш бюджет и вкусы.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/plan/constructor" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Собрать меню
            </Link>
            <Link href="/plan/helper" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
              Помогите выбрать
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}