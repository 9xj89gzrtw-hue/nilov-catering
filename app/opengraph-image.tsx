import { ImageResponse } from 'next/og';

export const alt = 'NiloV Catering — Кейтеринг под ключ в Санкт-Петербурге';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #FAF7F2 0%, #F2ECE3 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Georgia, serif',
      }}>
        <div style={{ fontSize: 72, fontWeight: 500, color: '#1C1815', marginBottom: 20 }}>NiloV Catering</div>
        <div style={{ fontSize: 28, color: '#4A423B', fontFamily: 'system-ui', marginBottom: 10 }}>Кейтеринг под ключ в Санкт-Петербурге</div>
        <div style={{ fontSize: 24, color: '#8A6D3B', fontFamily: 'system-ui', marginBottom: 10 }}>Фуршет · Банкет · Кофе-брейк · Доставка</div>
        <div style={{ fontSize: 22, color: '#B08D57', fontFamily: 'system-ui' }}>С 2007 года · 3000+ событий · 4.8 на Яндекс.Картах</div>
      </div>
    ),
    { ...size }
  );
}
