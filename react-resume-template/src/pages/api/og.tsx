import {ImageResponse} from 'next/og';
import {NextRequest} from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const title = searchParams.get('title') || 'Jukka-Pekka Lappalainen';
  const subtitle = searchParams.get('subtitle') || 'Full Stack Developer | Nurmijärvi, Finland';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255,255,255,0.15)',
            borderRadius: '24px',
            padding: '60px 80px',
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              textAlign: 'center',
              marginBottom: '16px',
            }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#a3a3a3',
              textAlign: 'center',
              marginBottom: '32px',
            }}>
            {subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: 22,
              color: '#737373',
            }}>
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Python</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>Java</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: 24,
            color: '#525252',
          }}>
          jukkis.eu
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
