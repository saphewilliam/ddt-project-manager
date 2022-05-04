import { Tab } from '@headlessui/react';
import cx from 'clsx';
import React, { Fragment, ReactElement } from 'react';

export interface TabData {
  label: string;
  content: ReactElement;
}

export interface Props {
  tabData: TabData[];
  vertical?: boolean;
  full?: boolean;
  setTabIndex?: (tabIndex: number) => void;
  tabIndex?: number;
}

export default function Tabs(props: Props): ReactElement {
  return (
    <Tab.Group
      onChange={(tabIndex) => props.setTabIndex && props.setTabIndex(tabIndex)}
      selectedIndex={props.tabIndex}
      vertical={props.vertical}
    >
      <div className={cx(props.vertical && cx('flex'))}>
        <Tab.List className={cx('flex', props.vertical && cx('flex-col'))}>
          {props.tabData.map((tab, i) => (
            <Tab key={i} as={Fragment}>
              {({ selected }) => (
                <button
                  className={cx(
                    'transition-colors',
                    selected
                      ? cx('text-primary', 'border-primary')
                      : cx('text-gray-900', 'border-primary-100', 'hover:border-primary-200'),
                    props.full && 'grow',
                    props.vertical
                      ? cx('border-r-2', 'pl-5', 'pr-10', 'py-2', 'mr-5')
                      : cx('border-b-2', 'px-5', 'py-2', 'mb-5'),
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
      </div>
    </Tab.Group>
  );
}
