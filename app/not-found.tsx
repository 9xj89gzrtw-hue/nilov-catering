import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <p className="font-heading text-8xl md:text-9xl font-semibold text-gold/20">404</p>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-cream mt-4">
          Страница не найдена
        </h1>
        <p className="text-sm text-cream-muted mt-3 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 btn-primary text-xs uppercase tracking-wider"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}