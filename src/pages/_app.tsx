import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import DeviceWidthProvider from '@components/Providers/DeviceWidthProvider';
import NavigationProvider from '@components/Providers/NavigationProvider';
import SessionProvider from '@components/Providers/SessionProvider';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <CookiesProvider>
      <SessionProvider>
        <DeviceWidthProvider>
          <NavigationProvider>
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </NavigationProvider>
        </DeviceWidthProvider>
      </SessionProvider>
    </CookiesProvider>
  );
}
