import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Кофе-брейк — кейтеринг для конференций — NiloV Catering" },
  description:
    "Кофе-брейк для конференций и семинаров в СПб. Кофе, выпечка, десерты. От 390 ₽/гость. Многодневные конференции — скидка 20%.",
  alternates: {
    canonical: "/menu/coffee-break",
    languages: { ru: "/menu/coffee-break", "x-default": "/menu/coffee-break" },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
