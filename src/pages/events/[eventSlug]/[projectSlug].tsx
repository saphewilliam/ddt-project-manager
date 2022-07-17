import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import ProjectTemplate from '@components/templates/ProjectTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function ProjectPage(): ReactElement {
  const router = useRouter();
  const eventSlug = extractURLParam('eventSlug', router.query) ?? '';
  const projectSlug = extractURLParam('projectSlug', router.query) ?? '';

  const { data, error } = useSafeQuery('useProject', { eventSlug, projectSlug }, projectSlug);

  useEffect(() => {
    if (data?.project === null && !error) router.replace(`/events/${eventSlug}`);
  }, [data]);

  return <ProjectTemplate project={data?.project ?? null} swrKey={`useProject${projectSlug}`} />;
}
