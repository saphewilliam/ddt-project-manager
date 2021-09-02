import React, { ComponentProps, ReactElement } from 'react';
import { NavItemProps } from '.';
import Link from 'next/link';
import cx from 'clsx';

export default function MobileNavItem(props: NavItemProps): ReactElement {
  const iconProps: ComponentProps<'svg'> = {
    width: 25,
    className: cx('', 'transition-all', 'duration-500'),
  };

  return (
    <li>
      <Link href={props.href}>
        <a
          title={props.label}
          className={cx(
            'block',
            'rounded-xl',
            'p-2',
            'transition-colors',
            'hover:bg-dark-selected',
            props.active && 'bg-dark-selected',
          )}
        >
          {props.active ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
        </a>
      </Link>
    </li>
  );
}
