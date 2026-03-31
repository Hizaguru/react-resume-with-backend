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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* google translate breaks react:
          - https://github.com/facebook/react/issues/11538
          - https://bugs.chromium.org/p/chromium/issues/detail?id=872770 */}
        <meta content="notranslate" name="google" />
      </Head>
      <body className="bg-black">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:rounded-md focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
