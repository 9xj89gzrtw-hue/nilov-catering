import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MenuPageClient from "./MenuPageClient";

export const metadata: Metadata = {
  title: "Меню",
  description: "Авторское меню кейтеринга: закуски, горячие блюда, гарниры, десерты, напитки и сет-меню. Выберите идеальный набор для вашего мероприятия.",
};

export default function MenuPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Меню" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Наше меню
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Каждое блюдо готовится из свежих продуктов шеф-поваром. Выберите позиции для вашего мероприятия или обратитесь за индивидуальным меню.
          </p>
        </div>
      </div>
      <MenuPageClient />
    </>
  );
}