import cx from 'clsx';
import Head from 'next/head';
import React, { ReactElement, ReactNode, useContext } from 'react';
import ReactLoading from 'react-loading';
import useDeviceWidth from '@hooks/useDeviceWidth';
import { SessionContext } from '@lib/reactContext';
import Navigation from './Navigation';

export interface Props {
  children?: ReactNode;
}

export default function Layout(props: Props): ReactElement {
  const device = useDeviceWidth();
  const session = useContext(SessionContext);

  return (
    <div className={cx('w-screen', 'h-screen', 'flex', device.mobile && 'flex-col-reverse')}>
      <Head>
        <title>DDT Project Manager</title>
      </Head>
      {session !== null && <Navigation />}
      <main className={cx('sm:px-16', 'px-4', 'pt-12', 'flex-grow', 'overflow-y-scroll')}>
        {session !== null ? (
          props.children
        ) : (
          <div className={cx('flex', 'justify-center', 'items-center', 'h-full')}>
            <ReactLoading color="#989A9E" type="spinningBubbles" className={cx('mb-28')} />
          </div>
        )}
      </main>
    </div>
  );
}
