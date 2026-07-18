import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MenuPageClient from "./MenuPageClient";

export const metadata: Metadata = {
  title: "Меню",
  description: "Авторское меню кейтеринга: канапе, горячие блюда, десерты и напитки для любого мероприятия.",
};

export default function MenuPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Меню" }]} />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Наше меню</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Авторская
              <br />
              <span className="text-cream/40">гастрономия</span>
            </h1>
            <p className="mt-4 text-sm text-cream-muted max-w-lg leading-relaxed">
              Каждое блюдо готовится из свежих продуктов шеф-поваром. Выберите позиции или обратитесь за индивидуальным меню.
            </p>
          </div>
        </div>
      </div>
      <MenuPageClient />
      <section className="py-20 md:py-28 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Индивидуально</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-cream leading-[0.95] mb-6">
            Готовы обсудить
            <br />
            <span className="text-cream/40">меню?</span>
          </h2>
          <p className="text-sm text-cream-muted mb-10 max-w-md mx-auto leading-relaxed">
            Мы подготовим индивидуальное предложение для вашего мероприятия
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary text-xs uppercase tracking-wider cursor-hover">
              Оставить заявку
            </a>
            <a href="tel:+78129195911" className="btn-outline text-xs uppercase tracking-wider cursor-hover">
              +7 (812) 919-59-11
            </a>
          </div>
        </div>
      </section>
    </>
  );
}