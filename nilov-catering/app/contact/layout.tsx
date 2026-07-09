import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | Nilov Catering",
  description: "Свяжитесь с командой Nilov Catering — телефоны, email, адрес офиса. Обсудите ваше мероприятие и получите индивидуальный расчёт.",
  alternates: { canonical: "https://nilov-catering.ru/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}