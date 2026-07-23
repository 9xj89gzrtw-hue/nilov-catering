import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: '#B08D57',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1C1815',
          borderRadius: 6,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
