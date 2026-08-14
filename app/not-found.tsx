import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gold-text/30 mb-4 font-mono text-6xl font-light">404</p>
        <h1 className="font-heading mb-2 text-2xl">Страница не найдена</h1>
        <p className="text-muted-foreground mb-6">Возможно, вы искали меню или события?</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            На главную
          </Link>
          <Link href="/plan" className="text-gold-text text-sm hover:underline">
            Спланировать событие
          </Link>
        </div>
      </div>
    </main>
  );
}
