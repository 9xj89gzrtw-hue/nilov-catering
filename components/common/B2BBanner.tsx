import Link from 'next/link';

export default function B2BBanner({ variant = 'inline' }: { variant?: 'inline' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-tint border border-gold-text/30 text-gold-text text-xs">
        B2B: НДС 20% / без НДС · ЭДО Диадок+СБИС
        <Link href="/contact?subject=B2B-тендер" className="underline font-medium no-underline hover:text-foreground transition-colors">КП →</Link>
      </div>
    );
  }
  return (
    <div className="p-4 rounded-xl border border-gold-text/30 bg-gold-tint/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="text-sm">
        <p className="font-medium text-foreground">B2B и тендеры</p>
        <p className="text-muted-foreground text-xs mt-0.5">Без НДС (УСН). НДС через партнёрское ООО. ЭДО: Контур.Диадок, СБИС. Договор: ИП Нилов Д.И., ИНН 781433059704.</p>
      </div>
      <Link href="/contact?subject=B2B-тендер" className="rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:bg-foreground/90 no-underline whitespace-nowrap">
        Запросить КП →
      </Link>
    </div>
  );
}
