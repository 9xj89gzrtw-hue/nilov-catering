import { NextResponse } from 'next/server';

/**
 * POST /api/newsletter
 *
 * Подписка на ежемесячную рассылку сезонных предложений.
 * В проде: интеграция с MailerLite / SendGrid / Unisender.
 * В текущей реализации: логирование + возврат success.
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let email: string;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = String(body.email || '').trim();
    } else {
      const form = await request.formData();
      email = String(form.get('email') || '').trim();
    }

    // RFC 5322 simplified regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Некорректный email' },
        { status: 400 },
      );
    }

    console.log('[NEWSLETTER] Подписка:', email, 'at', new Date().toISOString());

    return NextResponse.json({
      success: true,
      message: 'Подписка оформлена. Первое письмо придёт в течение месяца.',
    });
  } catch (error) {
    console.error('[NEWSLETTER] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
