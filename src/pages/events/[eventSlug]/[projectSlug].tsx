import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function ProjectPage(): ReactElement {
  const router = useRouter();
  const eventSlug = extractURLParam('eventSlug', router.query) ?? '';
  const projectSlug = extractURLParam('projectSlug', router.query) ?? '';

  const { data, error } = useSafeQuery('useGetProject', { eventSlug, projectSlug });

  useEffect(() => {
    if (data?.project === null && !error) router.replace(`/events/${eventSlug}`);
  }, [data]);

  const title = data?.project
    ? `#${data.project.number}${data.project.subNumber ? `.${data.project.subNumber}` : ''} ${
        data.project.name
      }`
    : '';

  return (
    <Layout title={title}>
      <ul className={cx('flex')}>
        <li>General</li>
        <li>Stones</li>
        <li>Attributes</li>
        <li>Attachements</li>
        <li>Edit History</li>
      </ul>
      {data?.project?.description || 'No description available...'}
    </Layout>
  );
}
