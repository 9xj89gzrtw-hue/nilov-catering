import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-6xl font-light text-gold-text/30 mb-4">404</p>
        <h1 className="text-2xl font-heading mb-2">Страница не найдена</h1>
        <p className="text-muted-foreground mb-6">Возможно, вы искали меню или события?</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">На главную</Link>
          <Link href="/plan" className="text-sm text-gold-text hover:underline">Спланировать событие</Link>
        </div>
      </div>
    </main>
  );
}
