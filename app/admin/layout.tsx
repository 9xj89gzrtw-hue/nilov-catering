import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: { absolute: "CMS — NiloV Catering" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth check — redirect if no admin secret in cookie or header
  const headersList = await headers();
  const adminSecret =
    headersList.get("x-admin-secret") ||
    headersList.get("cookie")?.match(/admin-secret=([^;]+)/)?.[1];

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
        <div className="p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">CMS — требуется авторизация</h1>
          <p className="mb-4 text-gray-400">Доступ к CMS только для авторизованного персонала.</p>
          <Link href="/" className="text-sm text-blue-400 hover:underline">
            ← На главную
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      <header className="flex items-center justify-between border-b border-gray-700 px-6 py-3">
        <Link href="/admin" className="text-lg font-bold">
          NiloV CMS
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-white" target="_blank">
          → сайт
        </Link>
      </header>
      <div className="flex">
        <nav className="min-h-[calc(100vh-49px)] w-56 space-y-1 border-r border-gray-700 p-4">
          <NavLink href="/admin">Дашборд</NavLink>
          <NavLink href="/admin/dishes">Блюда</NavLink>
          <NavLink href="/admin/pricing">Цены</NavLink>
          <NavLink href="/admin/trust-proof">Доверие</NavLink>
          <NavLink href="/admin/page-texts">Тексты</NavLink>
          <NavLink href="/admin/reviews">⭐ Отзывы</NavLink>
          <NavLink href="/admin/videos">Видео</NavLink>
        </nav>
        <main id="main" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm transition-colors hover:bg-gray-800"
    >
      {children}
    </Link>
  );
}
