// import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/Layout';
import Tabs from '@components/Tabs';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function ProjectPage(): ReactElement {
  const router = useRouter();
  const eventSlug = extractURLParam('eventSlug', router.query) ?? '';
  const projectSlug = extractURLParam('projectSlug', router.query) ?? '';

  const { data, error } = useSafeQuery('useProject', { eventSlug, projectSlug });

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
      <Tabs
        tabData={[
          { label: 'General', content: <span>General tab</span> },
          { label: 'Stones', content: <span>Stones tab</span> },
          { label: 'Attributes', content: <span>Attributes tab</span> },
          { label: 'Attachments', content: <span>Attachments tab</span> },
          { label: 'History', content: <span>History tab</span> },
        ]}
      />
      {data?.project?.description || 'No description available...'}
    </Layout>
  );
}
