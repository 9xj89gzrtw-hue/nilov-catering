import Link from 'next/link';

export default function B2BBanner({ variant = 'inline' }: { variant?: 'inline' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs">
         B2B: НДС 20% / без НДС · ЭДО Диадок+СБИС
        <Link href="/contact?subject=B2B-тендер" className="underline font-medium">КП →</Link>
      </div>
    );
  }
  return (
    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="text-sm">
        <p className="font-medium text-blue-900"> B2B и тендеры</p>
        <p className="text-blue-800 text-xs mt-0.5">Работаем с НДС 20% и без НДС. ЭДО: Контур.Диадок, СБИС. Договор: ИП Нилов Д.И., ИНН 781433059704.</p>
      </div>
      <Link href="/contact?subject=B2B-тендер" className="rounded-lg bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 no-underline whitespace-nowrap">
        Запросить КП →
      </Link>
    </div>
  );
}
