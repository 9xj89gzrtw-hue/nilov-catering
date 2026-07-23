import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Блог NiloV Catering',
  description: 'Советы, кейсы, сезонные идеи от команды NiloV Catering. Ресторанный кейтеринг в Петербурге.',
};

const ARTICLES = [
  { t: 'Как выбрать формат кейтеринга: фуршет или банкет?', d: '10.07.2026', slug: 'furshet-vs-banket', desc: 'Разбор плюсов и минусов двух главных форматов. Когда фуршет выигрывает, а когда без банкета не обойтись.' },
  { t: '14 аллергенов: почему маркировка важна для вашего события', d: '01.07.2026', slug: 'allergeny-markirovka', desc: 'Что требует ТР ТС 022/2011 и как мы защищаем гостей с пищевой непереносимостью.' },
  { t: 'Свадебный кейтеринг: 5 вещей, о которых забывают', d: '15.06.2026', slug: 'svadebnyi-keitering-5-veshei', desc: 'Координатор, дегустация, детское меню и другие детали, которые спасают свадьбу.' },
  { t: 'Сезонное меню: лето 2026', d: '01.06.2026', slug: 'sezonnoe-menyu-leto-2026', desc: 'Гриль, холодные супы, ягодные десерты — что мы готовим этим летом.' },
  { t: 'Кофе-брейк на конференции: как не ошибиться', d: '15.05.2026', slug: 'kofe-breik-na-konferentsii', desc: 'Сколько кофе на человека, какие закуски выбрать и почему круассаны — не всегда хорошая идея.' },
];

export default function BlogPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-2">Блог</h1>
      <p className="text-muted-foreground mb-12">Советы, кейсы и сезонные идеи от команды NiloV. Статьи — демо, реальный контент добавляется с заказчиком.</p>
      <div className="space-y-6">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="block rounded-xl border border-line bg-card p-5 hover:border-gold-text transition-colors">
            <p className="text-xs text-muted-foreground mb-1">{a.d}</p>
            <h2 className="font-heading text-lg font-medium mb-2">{a.t}</h2>
            <p className="text-sm text-muted-foreground">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}