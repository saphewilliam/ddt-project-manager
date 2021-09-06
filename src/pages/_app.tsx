import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import SessionProvider from '@components/SessionProvider';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <CookiesProvider>
      <SessionProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </SessionProvider>
    </CookiesProvider>
  );
}
