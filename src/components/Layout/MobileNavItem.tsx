import cx from 'clsx';
import Link from 'next/link';
import React, { ComponentProps, ReactElement } from 'react';
import { NavItemProps } from './';

export default function MobileNavItem(props: NavItemProps): ReactElement {
  const iconProps: ComponentProps<'svg'> = {
    width: 30,
    className: cx('transition-all', 'duration-500'),
  };

  return (
    <li>
      <Link href={props.href}>
        <a
          title={props.label}
          className={cx(
            'block',
            'p-2.5',
            'rounded-xl',
            'transition-colors',
            'hover:bg-dark-selected',
            props.active && cx('bg-dark-selected', 'border-t-4', 'border-primary'),
          )}
        >
          {props.active ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
        </a>
      </Link>
    </li>
  );
}
