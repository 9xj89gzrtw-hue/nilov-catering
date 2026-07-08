import type { Metadata } from "next";
import Link from 'next/link';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { pricingPackages } from '@/lib/data';

export const metadata: Metadata = {
  title: "Цены",
  description: "Тарифы на кейтеринг: Эконом, Премиум, VIP. Прозрачные цены без скрытых платежей. Нилов Кейтеринг, Санкт-Петербург.",
};

export default function PricingPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Цены" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Тарифы
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Прозрачные цены без скрытых платежей. Выберите подходящий пакет или обсудите индивидуальные условия.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-lg border p-6 md:p-8 flex flex-col ${
                  pkg.isPopular
                    ? 'border-gold bg-card'
                    : 'border-border bg-card'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-6 text-[10px] uppercase tracking-wider bg-gold text-background px-3 py-1 rounded-sm font-medium">
                    Популярный
                  </span>
                )}

                <h2 className="font-heading text-2xl font-semibold text-cream">{pkg.name}</h2>
                <p className="text-xs text-cream-muted mt-1">{pkg.description}</p>

                <div className="mt-6">
                  <span className="font-heading text-4xl font-semibold text-cream">
                    {pkg.pricePerPerson.toLocaleString('ru-RU')}
                  </span>
                  <span className="text-sm text-cream-muted ml-1">₽ / гость</span>
                </div>

                {pkg.minGuests && (
                  <p className="text-[11px] text-cream-muted mt-1">
                    от {pkg.minGuests} гостей
                  </p>
                )}

                <div className="mt-6 space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <p key={f} className="text-sm text-cream/70 flex items-start gap-2">
                      <span className="text-gold mt-0.5">·</span>
                      {f}
                    </p>
                  ))}
                </div>

                {pkg.includes && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-[10px] uppercase tracking-wider text-cream-muted mb-2">Включает</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.includes.map((inc) => (
                        <span key={inc} className="text-[10px] bg-muted text-cream-muted px-2 py-0.5 rounded-sm">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className={`mt-8 text-center text-xs uppercase tracking-wider py-3 rounded-sm transition-colors duration-200 ${
                    pkg.isPopular
                      ? 'bg-burgundy text-cream hover:bg-burgundy-light'
                      : 'border border-border text-cream hover:border-gold hover:text-gold'
                  }`}
                >
                  Обсудить
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}