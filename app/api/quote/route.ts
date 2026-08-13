import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface QuoteBody {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  format?: string;
  tier?: string;
  guests?: number;
  total?: number;
  comment?: string;
  excludedAllergens?: string[];
  guestGroups?: unknown;
  selectedItems?: unknown;
  source?: string;
  subject?: string;
  location?: string;
  urgency?: string;
  budget?: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

/**
 * Try to persist lead to file system.
 * Works locally; silently fails on Vercel (read-only FS).
 * Returns true if persisted, false if not.
 */
async function tryFilePersist(lead: Record<string, unknown>): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let arr: unknown[] = [];
    try {
      const raw = await fs.readFile(LEADS_FILE, 'utf-8');
      arr = JSON.parse(raw);
      if (!Array.isArray(arr)) arr = [];
    } catch { /* file doesn't exist yet */ }
    arr.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
    return true;
  } catch {
    return false; // Read-only FS (Vercel) — expected in production
  }
}

/**
 * Send Telegram notification — PRIMARY lead delivery channel (if env vars configured).
 * Returns true if sent, false if not.
 */
async function sendTelegramNotification(lead: Record<string, unknown>): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return false;

  // Sanitize user input to prevent Telegram HTML injection
  const sanitize = (s: string) =>s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const text = [
    `🔔 Новая заявка ${lead.orderId}`,
    '',
    `Имя: ${sanitize(String(lead.name || '—'))}`,
    `Телефон: ${sanitize(String(lead.phone || '—'))}`,
    lead.date ? `Дата: ${sanitize(String(lead.date))}` : null,
    lead.guests ? `Гостей: ${lead.guests}` : null,
    lead.format ? `Формат: ${sanitize(String(lead.format))}` : null,
    lead.total ? `Бюджет: ${lead.total} ₽` : null,
    lead.urgency ? `Срочность: ${sanitize(String(lead.urgency))}` : null,
    lead.source ? `Источник: ${sanitize(String(lead.source))}` : null,
    lead.comment ? `Комментарий: ${sanitize(String(lead.comment))}` : null,
  ].filter(Boolean).join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Detect if this is a native form submit (HTML) or fetch (JSON)
  const acceptHeader = request.headers.get('accept') || '';
  const contentType = request.headers.get('content-type') || '';
  // Native HTML form submits send form-encoded data and Accept: text/html
  // Also treat as HTML if no Accept header but form-encoded content (some clients)
  const isFormData = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
  const wantsHtml = acceptHeader.includes('text/html') && !acceptHeader.includes('application/json');

  try {
    let body: QuoteBody;

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries()) as unknown as QuoteBody;
    } else {
      try { body = await request.json(); }
      catch {
        return NextResponse.json({ success: false, message: 'Неподдерживаемый формат запроса' }, { status: 400 });
      }
    }

    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, message: 'Имя и телефон обязательны' }, { status: 400 });
    }

    const now = Date.now();
    const orderId = `NV-${new Date().getFullYear()}-${String(now % 1000000).padStart(6, '0')}`;
    const timestamp = new Date().toISOString();

    const lead = {
      orderId, timestamp,
      name: body.name, phone: body.phone,
      email: body.email || '', date: body.date || '',
      format: body.format || '', tier: body.tier || '',
      guests: body.guests ?? null, total: body.total ?? null,
      comment: body.comment || '',
      excludedAllergens: body.excludedAllergens || [],
      guestGroups: body.guestGroups || null,
      selectedItems: body.selectedItems || null,
      source: body.source || 'unknown',
      subject: body.subject || '', location: body.location || '',
      urgency: body.urgency || '', budget: body.budget ?? null,
      status: 'new',
    };

    // PERSIST: try file first (local dev), then Telegram (production)
    const fileOk = await tryFilePersist(lead);
    const telegramOk = await sendTelegramNotification(lead);

    // Log lead to server logs (Vercel captures these) — ensures lead is NEVER lost
    console.log(`[QUOTE] Lead ${orderId} | file=${fileOk} | telegram=${telegramOk} | data:`, JSON.stringify(lead));

    // PRAGMATIC BEHAVIOR: Always confirm to user (lead is logged server-side).
    // Delivery is attempted via Telegram/file; if both fail, lead is still in logs.
    // This ensures the conversion funnel never breaks for the end user.
    if (!fileOk && !telegramOk) {
      console.error(`[QUOTE] Lead ${orderId} delivery failed — check TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID env vars. Lead logged above.`);
    }

    // HTML clients (native form submit) → redirect to /thank-you
    if (wantsHtml) {
      const url = new URL(`/thank-you?orderId=${orderId}`, request.url);
      return NextResponse.redirect(url, { status: 303 });
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка принята. Мы свяжемся с вами в течение 15 минут в рабочее время (9:00–21:00).',
      orderId,
      data: { name: body.name, phone: body.phone, date: body.date },
    });
  } catch (error) {
    console.error('[QUOTE] Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Внутренняя ошибка сервера. Позвоните +7 (812) 919-59-11.',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Используйте POST для отправки заявки' }, { status: 405, headers: { Allow: 'POST' } });
}
