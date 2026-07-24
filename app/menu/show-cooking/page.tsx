import type { Metadata } from 'next';
import MenuTariffs from '@/components/blocks/MenuTariffs';

export const metadata: Metadata = {
  title: 'Show-cooking',
  description: 'Интерактивные кулинарные станции NiloV: еда как шоу. Шеф-повар готовит при гостях.',
};

export default function ShowCookingPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-2xl">
        <h1 className="mb-2">Show-cooking</h1>
        <p className="text-muted-foreground mb-2">
          Еда как шоу. Шеф-повар готовит при гостях — от вок-станции до десертного бара. Идеально для фуршетов и вечеринок.
        </p>
        <p className="text-xs text-muted-foreground mb-8">Цены демо. Минимум 15 гостей для любой станции.</p>

        <MenuTariffs format="show-cooking" formatLabel="Show-cooking" />

        <div className="mt-10 p-5 rounded-xl border border-dashed border-line bg-card/50">
          <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
          <p className="text-xs text-muted-foreground mb-3">Шеф соберёт меню под ваш бюджет, формат и пожелания.</p>
          <a href="/plan/constructor?format=show-cooking" className="text-sm text-gold-text font-semibold hover:underline">
            Составить меню с шефом →
          </a>
        </div>
      </div>
    </main>
  );
}