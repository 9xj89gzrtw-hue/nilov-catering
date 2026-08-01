import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-store';

/** REST API для CMS-админки: GET/POST /api/cms/[collection] */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const col = cmsStore.collections.find(c => c === collection);
  if (!col) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  let data: any[];
  if (collection === 'pricing') {
    const p = await cmsStore.pricing.get();
    data = p ? [p] : [];
  } else {
    const fn = collection === 'trust-proof' ? 'trustProof' :
               collection === 'page-texts' ? 'pageTexts' :
               collection as 'dishes' | 'reviews' | 'videos';
    data = await cmsStore[fn].getAll();
  }

  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const body = await req.json();

  if (collection === 'pricing') {
    await cmsStore.pricing.save(body);
  } else if (collection === 'trust-proof') {
    await cmsStore.trustProof.save(body);
  } else if (collection === 'page-texts') {
    await cmsStore.pageTexts.save(body);
  } else if (collection === 'dishes') {
    await cmsStore.dishes.save(body);
  } else if (collection === 'reviews') {
    await cmsStore.reviews.save(body);
  } else if (collection === 'videos') {
    await cmsStore.videos.save(body);
  } else {
    return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}