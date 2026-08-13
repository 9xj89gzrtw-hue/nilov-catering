import type { Metadata } from "next";
import { MenuJsonLd } from "@/app/JsonLd";

export const metadata: Metadata = {
  title: "Меню кейтеринга",
  description:
    "Полный каталог кейтеринг-меню: фуршет, банкет, кофе-брейк, халяль, веган, без глютена. 124 блюда с фото, аллергенами, составом.",
  alternates: { canonical: "/menu", languages: { ru: "/menu", "x-default": "/menu" } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuJsonLd />
      {children}
    </>
  );
}
