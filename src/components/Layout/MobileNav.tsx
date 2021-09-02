import React, { ReactElement } from 'react';
import { NavItemProps } from '.';
import cx from 'clsx';
import MobileNavItem from './MobileNavItem';

export interface Props {
  navItems: NavItemProps[];
}

export default function MobileNav(props: Props): ReactElement {
  return (
    <nav className={cx('bg-dark', 'text-light')}>
      <ul className={cx('flex', 'justify-between', 'px-4', 'py-2')}>
        {props.navItems
          .filter((item) => !item.hidden)
          .map((item, i) => (
            <MobileNavItem key={i} {...item} />
          ))}
      </ul>
    </nav>
  );
}
