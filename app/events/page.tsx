import type { Metadata } from 'next';
import Link from 'next/link';

const EVENTS = [
  { title: 'Корпоративы', href: '/events/korporativ', desc: 'Бизнес-ланчи, фуршеты, банкеты для компаний. От 10 до 500 человек.', price: 'от 2 450 ₽/гость', primary: true },
  { title: 'Свадьбы', href: '/events/svadba', desc: 'Меню, сервировка, торт, флористика. Полный цикл подготовки.', price: 'от 3 950 ₽/гость' },
  { title: 'Выпускные', href: '/events/vypusknoy', desc: 'Фуршеты и банкеты для школ и вузов. B2B: документы для Роспот.', price: 'от 2 450 ₽/гость' },
  { title: 'Частные события', href: '/events/chastnoe', desc: 'Дни рождения, юбилеи, семейные ужины. Дома, на веранде, на крыше.', price: 'от 2 450 ₽/гость' },
  { title: 'Юбилеи и годовщины', href: '/events/yubiley', desc: 'Золотая свадьба, юбилей для пожилых гостей. Банкет с посадкой от 15 чел.', price: 'от 50 000 ₽ за 15 чел' },
  { title: 'Детские праздники', href: '/events/detskoe', desc: 'Специальное меню, аниматоры, шоу-программа. Безопасно и весело.', price: 'от 1 550 ₽/гость' },
  { title: 'Выезд шефа', href: '/events/chef-at-home', desc: 'Шеф-повар и сомелье у вас дома. Ужин на 2–12 персон.', price: 'от 2 500 ₽/час' },
];

export const metadata: Metadata = {
  title: 'События',
  description: 'Кейтеринг для любого события: корпоративы, свадьбы, выпускные, детские праздники, частные ужины. Под ключ в СПб.',
};

export default function EventsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site">
        <div className="text-center mb-16">
          <h1 className="mb-4">Какое у вас событие?</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
            Выберите формат — и мы подберём меню, персонал и площадку.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className={`group rounded-xl border border-line bg-card p-8 transition-all duration-300
                hover:border-gold-text hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                ${e.primary ? 'lg:col-span-2' : ''}`}
            >
              <h2 className="font-heading text-xl font-medium text-foreground group-hover:text-gold-text transition-colors mb-2">
                {e.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{e.desc}</p>
              <span className="text-sm font-semibold text-gold-text">{e.price}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/events/recap" className="text-sm text-gold-text hover:underline">
            Видео-рекапы с прошедших событий →
          </Link>
        </div>
      </div>
    </main>
  );
}
