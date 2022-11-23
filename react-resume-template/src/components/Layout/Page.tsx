import { NextPage } from 'next';
import Head from 'next/head';
import { memo } from 'react';

import { HomepageMeta } from '../../data/dataDef';

const Page: NextPage<HomepageMeta> = memo(({ children, title, description, author, keywords }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name="author" content={author}></meta>
        <meta name="keywords" content={keywords}
        
        {/* several domains list the same content, make sure google knows we mean this one. */}
        <link rel="shortcut icon" href="/images/tabs.png" />
        <link href="/site.webmanifest" rel="manifest" key={'siteManifest'} />
      </Head>
      {children}
    </>
  );
});

Page.displayName = 'Page';
export default Page;
