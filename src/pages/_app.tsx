import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
