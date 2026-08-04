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
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function ensureDataFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LEADS_FILE, '[]', 'utf-8');
  }
}

async function appendLead(lead: Record<string, unknown>) {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) {
      throw new Error('leads.json is not an array');
    }
    arr.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
  } catch (e) {
    // If parse fails, back up and start fresh
    const backup = `${LEADS_FILE}.bak.${Date.now()}`;
    try { await fs.copyFile(LEADS_FILE, backup); } catch {}
    await fs.writeFile(LEADS_FILE, JSON.stringify([lead], null, 2), 'utf-8');
  }
}

export async function POST(request: Request) {
  try {
    let body: QuoteBody;
    const contentType = request.headers.get('content-type') || '';

    // Handle both JSON (client-side fetch) and form-data (no-JS fallback)
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries()) as unknown as QuoteBody;
    } else {
      try {
        body = await request.json();
      } catch {
        return NextResponse.json(
          { success: false, message: 'Неподдерживаемый формат запроса' },
          { status: 400 },
        );
      }
    }

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Имя и телефон обязательны' },
        { status: 400 },
      );
    }

    const now = Date.now();
    const orderId = `NV-${new Date().getFullYear()}-${String(now % 1000000).padStart(6, '0')}`;
    const timestamp = new Date().toISOString();

    const lead = {
      orderId,
      timestamp,
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      date: body.date || '',
      format: body.format || '',
      tier: body.tier || '',
      guests: body.guests ?? null,
      total: body.total ?? null,
      comment: body.comment || '',
      excludedAllergens: body.excludedAllergens || [],
      guestGroups: body.guestGroups || null,
      selectedItems: body.selectedItems || null,
      source: body.source || 'unknown',
      subject: body.subject || '',
      location: body.location || '',
      status: 'new',
    };

    // Persist to file (real storage, not just console.log)
    try {
      await appendLead(lead);
    } catch (e) {
      console.error('[QUOTE] Failed to persist lead:', e);
    }

    console.log('[QUOTE] Новая заявка:', orderId, body.name, body.phone);

    // Optional Telegram notification (non-blocking)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramBotToken && telegramChatId) {
      const text = `Новая заявка ${orderId}\n\nИмя: ${body.name}\nТелефон: ${body.phone}\nДата: ${body.date || '—'}\nГостей: ${body.guests ?? '—'}\nФормат: ${body.format || '—'}\nИсточник: ${body.source || '—'}\n\nКомментарий: ${body.comment || '—'}`;
      fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: 'HTML' }),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка принята. Мы свяжемся с вами в течение 15 минут в рабочее время (9:00–21:00 МСК).',
      orderId,
      data: { name: body.name, phone: body.phone, date: body.date },
    });
  } catch (error) {
    console.error('[QUOTE] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера. Позвоните +7 (812) 919-59-11.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Используйте POST для отправки заявки',
  });
}
