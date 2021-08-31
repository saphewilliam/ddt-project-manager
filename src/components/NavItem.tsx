import React, { ComponentProps, ReactElement } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

export interface Props {
  label: string;
  href: string;
  active: boolean;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
  activeIcon: (props: ComponentProps<'svg'>) => ReactElement;
  subItems?: { label: string; href: string }[];
  // navCollapsed: boolean;
}

export default function NavItem(props: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(true);

  const canExpand = props.subItems && props.subItems.length > 0;

  return (
    <li>
      <Link href={props.href}>
        <a
          aria-label={props.label}
          className={cx(
            'flex',
            'items-center',
            'px-4',
            'py-2',
            'my-1',
            'rounded-lg',
            props.active && 'bg-dark-highlight',
            'hover:bg-dark-highlight',
            'text-dark-fg',
            'transition-colors',
            'duration-200',
            'group',
          )}
        >
          {props.active ? (
            <props.activeIcon width={30} className={cx('text-dark')} />
          ) : (
            <props.icon
              width={30}
              className={cx('text-dark-muted', 'group-hover:text-dark', 'duration-75')}
            />
          )}
          <span className={cx('ml-4', 'text-lg')}>{props.label}</span>
          {canExpand && (
            <span>
              <ChevronRightIcon width={18} className={cx('text-white')} />
            </span>
          )}
        </a>
      </Link>
      {canExpand && (
        <ul>
          {props.subItems?.map((subItem, index) => (
            <li key={index}>{subItem.label}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
