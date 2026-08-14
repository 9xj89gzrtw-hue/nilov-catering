import Link from "next/link";

export default function B2BBanner({ variant = "inline" }: { variant?: "inline" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="bg-gold-tint border-gold-text/30 text-gold-text inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs">
        B2B: НДС 20% / без НДС · ЭДО Диадок+СБИС
        <Link
          href="/contact?subject=B2B-тендер"
          className="hover:text-foreground font-medium no-underline underline transition-colors"
        >
          КП →
        </Link>
      </div>
    );
  }
  return (
    <div className="border-gold-text/30 bg-gold-tint/30 flex flex-col items-start justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
      <div className="text-sm">
        <p className="text-foreground font-medium">B2B и тендеры</p>
        <p className="text-muted-foreground mt-0.5 text-xs">
          Без НДС (УСН). НДС через партнёрское ООО. ЭДО: Контур.Диадок, СБИС. Договор: ИП Нилов
          Д.И., ИНН 781433059704.
        </p>
      </div>
      <Link
        href="/contact?subject=B2B-тендер"
        className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap no-underline"
      >
        Запросить КП →
      </Link>
    </div>
  );
}
