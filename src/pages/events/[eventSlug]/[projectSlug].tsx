import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export default function ProjectPage(): ReactElement {
  const router = useRouter();

  return <Layout title="Project"></Layout>;
}
