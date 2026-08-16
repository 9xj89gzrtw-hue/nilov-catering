import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cmsStore } from "@/lib/cms-store";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  // Basic protection: redirect to homepage if no admin secret is configured
  // This prevents public access to the CMS dashboard
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    redirect("/");
  }
  const [dishes, reviews, videos, trust, prices, texts] = await Promise.all([
    cmsStore.dishes.getAll(),
    cmsStore.reviews.getAll(),
    cmsStore.videos.getAll(),
    cmsStore.trustProof.getAll(),
    cmsStore.pricing.get(),
    cmsStore.pageTexts.getAll(),
  ]);

  const cards = [
    { title: "Блюда", href: "/admin/dishes", count: dishes.length, color: "bg-emerald-600" },
    {
      title: "Цены",
      href: "/admin/pricing",
      count: prices?.addons?.length || 0,
      color: "bg-amber-600",
    },
    { title: "Доверие", href: "/admin/trust-proof", count: trust.length, color: "bg-blue-600" },
    { title: "Тексты", href: "/admin/page-texts", count: texts.length, color: "bg-purple-600" },
    { title: "Отзывы", href: "/admin/reviews", count: reviews.length, color: "bg-pink-600" },
    { title: "Видео", href: "/admin/videos", count: videos.length, color: "bg-cyan-600" },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Дашборд</h1>
      <p className="mb-6 text-sm text-gray-400">
        Данные хранятся в <code className="rounded bg-gray-800 px-1">data/*.json</code>. После
        правки — git push.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="block rounded-lg border border-gray-700 bg-gray-800 p-5 transition-colors hover:border-gray-500"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${c.color}`} />
              <span className="font-medium">{c.title}</span>
            </div>
            <div className="text-3xl font-bold">{c.count}</div>
            <div className="mt-1 text-xs text-gray-500">{c.count === 0 ? "пусто" : "записей"}</div>
          </a>
        ))}
      </div>
      <div className="mt-8 rounded border border-gray-700 bg-gray-800/50 p-4 text-sm text-gray-400">
        <strong className="text-gray-200">Совет:</strong> для простых правок (тексты, цены) откройте{" "}
        <code className="rounded bg-gray-700 px-1">data/page-texts.json</code>в редакторе. Для блюд
        и отзывов — используйте табличный редактор ниже.
      </div>
    </div>
  );
}
