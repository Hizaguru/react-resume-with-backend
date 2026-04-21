import '../globals.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import {JSX, memo} from 'react';

import {Toaster} from '@/components/ui/sonner';
import {TooltipProvider} from '@/components/ui/tooltip';

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Component {...pageProps} />
        <Toaster position="bottom-right" richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  );
});

MyApp.displayName = 'MyApp';

export default MyApp;
