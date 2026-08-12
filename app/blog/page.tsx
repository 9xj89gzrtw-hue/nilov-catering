import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Блог — кейтеринг, советы, кейсы',
  description: 'Статьи о кейтеринге: выбор формата, аллергены, свадебный банкет, сезонное меню, кофе-брейк. Практические советы от шеф-повара NiloV Catering с 2007 года.',
  alternates: { canonical: '/blog', languages: { 'ru': '/blog', 'x-default': '/blog' } },
};

const ARTICLES = [
  { t: 'Как выбрать формат кейтеринга: фуршет или банкет?', d: '10 июля 2026', slug: 'furshet-vs-banket', desc: 'Разбор плюсов и минусов двух главных форматов. Когда фуршет выигрывает, а когда без банкета не обойтись.', words: 180, category: 'Форматы' },
  { t: '14 аллергенов: почему маркировка важна для вашего события', d: '1 июля 2026', slug: 'allergeny-markirovka', desc: 'Что требует ТР ТС 022/2011 и как мы защищаем гостей с пищевой непереносимостью.', words: 200, category: 'Безопасность' },
  { t: 'Свадебный кейтеринг: 5 вещей, о которых забывают', d: '15 июня 2026', slug: 'svadebnyi-keitering-5-veshei', desc: 'Координатор, дегустация, детское меню и другие детали, которые спасают свадьбу.', words: 230, category: 'Свадьба' },
  { t: 'Сезонное меню: лето 2026', d: '1 июня 2026', slug: 'sezonnoe-menyu-leto-2026', desc: 'Гриль, холодные супы, ягодные десерты — что мы готовим этим летом.', words: 210, category: 'Сезонное' },
  { t: 'Кофе-брейк на конференции: как не ошибиться', d: '15 мая 2026', slug: 'kofe-breik-na-konferentsii', desc: 'Сколько кофе на человека, какие закуски выбрать и почему круассаны — не всегда хорошая идея.', words: 220, category: 'B2B' },
];

function readTime(words: number): string {
  return `${Math.max(1, Math.ceil(words / 200))} мин`;
}

export default function BlogPage() {
  return (
    <main id="main" className="pt-24 pb-20"><div className="container-site max-w-2xl">
      <h1 className="mb-2 font-heading text-3xl md:text-4xl font-medium">Блог</h1>
      <p className="text-muted-foreground mb-8">Советы, кейсы и сезонные идеи от шеф-повара NiloV Catering. Практический опыт с 2007 года.</p>
      <div className="space-y-4">
        {ARTICLES.map((a) =>(
          <Link key={a.slug} href={`/blog/${a.slug}`} className="block rounded-xl border border-line bg-card p-5 hover:border-gold-text transition-colors no-underline">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gold-text uppercase tracking-wider">{a.category}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{readTime(a.words)}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{a.d}</span>
            </div>
            <h2 className="font-heading text-lg font-medium mb-2">{a.t}</h2>
            <p className="text-sm text-muted-foreground">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}
