import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/Layout';
import cx from 'clsx';
import useWasm from '@hooks/useWasm';

export default function HomePage(): ReactElement {
  const { instance, loaded, error } = useWasm();

  useEffect(() => {
    console.log(instance, loaded, error);
  }, [instance, loaded, error]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>
        {loaded && instance && instance.exports.addString('Hello', 'world')}
        {error && error.message}
      </h1>
    </Layout>
  );
}
