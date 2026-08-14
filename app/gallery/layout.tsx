import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery", languages: { ru: "/gallery", "x-default": "/gallery" } },
  title: "Галерея — фото мероприятий",
  description:
    "Фото с наших мероприятий: свадьбы, корпоративы, банкеты, фуршеты, детские праздники. Реальные события NiloV Catering.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
