import React, { ComponentProps, ReactElement } from 'react';
import cx from 'clsx';
import Link from 'next/link';

export interface Props {
  label: string;
  href: string;
  active: boolean;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
  activeIcon: (props: ComponentProps<'svg'>) => ReactElement;
  // collapsed: boolean;
  // items: { label: string }[] | null;
}

export default function NavItem(props: Props): ReactElement {
  const iconProps: ComponentProps<'svg'> = {
    width: 30,
  };

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
            <props.activeIcon {...iconProps} className={cx('text-dark')} />
          ) : (
            <props.icon
              {...iconProps}
              className={cx('text-dark-muted', 'group-hover:text-dark', 'duration-75')}
            />
          )}
          <span className={cx('ml-4', 'font-semibold', 'text-lg')}>{props.label}</span>
        </a>
      </Link>
    </li>
  );
}
