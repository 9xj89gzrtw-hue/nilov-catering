import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея | Nilov Catering",
  description: "Фотографии с мероприятий от Nilov Catering — свадьбы, корпоративы, частные праздники. Оцените качество подачи и сервиса.",
  alternates: { canonical: "https://nilov-catering.ru/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}