import cx from 'clsx';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';

export default function EventPage(): ReactElement {
  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Event</h1>
    </Layout>
  );
}
