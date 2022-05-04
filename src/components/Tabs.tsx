import { Tab } from '@headlessui/react';
import cx from 'clsx';
import React, { Fragment, ReactElement } from 'react';

export interface TabData {
  label: string;
  content: ReactElement;
}

export interface Props {
  tabData: TabData[];
  fullWidth?: boolean;
  setTabIndex?: (tabIndex: number) => void;
  tabIndex?: number;
}

export default function Tabs(props: Props): ReactElement {
  return (
    <Tab.Group
      onChange={(tabIndex) => props.setTabIndex && props.setTabIndex(tabIndex)}
      selectedIndex={props.tabIndex}
    >
      <Tab.List className={cx('flex')}>
        {props.tabData.map((tab, i) => (
          <Tab key={i} as={Fragment}>
            {({ selected }) => (
              <button
                className={cx(
                  'border-b-2',
                  'py-2',
                  'px-5',
                  'mb-5',
                  'transition-colors',
                  props.fullWidth && 'grow',
                  selected
                    ? cx('text-primary', 'border-primary')
                    : cx('text-gray-900', 'border-primary-100', 'hover:border-primary-200'),
                )}
              >
                {tab.label}
              </button>
            )}
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
