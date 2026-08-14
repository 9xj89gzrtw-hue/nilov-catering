import type { Metadata } from "next";
import MenuTariffs from "@/components/blocks/MenuTariffs";

export const metadata: Metadata = {
  title: { absolute: "Шоу-кукинг — кейтеринг с шоу-станциями — NiloV Catering" },
  description: "Интерактивные кулинарные станции NiloV: еда как шоу. Шеф-повар готовит при гостях.",
  alternates: {
    canonical: "/menu/show-cooking",
    languages: { ru: "/menu/show-cooking", "x-default": "/menu/show-cooking" },
  },
};

export default function ShowCookingPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-2">Шоу-кукинг</h1>
        <p className="text-muted-foreground mb-2">
          Еда как шоу. Шеф-повар готовит при гостях — от вок-станции до десертного бара. Идеально
          для фуршетов и вечеринок.
        </p>
        <p className="text-muted-foreground mb-8 text-xs">
          Минимум 20 гостей для любой станции. Финальная смета рассчитывается индивидуально.
        </p>

        <MenuTariffs format="show-cooking" formatLabel="Шоу-кукинг" />

        <div className="border-line bg-card/50 mt-10 rounded-xl border border-dashed p-5">
          <p className="mb-1 text-sm font-medium">Не нашли своё? Составим индивидуально</p>
          <p className="text-muted-foreground mb-3 text-xs">
            Шеф соберёт меню под ваш бюджет, формат и пожелания.
          </p>
          <a
            href="/plan/constructor?format=show-cooking"
            className="text-gold-text text-sm font-semibold hover:underline"
          >
            Составить меню с шефом →
          </a>
        </div>
      </div>
    </main>
  );
}
