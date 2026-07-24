import { NextResponse } from 'next/server';
import { LEGAL } from '@/lib/data';

/**
 * POST /api/contact
 *
 * Принимает заявку с /contact (consumer + B2B).
 * В проде: отправка в CRM / Telegram-бот / email.
 * В текущей реализации: логирование + возврат orderId.
 *
 * Поддерживает 2 режима:
 *  — consumer: name, phone, date, eventType, guests, comment
 *  — B2B: дополнительно company, inn, kpp, edoSystem, docEmail, legalAddress, vatRequired
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown>;

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      // HTML form submission (application/x-www-form-urlencoded)
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }

    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны' },
        { status: 400 },
      );
    }

    const isB2B = Boolean(body.company || body.inn || body.kpp);
    const orderId = isB2B
      ? `NV-B2B-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
      : `NV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    const payload = {
      orderId,
      type: isB2B ? 'B2B' : 'consumer',
      name,
      phone,
      email: body.email || null,
      date: body.date || null,
      eventType: body.eventType || null,
      guests: body.guests ? Number(body.guests) : null,
      comment: body.comment || null,
      // B2B fields
      company: body.company || null,
      inn: body.inn || null,
      kpp: body.kpp || null,
      legalAddress: body.legalAddress || null,
      edoSystem: body.edoSystem || null,
      docEmail: body.docEmail || null,
      vatRequired: body.vatRequired === 'on' || body.vatRequired === 'true',
      slaRequired: body.slaRequired === 'on' || body.slaRequired === 'true',
      procurement: body.procurement || null, // 44-ФЗ / 223-ФЗ / коммерция
      // Diagnostics
      source: body.source || 'contact-form',
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || null,
    };

    console.log(`[CONTACT ${isB2B ? 'B2B' : 'consumer'}]`, orderId, payload);

    return NextResponse.json(
      {
        success: true,
        message: isB2B
          ? 'Заявка принята. B2B-менеджер свяжется в течение 1 рабочего часа с пакетом документов (договор, счёт, ЭДО).'
          : 'Заявка принята. Менеджер перезвонит в течение 15 минут.',
        orderId,
        operator: LEGAL.operatorFull,
        inn: LEGAL.inn,
        edo: LEGAL.edo,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[CONTACT] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера. Позвоните +7 (812) 919-59-11.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Discovery endpoint: returns public operator info for B2B verification.
  return NextResponse.json({
    operator: LEGAL.operatorFull,
    inn: LEGAL.inn,
    ogrnip: LEGAL.ogrnip,
    taxSystem: LEGAL.taxSystem,
    legalAddress: LEGAL.legalAddress,
    edo: LEGAL.edo,
    phone: '+7 (812) 919-59-11',
    email: 'info@odaeda.ru',
  });
}
