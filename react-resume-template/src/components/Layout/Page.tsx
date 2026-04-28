import { NextPage } from 'next';
import Head from 'next/head';
import { memo } from 'react';

import { HomepageMeta } from '../../data/dataDef';

const SITE_URL = 'https://www.jukkis.eu';

const Page: NextPage<HomepageMeta> = memo(({children, title, description, author, keywords, ogImageUrl}) => {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jukka-Pekka Lappalainen',
    url: SITE_URL,
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-employed',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nurmijärvi',
      addressCountry: 'FI',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Jyväskylä',
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'Python',
      'Java',
      'AWS',
      'Full Stack Development',
      'Ethical Hacking',
      'Audio Engineering',
    ],
    sameAs: ['https://github.com/Hizaguru', 'https://www.linkedin.com/in/jukka-pekka-lappalainen-0365001a7/'],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: SITE_URL,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />

        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Jukka-Pekka Lappalainen | Portfolio" />
        <meta property="og:locale" content="en_US" />
        {ogImageUrl && (
          <>
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Jukka-Pekka Lappalainen — Full Stack Developer" />
          </>
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#515455" />

        {/* Favicon & Manifest */}
        <link rel="shortcut icon" href="/images/tabs.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/tabs.png" />
        <link rel="apple-touch-icon" href="/images/tabs.png" />
        <link href="/site.webmanifest" rel="manifest" key="siteManifest" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd)}} />
      </Head>
      {children}
    </>
  );
});

Page.displayName = 'Page';
export default Page;
