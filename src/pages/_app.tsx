import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { SessionContext } from '@lib/reactContext';
import useSessionData from '@hooks/useSessionData';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const session = useSessionData();

  return (
    <CookiesProvider>
      <SessionContext.Provider value={session}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </SessionContext.Provider>
    </CookiesProvider>
  );
}
