import { ReactElement, useState } from 'react';
import Loading from 'react-loading';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Tabs from '@components/Tabs';
import { ProjectQuery } from '@graphql/__generated__/codegen-self';
import AttachmentsPanel from './AttachmentsPanel';
import AttributesPanel from './AttributesPanel';
import GeneralPanel from './GeneralPanel';
import HistoryPanel from './HistoryPanel';
import StonesPanel from './StonesPanel';

export interface Props {
  project: ProjectQuery['project'];
}

export default function ProjectTemplate({ project }: Props): ReactElement {
  const [tabIndex, setTabIndex] = useState(0);

  const title = project ? `#${project.number} ${project.name}` : '';

  return (
    <Layout title={title}>
      {!project ? (
        <Loading />
      ) : (
        <Card>
          <Tabs
            tabData={[
              {
                label: 'General',
                content: <GeneralPanel project={project} />,
              },
              {
                label: 'Stones',
                content: <StonesPanel {...{ project, tabIndex, setTabIndex }} />,
              },
              {
                label: 'Attributes',
                content: <AttributesPanel {...{ project, tabIndex, setTabIndex }} />,
              },
              { label: 'Attachments', content: <AttachmentsPanel /> },
              { label: 'History', content: <HistoryPanel project={project} /> },
            ]}
          />
        </Card>
      )}
    </Layout>
  );
}
