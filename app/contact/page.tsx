import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с Нилов Кейтеринг: телефон, email, адрес. Обсудим ваше мероприятие и подготовим предложение.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Контакты" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Контакты
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Расскажите о вашем мероприятии — мы подготовим предложение с персональным меню.
          </p>
        </div>
      </div>
      <ContactClient />
    </>
  );
}