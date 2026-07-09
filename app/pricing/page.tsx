import type { Metadata } from "next";
import Link from 'next/link';
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { pricingPackages } from '@/lib/data';

export const metadata: Metadata = {
  title: "Цены",
  description: "Стоимость кейтеринга: пакеты для мероприятий любого масштаба. Прозрачные цены без скрытых платежей.",
};

export default function PricingPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Цены" }]} />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Стоимость</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Тарифы
            </h1>
            <p className="mt-4 text-sm text-cream-muted max-w-lg leading-relaxed">
              Прозрачные цены без скрытых платежей. Выберите подходящий пакет или обсудите индивидуальные условия.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricingPackages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col p-6 md:p-8 transition-all duration-500 ${
                  pkg.isPopular
                    ? 'bg-card border border-gold/30 md:-my-3 md:py-12'
                    : 'bg-card border border-border hover:border-border-light'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-6 text-[9px] uppercase tracking-[0.2em] bg-gold text-[#0A0A0A] px-4 py-1.5 rounded-sm font-medium">
                    Популярный
                  </span>
                )}

                <span className="text-[10px] uppercase tracking-widest text-cream-muted/50 font-mono mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h2 className="font-heading text-2xl font-semibold text-cream">{pkg.name}</h2>
                <p className="text-xs text-cream-muted mt-2 leading-relaxed">{pkg.description}</p>

                <div className="mt-8">
                  <span className="font-heading text-4xl md:text-5xl font-semibold text-cream">
                    {pkg.pricePerPerson.toLocaleString('ru-RU')}
                  </span>
                  <span className="text-sm text-cream-muted ml-1.5">&#8381; / гость</span>
                </div>

                {pkg.minGuests && (
                  <p className="text-[10px] text-cream-muted/60 mt-1.5 uppercase tracking-wider">
                    от {pkg.minGuests} гостей
                  </p>
                )}

                <div className="mt-8 space-y-3 flex-1">
                  {pkg.features.map((f) => (
                    <p key={f} className="text-sm text-cream/60 flex items-start gap-3 leading-relaxed">
                      <span className="text-gold/60 mt-0.5 shrink-0">&middot;</span>
                      {f}
                    </p>
                  ))}
                </div>

                {pkg.includes && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-cream-muted/60 mb-3">Включает</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.includes.map((inc) => (
                        <span key={inc} className="text-[10px] text-cream-muted/80 border border-border px-2.5 py-1 rounded-full">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className={`mt-8 text-center text-[10px] uppercase tracking-widest py-3.5 transition-all duration-300 cursor-hover block ${
                    pkg.isPopular
                      ? 'btn-primary'
                      : 'border border-border text-cream hover:border-gold hover:text-gold'
                  }`}
                >
                  Обсудить
                </Link>
              </div>
            ))}
          </div>

          {/* Custom note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-cream-muted leading-relaxed max-w-md mx-auto">
              Индивидуальное меню и формат рассчитываются отдельно. Свяжитесь с нами для получения персонального предложения.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}