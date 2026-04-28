import '../globals.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {JSX, memo} from 'react';

import ChatWidget from '@/components/ChatWidget/ChatWidget';
import {Toaster} from '@/components/ui/sonner';
import {TooltipProvider} from '@/components/ui/tooltip';

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
      <ChatWidget />
      <Toaster position="bottom-right" richColors closeButton />
    </TooltipProvider>
  );
});

MyApp.displayName = 'MyApp';

export default MyApp;
