import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны' },
        { status: 400 },
      );
    }

    // Generate order ID
    const orderId = `NV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Log the inquiry (in production: send to CRM / Telegram / email)
    console.log('[QUOTE] Новая заявка:', {
      orderId,
      name: body.name,
      phone: body.phone,
      date: body.date,
      format: body.format,
      tier: body.tier,
      guests: body.guests,
      total: body.total,
      comment: body.comment,
      excludedAllergens: body.excludedAllergens,
      guestGroups: body.guestGroups,
      selectedItems: body.selectedItems,
      source: body.source || 'constructor',
    });

    return NextResponse.json({
      success: true,
      message: 'Заявка принята. Мы свяжемся с вами в течение 15 минут.',
      orderId,
      data: { name: body.name, phone: body.phone, date: body.date },
    });
  } catch (error) {
    console.error('[QUOTE] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
