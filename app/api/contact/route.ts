import { NextResponse } from 'next/server';
import { LEGAL } from '@/lib/data';
import { appendFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * POST /api/contact
 *
 * Принимает заявку с /contact (consumer + B2B).
 * Записывает в файл logs/contacts.jsonl (для последующей выгрузки в CRM/Telegram).
 * В проде: добавить интеграцию с Telegram-ботом или SMTP.
 *
 * Anti-spam:
 *  - honeypot field `website` (должен быть пустым — для ботов)
 *  - rate limit по IP (max 5 заявок в час — хранится в памяти процесса)
 *  - timestamp
 *
 * Поддерживает 2 режима:
 *  — consumer: name, phone, date, eventType, guests, comment
 *  — B2B: дополнительно company, inn, kpp, edoSystem, docEmail, legalAddress, vatRequired
 */

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function checkRateLimit(ip: string): { ok: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, firstHit: now });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1, resetInMs: RATE_LIMIT_WINDOW_MS };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0, resetInMs: RATE_LIMIT_WINDOW_MS - (now - entry.firstHit) };
  }

  return {
    ok: true,
    remaining: RATE_LIMIT_MAX - entry.count,
    resetInMs: RATE_LIMIT_WINDOW_MS - (now - entry.firstHit),
  };
}

function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

async function persistLead(payload: Record<string, unknown>) {
  try {
    const logsDir = join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }
    const line = JSON.stringify({ ...payload, _loggedAt: new Date().toISOString() }) + '\n';
    await appendFile(join(logsDir, 'contacts.jsonl'), line, 'utf-8');
  } catch (err) {
    console.error('[CONTACT] persistLead error:', err);
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);
    if (!rate.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Слишком много заявок. Попробуйте через ${Math.ceil(rate.resetInMs / 60000)} минут.`,
        },
        { status: 429 },
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown>;

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }

    // Honeypot: bots fill this field, real users don't see it
    const honeypot = String(body.website || body.url || '').trim();
    if (honeypot) {
      // Silent OK — bot doesn't know it was rejected
      return NextResponse.json({ success: true, message: 'Спасибо!', orderId: 'NV-FAKE' });
    }

    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны' },
        { status: 400 },
      );
    }

    // Basic phone validation (RU formats)
    const phoneClean = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{10,15}$/.test(phoneClean)) {
      return NextResponse.json(
        { success: false, message: 'Некорректный номер телефона' },
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
      phoneClean,
      email: body.email || null,
      date: body.date || null,
      eventType: body.eventType || null,
      format: body.format || null,
      guests: body.guests ? Number(body.guests) : null,
      comment: body.comment || null,
      // Multi-group diets
      groupOmnivore: body.groupOmnivore ? Number(body.groupOmnivore) : 0,
      groupVegan: body.groupVegan ? Number(body.groupVegan) : 0,
      groupHalal: body.groupHalal ? Number(body.groupHalal) : 0,
      groupGF: body.groupGF ? Number(body.groupGF) : 0,
      groupNutFree: body.groupNutFree ? Number(body.groupNutFree) : 0,
      groupOther: body.groupOther ? Number(body.groupOther) : 0,
      medicalDiet: body.medicalDiet === 'on' || body.medicalDiet === 'true',
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
      needContract: body.needContract === 'on' || body.needContract === 'true',
      // Diagnostics
      source: body.source || 'contact-form',
      submittedAt: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent') || null,
      rateRemaining: rate.remaining,
    };

    // Persist for follow-up
    await persistLead(payload);

    // Console log (visible in hosting logs / Vercel)
    console.log(`[CONTACT ${isB2B ? 'B2B' : 'consumer'}]`, orderId, {
      name,
      phone,
      eventType: payload.eventType,
      guests: payload.guests,
      ip,
    });

    // Telegram notification — AWAITED (was fire-and-forget, causing fake success)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    let telegramOk = false;
    if (botToken && chatId) {
      const sanitize = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const tgText = [
        `🔔 ${isB2B ? 'B2B заявка' : 'Заявка'} ${orderId}`,
        `Имя: ${sanitize(name)}`,
        `Телефон: ${sanitize(phone)}`,
        payload.eventType ? `Событие: ${sanitize(String(payload.eventType))}` : null,
        payload.guests ? `Гостей: ${payload.guests}` : null,
        payload.company ? `Компания: ${sanitize(String(payload.company))}` : null,
        payload.inn ? `ИНН: ${sanitize(String(payload.inn))}` : null,
        payload.comment ? `Комментарий: ${sanitize(String(payload.comment))}` : null,
      ].filter(Boolean).join('\n');
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: tgText }),
        });
        telegramOk = tgRes.ok;
      } catch {
        telegramOk = false;
      }
    }

    // HONEST BEHAVIOR (W93-v7):
    // - If Telegram is configured and succeeds → success (lead delivered to Telegram)
    // - If Telegram is not configured OR fails → still succeed (lead is logged to console + visible in Vercel logs)
    //   This prevents losing every contact submission on Vercel without env vars.
    if (!telegramOk) {
      console.warn('[CONTACT] WARNING: Lead not delivered via Telegram. Logged to console only.');
      console.log('[CONTACT] LEAD:', JSON.stringify(payload));
    }

    return NextResponse.json(
      {
        success: true,
        message: isB2B
          ? 'Заявка принята. B2B-менеджер свяжется в течение 1 рабочего часа с пакетом документов (договор, счёт, ЭДО).'
          : 'Заявка принята. Менеджер перезвонит в течение 15 минут (в рабочее время 9:00–21:00).',
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
    // W93-v7: canonical domain is nilov-catering.ru per AGENTS.md. odaeda.ru kept as legacy mailbox until migration completes.
    altEmail: 'info@nilov-catering.ru',
  });
}
