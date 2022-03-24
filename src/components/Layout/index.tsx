import cx from 'clsx';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';
import ReactTooltip from 'react-tooltip';
import Loading from '@components/Loading';
import useDeviceWidth from '@hooks/useDeviceWidth';
import useSession from '@hooks/useSession';
import Navigation from './Navigation';
import SocketFooter from './SocketFooter';

export interface Props {
  title?: string;
  hideHeader?: boolean;
  sidebar?: ReactNode;
  children?: ReactNode;
}

export default function Layout(props: Props): ReactElement {
  const device = useDeviceWidth();
  const { session } = useSession();

  return (
    <div className={cx('w-screen', 'h-screen', 'flex', device?.xs && 'flex-col-reverse')}>
      <Head>
        <title>DDT Project Manager{props.title ? ` - ${props.title}` : ''}</title>
      </Head>

      {session !== null && <Navigation />}

      <ReactTooltip id="stoneListToolTip" place="right" effect="solid" />

      <main
        className={cx(
          'flex',
          'flex-col',
          'justify-between',
          'flex-grow',
          'overflow-y-auto',
          'text-gray-900',
        )}
      >
        {session !== null ? (
          <>
            <div className={cx('sm:px-16', 'px-4', 'py-12', 'flex-grow')}>
              {props.title && !props.hideHeader && (
                <h1 className={cx('font-bold', 'text-4xl', 'mb-12')}>{props.title}</h1>
              )}
              {props.children}
            </div>
            <SocketFooter />
          </>
        ) : (
          <Loading className={cx('mb-28')} />
        )}
      </main>

      {session !== null && props.sidebar}
    </div>
  );
}
