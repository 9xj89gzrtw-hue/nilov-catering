import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Сезонные предложения' };

export default function SeasonalPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site">
      <h1 className="text-center mb-4">Сезонные предложения</h1>
      <p className="text-center text-muted-foreground mb-16">Специальные форматы по сезону.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {[
          { title: 'ББQ-лето', desc: 'Гриль-меню на открытом воздухе', href: '/seasonal/bbq' },
          { title: 'Новый год', desc: 'Корпоративы и частные вечеринки', href: '/seasonal/new-year' },
          { title: 'Масленица', desc: 'Блины, самовар, народные гуляния', href: '/seasonal/maslenitsa' },
        ].map((s) => (
          <Link key={s.title} href={s.href} className="rounded-xl border border-line bg-card p-6 text-center hover:border-gold-text transition-colors">
            <h2 className="font-heading text-xl font-medium mb-2">{s.title}</h2>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div></main>
  );
}
