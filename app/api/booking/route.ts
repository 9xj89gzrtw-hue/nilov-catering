import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });
    if (!body.consent) return NextResponse.json({ error: 'Consent required (152-ФЗ)' }, { status: 400 });
    console.log('Booking:', body);
    return NextResponse.json({ success: true, message: 'Заявка принята' });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
