import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBS_FILE = path.join(DATA_DIR, 'subscribers.json');

async function ensureSubsFile() {
  try {
    await fs.access(SUBS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SUBS_FILE, '[]', 'utf-8');
  }
}

async function appendSubscriber(email: string) {
  await ensureSubsFile();
  const raw = await fs.readFile(SUBS_FILE, 'utf-8');
  let arr: unknown[];
  try {
    arr = JSON.parse(raw);
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }
  // Avoid duplicates
  const existing = arr.find((e) => typeof e === 'object' && e !== null && (e as { email?: string }).email === email);
  if (existing) return false;
  arr.push({ email, subscribedAt: new Date().toISOString() });
  await fs.writeFile(SUBS_FILE, JSON.stringify(arr, null, 2), 'utf-8');
  return true;
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

    const isNew = await appendSubscriber(email);
    console.log('[NEWSLETTER]', isNew ? 'Новая подписка:' : 'Уже подписан:', email);

    return NextResponse.json({
      success: true,
      message: isNew
        ? 'Подписка оформлена. Первое письмо придёт в течение месяца.'
        : 'Вы уже подписаны на нашу рассылку.',
    });
  } catch (error) {
    console.error('[NEWSLETTER] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
