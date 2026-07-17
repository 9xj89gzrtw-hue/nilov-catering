import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const month = new URL(req.url).searchParams.get('month') || new Date().toISOString().slice(0,7);
  const dates: Record<string, string> = {};
  const [y, m] = month.split('-').map(Number);
  const days = new Date(y, m, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = `${month}-${String(d).padStart(2,'0')}`;
    const r = Math.random();
    dates[date] = r > 0.8 ? 'busy' : r > 0.6 ? 'limited' : 'free';
  }
  return NextResponse.json({ dates });
}
