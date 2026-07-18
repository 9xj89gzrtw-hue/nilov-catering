import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Часто задаваемые вопросы",
  description: "Ответы на популярные вопросы о кейтеринге: заказ, меню, цены, логистика.",
};

export default function FAQPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Частые вопросы
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Собрали самые популярные вопросы о нашем сервисе. Не нашли ответ? Позвоните нам.
          </p>
        </div>
      </div>
      <FAQClient />
      <section className="py-20 px-6 text-center border-t border-border/20">
        <h2 className="font-heading text-3xl font-semibold mb-4">Остались вопросы?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Свяжитесь с нами — мы с радостью ответим на все ваши вопросы</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-medium rounded-[4px] hover:bg-accent/90 transition-colors">
            Оставить заявку
          </a>
          <a href="tel:+78129195911" className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-foreground font-medium rounded-[4px] hover:bg-border/10 transition-colors">
            +7 (812) 919-59-11
          </a>
        </div>
      </section>
    </>
  );
}