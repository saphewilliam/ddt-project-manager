import cx from 'clsx';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';

export default function EventsPage(): ReactElement {
  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Events</h1>
    </Layout>
  );
}
