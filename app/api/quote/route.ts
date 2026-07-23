import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, phone, email, date, format, guests, comment } = parsed.data;

    // TODO: Replace with real integration (Telegram bot / CRM / email)
    console.log('[QUOTE] Новая заявка:', { name, phone, email, date, format, guests, comment });

    return NextResponse.json({
      success: true,
      message: 'Заявка принята. Мы свяжемся с вами в течение 2 часов.',
      data: { name, phone, date },
    });
  } catch (error) {
    console.error('[QUOTE] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
