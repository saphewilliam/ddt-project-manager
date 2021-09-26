import cx from 'clsx';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';
import Loading from '@components/Loading';
import useDeviceWidth from '@hooks/useDeviceWidth';
import useSession from '@hooks/useSession';
import Navigation from './Navigation';
import SocketFooter from './SocketFooter';

export interface Props {
  children?: ReactNode;
}

export default function Layout(props: Props): ReactElement {
  const device = useDeviceWidth();
  const { session } = useSession();

  return (
    <div className={cx('w-screen', 'h-screen', 'flex', device?.xs && 'flex-col-reverse')}>
      <Head>
        <title>DDT Project Manager</title>
      </Head>
      {session !== null && <Navigation />}
      <main className={cx('flex', 'flex-col', 'justify-between', 'flex-grow', 'overflow-y-auto')}>
        {session !== null ? (
          <>
            <div className={cx('sm:px-16', 'px-4', 'py-12', 'flex-grow')}>{props.children}</div>
            <SocketFooter />
          </>
        ) : (
          <Loading className={cx('mb-28')} />
        )}
      </main>
    </div>
  );
}
