import { NextResponse } from 'next/server';
import { calculatorInputSchema } from '@/lib/schemas';
import { calcTotal } from '@/lib/pricing';
import { PRICE_PER_GUEST, ADDONS } from '@/lib/constants';
import type { AddOn } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = calculatorInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { format, guests, tier, addonIds, childGuests, bookingDays } = parsed.data;

    const selectedAddons: AddOn[] = addonIds
      ? ADDONS.filter(a => addonIds.includes(a.id))
      : [];

    const result = calcTotal(guests, format, tier === 'custom' ? 'standard' : tier, selectedAddons, {
      discounts: true,
      bookingDays: bookingDays ?? 0,
      childGuests: childGuests ?? 0,
      serviceBreakdown: true,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[CALCULATE] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
