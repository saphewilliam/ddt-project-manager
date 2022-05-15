import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Tabs from '@components/Tabs';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';
import ProjectAttributeTable from '@templates/InventoryTemplate/ProjectAttributeTable';
import ProjectStoneTable from '@templates/InventoryTemplate/ProjectStoneTable';

export default function ProjectPage(): ReactElement {
  const [subTabIndex, setSubTabIndex] = useState(0);

  const router = useRouter();
  const eventSlug = extractURLParam('eventSlug', router.query) ?? '';
  const projectSlug = extractURLParam('projectSlug', router.query) ?? '';

  const { data, error } = useSafeQuery('useProject', { eventSlug, projectSlug });

  useEffect(() => {
    if (data?.project === null && !error) router.replace(`/events/${eventSlug}`);
  }, [data]);

  const title = data?.project ? `#${data.project.number} ${data.project.name}` : '';

  return (
    <Layout title={title}>
      <Card>
        <Tabs
          tabData={[
            { label: 'General', content: <span>General tab</span> },
            {
              label: 'Stones',
              content: (
                <Tabs
                  vertical
                  tabIndex={subTabIndex}
                  setTabIndex={setSubTabIndex}
                  tabData={
                    data?.project?.parts.map((part) => ({
                      label: `#${data.project?.number}.${part.number} ${part.name}`,
                      content: <ProjectStoneTable rows={part.stones} />,
                    })) ?? []
                  }
                />
              ),
            },
            {
              label: 'Attributes',
              content: (
                <Tabs
                  vertical
                  tabIndex={subTabIndex}
                  setTabIndex={setSubTabIndex}
                  tabData={
                    data?.project?.parts.map((part) => ({
                      label: `#${data.project?.number}.${part.number} ${part.name}`,
                      content: <ProjectAttributeTable rows={part.attributes} />,
                    })) ?? []
                  }
                />
              ),
            },
            { label: 'Attachments', content: <span>Attachments tab</span> },
            { label: 'History', content: <span>History tab</span> },
          ]}
        />
      </Card>
    </Layout>
  );
}
