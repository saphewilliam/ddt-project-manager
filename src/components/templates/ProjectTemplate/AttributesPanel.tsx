import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import Tabs from '@components/Tabs';
import { ProjectQuery } from '@graphql/__generated__/codegen-self';
import ProjectAttributeTable from '../InventoryTemplate/ProjectAttributeTable';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export default function GeneralPanel(props: Props): ReactElement {
  return props.project.parts.length === 0 ? (
    <p>Please add a part</p>
  ) : props.project.parts.length === 1 ? (
    <ProjectAttributeTable rows={props.project.parts[0]!.attributes} />
  ) : (
    <Tabs
      vertical
      tabIndex={props.tabIndex}
      setTabIndex={props.setTabIndex}
      tabData={
        props.project.parts.map((part) => ({
          label: `#${props.project?.number}.${part.number} ${part.name}`,
          content: <ProjectAttributeTable rows={part.attributes} />,
        })) ?? []
      }
    />
  );
}
