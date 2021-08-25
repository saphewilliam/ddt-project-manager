import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import cx from 'clsx';

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Hello world</h1>
    </Layout>
  );
}
