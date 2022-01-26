import cx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ComponentProps, ReactElement } from 'react';
import { NavItemProps } from './Navigation';

export default function MobileNavItem(props: NavItemProps): ReactElement {
  const router = useRouter();

  const isActive = props.exactHref
    ? router.pathname === props.href
    : router.pathname.startsWith(props.href);

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
            'hover:bg-gray-700',
            isActive && cx('bg-gray-700', 'border-t-4', 'border-primary'),
          )}
        >
          {isActive ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
        </a>
      </Link>
    </li>
  );
}
