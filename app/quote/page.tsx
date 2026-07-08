"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import QuoteForm from "@/components/quote/QuoteForm";

export default function QuotePage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Заказать расчёт", href: "/quote" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Заказать расчёт</h1>
          <p className="text-primary-foreground/70 text-lg">Заполните форму и мы подготовим индивидуальное предложение</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
