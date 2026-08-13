import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/data";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ warning?: string }>;
}): Promise<Metadata> {
  const { warning } = await searchParams;
  const isFailed = warning === "delivery-failed";
  return {
    title: isFailed ? "Заявка не отправлена" : "Заявка принята",
    robots: { index: false },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ warning?: string; orderId?: string }>;
}) {
  const { warning, orderId } = await searchParams;
  const isFailed = warning === "delivery-failed";

  return (
    <main id="main" className="flex min-h-screen items-center justify-center pt-24 pb-20">
      <div className="container-site max-w-lg text-center">
        {isFailed ? (
          <>
            <div className="mb-4 text-5xl">⚠️</div>
            <h1>Заявка не отправлена</h1>
            <p className="text-muted-foreground mt-4 mb-2 text-lg">
              Временная ошибка отправки. Приносим извинения — пожалуйста, позвоните нам:
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="bg-primary text-primary-foreground my-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
            <p className="text-muted-foreground mb-8 text-sm">
              Мы сразу примем заказ по телефону. Рабочее время: 9:00–21:00.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 text-5xl">✅</div>
            <h1>Заявка принята!</h1>
            <p className="text-muted-foreground mt-4 mb-8 text-lg">
              Менеджер перезвонит вам в течение 15 минут в рабочее время (9:00–21:00).
              {orderId && (
                <span className="mt-2 block text-sm">
                  Номер заявки: <strong>{orderId}</strong>
                </span>
              )}
            </p>
          </>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/plan"
            className="bg-primary text-primary-foreground inline-flex min-h-[44px] items-center rounded-lg px-6 py-3 text-sm font-semibold"
          >
            К спланированному событию
          </Link>
          <Link
            href="/"
            className="text-gold-text inline-flex min-h-[44px] items-center px-2 text-sm hover:underline"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
