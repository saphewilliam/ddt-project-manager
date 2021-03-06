import cx from 'clsx';
import React, { ReactElement } from 'react';
import MobileNavItem from './MobileNavItem';
import { NavItemProps } from './Navigation';

export interface Props {
  navItems: NavItemProps[];
}

export default function MobileNav(props: Props): ReactElement {
  return (
    <nav className={cx('bg-gray-900', 'text-gray-200')}>
      <ul className={cx('flex', 'justify-around', 'items-end', 'px-1', 'py-2')}>
        {props.navItems
          .filter((item) => !item.hidden)
          .map((item, i) => (
            <MobileNavItem key={i} {...item} />
          ))}
      </ul>
    </nav>
  );
}
