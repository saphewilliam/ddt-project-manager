import { Tab } from '@headlessui/react';
// import cx from 'clsx';
import React, { ReactElement } from 'react';

export interface TabData {
  label: string;
  content: ReactElement;
  disabled?: boolean;
}

export interface Props {
  tabData: TabData[];
}

export default function Tabs(props: Props): ReactElement {
  return (
    <Tab.Group manual>
      <Tab.List>
        {props.tabData.map((tab, i) => (
          <Tab disabled={tab.disabled} key={i}>
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {props.tabData.map((tab, i) => (
          <Tab.Panel key={i}>{tab.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
