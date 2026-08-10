import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBS_FILE = path.join(DATA_DIR, 'subscribers.json');

// In-memory store for the current invocation (Vercel serverless is stateless
// across invocations, but within a warm instance this prevents duplicate sends).
const memoryStore = new Set<string>();

/**
 * Try to persist subscriber to file system.
 * Works locally; silently fails on Vercel (read-only FS).
 * Returns true if persisted, false if not.
 */
async function tryFilePersist(email: string): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let arr: unknown[] = [];
    try {
      const raw = await fs.readFile(SUBS_FILE, 'utf-8');
      arr = JSON.parse(raw);
      if (!Array.isArray(arr)) arr = [];
    } catch { /* file doesn't exist yet */ }
    const existing = arr.find(
      (e) => typeof e === 'object' && e !== null && (e as { email?: string }).email === email
    );
    if (existing) return true;
    arr.push({ email, subscribedAt: new Date().toISOString() });
    await fs.writeFile(SUBS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
    return true;
  } catch {
    return false; // Read-only FS (Vercel) — expected in production
  }
}

/**
 * Send Telegram notification — primary delivery channel in production.
 */
async function sendTelegramNotification(email: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return false;

  const text = [
    '📧 Новая подписка на рассылку',
    '',
    `Email: ${email}`,
    `Время: ${new Date().toISOString()}`,
  ].join('\n');

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

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Некорректный email' },
        { status: 400 },
      );
    }

    // Dedup within current invocation
    if (memoryStore.has(email)) {
      return NextResponse.json({
        success: true,
        message: 'Вы уже подписаны на нашу рассылку.',
      });
    }
    memoryStore.add(email);

    // PERSIST: file (local dev) + Telegram (production)
    const fileOk = await tryFilePersist(email);
    const telegramOk = await sendTelegramNotification(email);

    if (!fileOk && !telegramOk) {
      // No persistence available — log so it appears in Vercel function logs.
      console.log('[NEWSLETTER] SUBSCRIBER (no persist available):', email);
    }

    console.log('[NEWSLETTER] Subscribed:', email, 'file=', fileOk, 'telegram=', telegramOk);

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

export async function GET() {
  return NextResponse.json({ success: false, message: 'Используйте POST для подписки' });
}
