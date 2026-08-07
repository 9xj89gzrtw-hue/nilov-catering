import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { loadContent, saveContent } from '@/lib/content';

export async function GET() {
  const data = loadContent();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = request.headers.get('x-admin-secret');
  // Removed hardcoded backdoor 'nilov-admin-2026' — security critic flagged this as critical.
  // Fail closed if ADMIN_SECRET is not set.
  if (!process.env.ADMIN_SECRET || auth !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  saveContent(body);

  // ISR revalidation — правки в админке обновляют сайт без деплоя
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true, revalidated: true });
}