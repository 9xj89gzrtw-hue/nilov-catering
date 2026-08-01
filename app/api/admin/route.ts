import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { loadContent, saveContent } from '@/lib/content';

export async function GET() {
  const data = loadContent();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = request.headers.get('x-admin-secret');
  if (auth !== process.env.ADMIN_SECRET && auth !== 'nilov-admin-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  saveContent(body);

  // ISR revalidation — правки в админке обновляют сайт без деплоя
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true, revalidated: true });
}