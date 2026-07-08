"use client";

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <p className="font-heading text-6xl font-semibold text-burgundy">Ошибка</p>
        <p className="text-sm text-cream-muted mt-4 max-w-md mx-auto">
          Что-то пошло не так. Попробуйте обновить страницу или вернуться на главную.
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