import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню | Nilov Catering",
  description: "Авторское меню кейтеринга от шеф-повара Дмитрия Нилова — закуски, горячие блюда, десерты и напитки для вашего мероприятия.",
  alternates: { canonical: "https://nilov-catering.ru/menu" },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}