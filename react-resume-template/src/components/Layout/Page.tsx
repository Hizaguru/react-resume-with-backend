import { NextPage } from 'next';
import Head from 'next/head';
import { memo } from 'react';

import { HomepageMeta } from '../../data/dataDef';

const Page: NextPage<HomepageMeta> = memo(({ children, title, description }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />

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
