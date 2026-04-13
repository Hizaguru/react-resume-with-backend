import {ImageResponse} from 'next/og';
import {NextRequest} from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const title = searchParams.get('title') || 'Perttula Software';
  const subtitle = searchParams.get('subtitle') || 'Fullstack Development for Startups & Businesses';

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
          backgroundColor: '#0A0A0A',
          backgroundImage: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255,255,255,0.12)',
            borderRadius: '24px',
            padding: '60px 80px',
            backgroundColor: 'rgba(255,255,255,0.04)',
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
              color: '#9CA3AF',
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
              color: '#6B7280',
            }}>
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span>AWS</span>
            <span>•</span>
            <span>AI</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: 24,
            color: '#4B5563',
          }}>
          perttulasoftware.fi
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
