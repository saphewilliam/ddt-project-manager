import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { WasmProvider } from '@hooks/useWasm';
import DeviceWidthProvider from '@providers/DeviceWidthProvider';
import NavigationProvider from '@providers/NavigationProvider';
import SessionProvider from '@providers/SessionProvider';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <WasmProvider>
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
    </WasmProvider>
  );
}
