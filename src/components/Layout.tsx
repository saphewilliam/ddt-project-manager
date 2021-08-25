import React, { ReactElement, ReactNode } from 'react';
import cx from 'clsx';
import Navigation from './Navigation';
import Head from 'next/head';

export interface Props {
  children?: ReactNode;
}

export default function Layout(props: Props): ReactElement {
  return (
    <div className={cx('w-screen', 'h-screen', 'flex')}>
      <Head>
        <title>DDT Project Manager</title>
      </Head>
      <Navigation />
      <main className={cx('px-16', 'pt-12')}>{props.children}</main>
    </div>
  );
}
