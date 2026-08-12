import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-store';

/** Check admin auth — same guard as /api/admin */
function checkAuth(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = req.headers.get('x-admin-secret') || req.headers.get('authorization')?.replace('Bearer ', '');
  return auth === secret;
}

/** REST API для CMS-админки: GET/POST /api/cms/[collection]
 * GET: public for pricing/trust-proof (needed by site), auth required for reviews/page-texts/dishes/videos
 * POST: always requires auth
 */
const PUBLIC_GET_COLLECTIONS = ['pricing', 'trust-proof'];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }>}
) {
  const { collection } = await params;
  const col = cmsStore.collections.find(c =>c === collection);
  if (!col) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  // Sensitive collections require auth
  if (!PUBLIC_GET_COLLECTIONS.includes(collection) && !checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let data: unknown[];
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
  { params }: { params: Promise<{ collection: string }>}
) {
  // Auth guard — prevent unauthenticated CMS mutations
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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