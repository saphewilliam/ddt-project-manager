import cx from 'clsx';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';

export default function FeedbackPage(): ReactElement {
  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Feedback</h1>
    </Layout>
  );
}
