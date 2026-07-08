import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заявка | Nilov Catering",
  description: "Оставьте заявку на расчёт кейтеринга для вашего мероприятия. Быстрый ответ от команды Nilov Catering и индивидуальное предложение.",
  alternates: { canonical: "https://odaeda.ru/quote" },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}