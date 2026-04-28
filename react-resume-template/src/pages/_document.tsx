import {Head, Html, Main, NextScript} from 'next/document';

// next/document <Head /> vs next/head <Head />
//
// next/document Head is rendered once on the server. This is different from next/head which will
// rebuild the next/head fields each time it's called, and won't overwrite next/document's Head.

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        {/* google translate breaks react:
          - https://github.com/facebook/react/issues/11538
          - https://bugs.chromium.org/p/chromium/issues/detail?id=872770 */}
        <meta content="notranslate" name="google" />

        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://xxszn58l.api.sanity.io" />
        <link rel="dns-prefetch" href="https://xxszn58l.api.sanity.io" />

        {/* Hreflang — signal primary language and region */}
        <link rel="alternate" hrefLang="en" href="https://www.jukkis.eu/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.jukkis.eu/" />
      </Head>
      <body className="bg-black">
        <Main />

        {/* Noscript fallback for crawlers and users without JS */}
        <noscript>
          <div
            style={{
              padding: '2rem',
              color: '#e5e5e5',
              backgroundColor: '#1a1a1a',
              fontFamily: 'system-ui, sans-serif',
            }}>
            <h1>Jukka-Pekka Lappalainen — Full Stack Developer</h1>
            <p>
              Full Stack Developer based in Nurmijärvi, Finland. Experienced in React, TypeScript, Python, Java, AWS,
              and ethical hacking.
            </p>
            <h2>About</h2>
            <p>
              Enthusiastic and experienced full-stack developer with a passion for creating innovative solutions. Solid
              educational background in ICT from the University of Jyväskylä. Also brings experience as a sound
              engineer, fostering a disciplined approach to troubleshooting and problem-solving.
            </p>
            <h2>Skills</h2>
            <ul>
              <li>Coding: React, TypeScript, Python, Java</li>
              <li>Ethical Hacking (Web, System)</li>
              <li>Amazon Web Services</li>
              <li>Audio Designing &amp; Mixing</li>
            </ul>
            <h2>Contact</h2>
            <ul>
              <li>
                Email: <a href="mailto:jukka-pekka.lappalainen@outlook.com">jukka-pekka.lappalainen@outlook.com</a>
              </li>
              <li>
                GitHub: <a href="https://github.com/Hizaguru">github.com/Hizaguru</a>
              </li>
              <li>
                LinkedIn:{' '}
                <a href="https://www.linkedin.com/in/jukka-pekka-lappalainen-0365001a7/">
                  linkedin.com/in/jukka-pekka-lappalainen
                </a>
              </li>
            </ul>
            <p>Location: Nurmijärvi, Finland</p>
          </div>
        </noscript>

        <NextScript />
      </body>
    </Html>
  );
}
