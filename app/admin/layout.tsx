export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <a href="/admin" className="font-bold text-lg">🍽️ NiloV CMS</a>
        <a href="/" className="text-sm text-gray-400 hover:text-white" target="_blank">→ сайт</a>
      </header>
      <div className="flex">
        <nav className="w-56 border-r border-gray-700 min-h-[calc(100vh-49px)] p-4 space-y-1">
          <NavLink href="/admin">📋 Дашборд</NavLink>
          <NavLink href="/admin/dishes">🍽️ Блюда</NavLink>
          <NavLink href="/admin/pricing">💰 Цены</NavLink>
          <NavLink href="/admin/trust-proof">🛡️ Доверие</NavLink>
          <NavLink href="/admin/page-texts">📝 Тексты</NavLink>
          <NavLink href="/admin/reviews">⭐ Отзывы</NavLink>
          <NavLink href="/admin/videos">🎬 Видео</NavLink>
        </nav>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="block px-3 py-2 rounded hover:bg-gray-800 text-sm transition-colors">
      {children}
    </a>
  );
}