import cx from 'clsx';
import React, { ReactElement } from 'react';
import Button from '@components/Button';
import Layout from '@components/Layout';

export default function Custom404(): ReactElement {
  return (
    <Layout>
      <div
        className={cx(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'text-center',
          'w-full',
          'h-full',
          'sm:pb-32',
          'pb-14',
        )}
      >
        <div className={cx('space-y-5', 'md:w-96', 'w-64')}>
          <p className={cx('font-extrabold', 'text-4xl')}>Oops!</p>
          <p>We can&apos;t seem to find the page you are looking for</p>
          <Button label="Click here to go back to the dashboard" href="/" />
        </div>
      </div>
    </Layout>
  );
}
