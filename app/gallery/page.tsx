import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Галерея",
  description: "Фотографии с наших мероприятий — свадьбы, корпоративы, частные праздники и фуршеты в Санкт-Петербурге.",
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Галерея" }]} />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream mt-4">
            Галерея
          </h1>
          <p className="mt-3 text-sm text-cream-muted max-w-xl">
            Фотографии с наших мероприятий. Каждое событие — уникальная история.
          </p>
        </div>
      </div>
      <GalleryClient />
    </>
  );
}