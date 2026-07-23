import Link from 'next/link';

const CATS = [
  { title: 'Фуршет', href: '/menu/furshet', items: 'Канапе, тарталетки, мини-бургеры', icon: '🥪' },
  { title: 'Банкет', href: '/menu/banquet', items: 'Закуски, горячее, винная карта', icon: '🍽️' },
  { title: 'Кофе-брейк', href: '/menu/coffee-break', items: 'Выпечка, канапе, кофе, чай', icon: '☕' },
  { title: 'Детское', href: '/menu/detskoe', items: 'Бутерброды, капкейки, соки', icon: '🎈' },
  { title: 'Веган', href: '/menu/vegan', items: 'Растительные блюда без мяса и молока', icon: '🥬' },
  { title: 'Без глютена', href: '/menu/gluten-free', items: 'Блюда без глютена', icon: '🌾' },
];

export default function MenuPreview() {
  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="menu-heading">
      <div className="container-site">
        <h2 id="menu-heading" className="mb-8 font-heading text-3xl md:text-4xl text-center">Меню</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {CATS.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group block">
              <div className="aspect-square rounded-2xl bg-secondary flex items-center justify-center mb-3 group-hover:scale-[1.03] transition-transform">
                <span className="text-5xl select-none">{cat.icon}</span>
              </div>
              <h3 className="font-heading text-sm font-medium text-center group-hover:text-gold-text transition-colors">{cat.title}</h3>
              <p className="text-[11px] text-muted-foreground text-center mt-0.5">{cat.items}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/menu" className="text-sm font-medium text-gold-text hover:underline">Полное меню →</Link>
        </div>
      </div>
    </section>
  );
}