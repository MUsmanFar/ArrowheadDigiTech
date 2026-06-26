import { ImageResponse } from 'next/og';

export const alt = 'Arrowhead DigiTech — Digital Agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #c2410c 100%)',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#fdba74',
            marginBottom: 24,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Arrowhead DigiTech
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: 'white', lineHeight: 1.1, maxWidth: 900 }}>
          Websites, AI & Digital Growth
        </div>
        <div style={{ fontSize: 28, color: '#cbd5e1', marginTop: 24, maxWidth: 800 }}>
          Custom digital solutions that generate leads and accelerate business growth.
        </div>
      </div>
    ),
    { ...size },
  );
}
