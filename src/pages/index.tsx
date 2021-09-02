import cx from 'clsx';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useWasm from '@hooks/useWasm';

export default function HomePage(): ReactElement {
  const { instance, loaded, error } = useWasm();

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>
        {loaded && instance && instance.exports.addString('Hello', 'world')}
        {error && error.message}
      </h1>
    </Layout>
  );
}
