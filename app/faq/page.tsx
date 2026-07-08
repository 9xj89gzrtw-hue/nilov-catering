import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description: "Частые вопросы о кейтеринге: заказ, меню, оплата, доставка, лицензии. Нилов Кейтеринг, Санкт-Петербург.",
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
    </>
  );
}