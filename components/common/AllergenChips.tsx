import { ALLERGEN_LABEL } from '@/lib/types';
import type { Dish } from '@/lib/types';

const HIGH_RISK_ALLERGENS = ['nuts', 'peanuts', 'gluten', 'fish', 'crustaceans', 'molluscs'];

/**
 * AllergenChips — reduced visual noise per C8/C3/C4/C1.
 *
 * Previously: up to 3 colored text badges + "+N" badge on the image,
 * creating "ripple" effect when scanning the catalog (C8 perceptual load).
 *
 * Now: a single subtle indicator. If the dish has high-risk allergens
 * (anaphylaxis risk: nuts/peanuts/gluten/fish/crustaceans/molluscs),
 * show ONE compact red badge with the count. Otherwise show nothing on
 * the image — full allergen info is available in the card body and via
 * the "i" detail view. This shifts allergen scanning from "decode 3+
 * colored chips per card" to "spot red = caution" (pre-attentive).
 *
 * The title attribute provides full allergen names on hover for sighted
 * users; screen readers get the aria-label.
 */
export function AllergenChips({ dish, className = '' }: { dish: Dish; className?: string }) {
  if (!dish.allergens || dish.allergens.length === 0) return null;

  const highRisk = dish.allergens.filter(a => HIGH_RISK_ALLERGENS.includes(a));

  // No high-risk allergens → no on-image badge. Reduces visual noise.
  // Low-risk allergens (milk, eggs, soy, etc.) are shown in the card body.
  if (highRisk.length === 0) return null;

  const labels = highRisk.map(a => ALLERGEN_LABEL[a]).join(', ');

  return (
    <div
      className={`absolute top-1.5 right-1.5 z-10 ${className}`}
      title={`Высокий риск анафилаксии: ${labels}. Полный список аллергенов — в карточке блюда.`}
    >
      <span
        className="inline-flex items-center gap-1 rounded-full bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 ring-1 ring-white shadow-sm"
        aria-label={`Внимание: блюдо содержит аллергены высокого риска: ${labels}`}
      >
        <span aria-hidden="true">⚠</span>
        {highRisk.length}
      </span>
    </div>
  );
}
