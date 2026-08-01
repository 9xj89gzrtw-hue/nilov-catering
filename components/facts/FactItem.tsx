import type { ReactNode } from 'react';
import type { FactStatus } from '@/lib/types';

export interface FactGatedItem {
  status: FactStatus;
  claim: ReactNode;
  disclaimer?: string;
}

/**
 * Факт-гейт: рендерит claim с индикатором статуса.
 * Если status === 'pending' — добавляет индикатор и дисклеймер.
 * Чистая функция — можно использовать как в Server, так и в Client Components.
 *
 * Сигнатура: renderFactItem({ status, claim, disclaimer })
 */
export function renderFactItem({ status, claim, disclaimer }: FactGatedItem) {
  if (status === 'pending') {
    return (
      <span
        className="inline-flex flex-col items-center gap-0.5 text-center"
        title={disclaimer ?? 'На проверке'}
      >
        <span className="text-xs md:text-sm tracking-wider uppercase font-medium text-foreground">
          {claim}
        </span>
        <span
          className="text-xs text-muted-foreground flex items-center gap-1 select-none"
          aria-hidden="true"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-text" />
          проверка
        </span>
      </span>
    );
  }

  return (
    <span className="text-xs md:text-sm tracking-wider uppercase font-medium text-foreground">
      {claim}
    </span>
  );
}
