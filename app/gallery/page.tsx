import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Галерея",
  description: "Фотографии с наших мероприятий — свадьбы, корпоративы, частные ужины и фуршеты.",
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
      <section className="py-20 px-6 text-center border-t border-border/20">
        <h2 className="font-heading text-3xl font-semibold mb-4">Хотите так же?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Расскажите о вашем мероприятии — мы создадим такое же незабываемое впечатление</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-medium rounded-[4px] hover:bg-accent/90 transition-colors">
            Оставить заявку
          </a>
          <a href="tel:+78121234567" className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-foreground font-medium rounded-[4px] hover:bg-border/10 transition-colors">
            +7 (812) 123-45-67
          </a>
        </div>
      </section>
    </>
  );
}