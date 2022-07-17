import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { DeviceWidthProvider } from '@hooks/useDeviceWidth';
import { NavigationProvider } from '@hooks/useNavigation';
import { SessionProvider } from '@hooks/useSession';
import { WasmProvider } from '@hooks/useWasm';
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
