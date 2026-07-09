import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Галерея",
  description: "Фотографии мероприятий от Нилов Кейтеринг: свадьбы, корпоративы, банкеты и фуршеты в Санкт-Петербурге.",
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-20 md:pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Галерея" }]} />
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Портфолио</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Наши
              <br />
              <span className="text-cream/40">мероприятия</span>
            </h1>
          </div>
        </div>
      </div>
      <GalleryClient />
    </>
  );
}