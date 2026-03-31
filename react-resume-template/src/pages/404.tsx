import Head from 'next/head';
import Link from 'next/link';
import {FC} from 'react';

const NotFound: FC = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Jukka-Pekka Lappalainen</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 px-4 text-center">
        <h1 className="mb-4 text-7xl font-bold text-white">404</h1>
        <p className="mb-8 text-xl text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="rounded-full border-2 border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-neutral-900">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
