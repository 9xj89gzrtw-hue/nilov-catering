import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ConstructorClient from "./ConstructorClient";

export const metadata: Metadata = {
  title: "Конструктор меню — соберите кейтеринг за 2 минуты",
  description: "Соберите кейтеринг онлайн: формат, гости, тариф, доп. услуги. Мгновенный расчёт стоимости без скрытых платежей.",
};

export default function ConstructorPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Конструктор" }]} />
        </div>
      </div>
      <ConstructorClient />
    </>
  );
}
