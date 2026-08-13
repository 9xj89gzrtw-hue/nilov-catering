import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — оставить заявку",
  description:
    "Оставьте заявку на кейтеринг в СПб. Перезвоним за 15 минут. Тел: +7 (812) 919-59-11.",
  alternates: { canonical: "/contact", languages: { ru: "/contact", "x-default": "/contact" } },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
