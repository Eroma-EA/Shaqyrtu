import { ImageResponse } from 'next/og';
import { weddingConfig } from '../data/config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#6f604c',
        }}
      >
        <img
          src="https://shaqyrtu-kappa.vercel.app/hero_couple.jpg"
          alt=""
          width="1200"
          height="630"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 10%, rgba(0,0,0,0.68) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            padding: '0 70px 54px',
            color: '#fffaf2',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 62, fontWeight: 500, letterSpacing: 1 }}>
            {weddingConfig.groom} & {weddingConfig.bride}
          </div>
          <div style={{ fontSize: 28, letterSpacing: 5, textTransform: 'uppercase' }}>
            {weddingConfig.date} · {weddingConfig.time}
          </div>
          <div style={{ fontSize: 24, letterSpacing: 3 }}>
            Шақыру билеті
          </div>
        </div>
      </div>
    ),
    size,
  );
}
