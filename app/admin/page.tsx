import { cmsStore } from '@/lib/cms-store';

export default async function AdminDashboard() {
  const [dishes, reviews, videos, trust, prices, texts] = await Promise.all([
    cmsStore.dishes.getAll(),
    cmsStore.reviews.getAll(),
    cmsStore.videos.getAll(),
    cmsStore.trustProof.getAll(),
    cmsStore.pricing.get(),
    cmsStore.pageTexts.getAll(),
  ]);

  const cards = [
    { title: 'Блюда', href: '/admin/dishes', count: dishes.length, color: 'bg-emerald-600' },
    { title: 'Цены', href: '/admin/pricing', count: prices?.addons?.length || 0, color: 'bg-amber-600' },
    { title: 'Доверие', href: '/admin/trust-proof', count: trust.length, color: 'bg-blue-600' },
    { title: 'Тексты', href: '/admin/page-texts', count: texts.length, color: 'bg-purple-600' },
    { title: 'Отзывы', href: '/admin/reviews', count: reviews.length, color: 'bg-pink-600' },
    { title: 'Видео', href: '/admin/videos', count: videos.length, color: 'bg-cyan-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Дашборд</h1>
      <p className="text-gray-400 text-sm mb-6">Данные хранятся в <code className="bg-gray-800 px-1 rounded">data/*.json</code>. После правки — git push.</p>
      <div className="grid grid-cols-3 gap-4">
        {cards.map(c => (
          <a key={c.title} href={c.href} className="block p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${c.color}`} />
              <span className="font-medium">{c.title}</span>
            </div>
            <div className="text-3xl font-bold">{c.count}</div>
            <div className="text-xs text-gray-500 mt-1">{c.count === 0 ? 'пусто' : 'записей'}</div>
          </a>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-800/50 rounded border border-gray-700 text-sm text-gray-400">
        <strong className="text-gray-200">💡 Совет:</strong> для простых правок (тексты, цены) откройте{' '}
        <code className="bg-gray-700 px-1 rounded">data/page-texts.json</code> в редакторе. Для блюд и отзывов — используйте табличный редактор ниже.
      </div>
    </div>
  );
}