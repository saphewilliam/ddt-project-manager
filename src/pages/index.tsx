import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useWasm from '@hooks/useWasm';

export default function HomePage(): ReactElement {
  const { instance, loaded, error } = useWasm();

  const title: string =
    loaded && instance && instance.exports.addString('Hello', 'world') + (error && error.message);

  return <Layout title={title}></Layout>;
}
