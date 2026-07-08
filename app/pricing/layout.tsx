import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены | Nilov Catering",
  description: "Стоимость кейтеринга от Nilov Catering — готовые пакеты меню от эконом до премиум. Прозрачные цены без скрытых платежей.",
  alternates: { canonical: "https://odaeda.ru/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}