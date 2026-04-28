import {ImageResponse} from 'next/og';
import {NextRequest} from 'next/server';

export const config = {
  runtime: 'edge',
};

// Load Inter from Google Fonts at the edge for crisp, consistent rendering.
const interRegular = fetch('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff').then(
  res => res.arrayBuffer(),
);

const interBold = fetch('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.woff').then(
  res => res.arrayBuffer(),
);

const TECH = ['React', 'TypeScript', 'Python', 'AWS', 'Java'];

export default async function handler(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const title = searchParams.get('title') || 'Jukka-Pekka Lappalainen';
  const role = searchParams.get('role') || 'Full Stack Developer';
  const location = searchParams.get('location') || 'Nurmijärvi, Finland';

  const [regular, bold] = await Promise.all([interRegular, interBold]);

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#0b1020',
        backgroundImage:
          'radial-gradient(circle at 18% 20%, rgba(97,218,251,0.22) 0%, rgba(97,218,251,0) 45%), radial-gradient(circle at 85% 85%, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0) 50%), linear-gradient(135deg, #070a17 0%, #0d1430 55%, #0a0f24 100%)',
        fontFamily: 'Inter',
        color: '#ffffff',
        padding: '72px 80px',
      }}>
      {/* Top row: monogram + site URL */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
              color: '#0b1020',
              background: 'linear-gradient(135deg, #61dafb 0%, #7c3aed 100%)',
              boxShadow: '0 10px 40px rgba(97,218,251,0.35)',
            }}>
            JP
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}>
            <span style={{fontSize: 20, color: '#94a3b8', letterSpacing: '0.18em', textTransform: 'uppercase'}}>
              Portfolio
            </span>
            <span style={{fontSize: 24, color: '#e2e8f0', fontWeight: 600, marginTop: 4}}>jukkis.eu</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 20px',
            borderRadius: '999px',
            border: '1px solid rgba(97,218,251,0.35)',
            background: 'rgba(97,218,251,0.08)',
            color: '#61dafb',
            fontSize: 22,
            fontWeight: 500,
          }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '999px',
              background: '#22c55e',
              boxShadow: '0 0 12px #22c55e',
            }}
          />
          <span>Available for work</span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          marginTop: '-20px',
        }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: '#61dafb',
            letterSpacing: '-0.01em',
            marginBottom: '12px',
          }}>
          {role}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
          }}>
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginTop: '22px',
            fontSize: 28,
            color: '#94a3b8',
          }}>
          <svg fill="none" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21s-7-6.35-7-11a7 7 0 1 1 14 0c0 4.65-7 11-7 11Z"
              stroke="#61dafb"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <circle cx="12" cy="10" r="2.5" stroke="#61dafb" strokeWidth="2" />
          </svg>
          <span>{location}</span>
        </div>
      </div>

      {/* Tech stack pills */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
        }}>
        {TECH.map(t => (
          <div
            key={t}
            style={{
              padding: '12px 22px',
              borderRadius: '12px',
              border: '1px solid rgba(226,232,240,0.18)',
              background: 'rgba(226,232,240,0.06)',
              color: '#e2e8f0',
              fontSize: 26,
              fontWeight: 500,
            }}>
            {t}
          </div>
        ))}
      </div>

      {/* Accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '6px',
          background: 'linear-gradient(90deg, #61dafb 0%, #7c3aed 50%, #ec4899 100%)',
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {name: 'Inter', data: regular, weight: 400, style: 'normal'},
        {name: 'Inter', data: bold, weight: 700, style: 'normal'},
      ],
    },
  );
}
