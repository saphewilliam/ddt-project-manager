import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { NavItemProps } from './Navigation';

export interface Props {
  label: string;
  href: string;
  subItems: NavItemProps['subItems'];
  show: boolean;
  top: number | undefined;
}

export default function DesktopNavTooltip(props: Props): ReactElement {
  return (
    <div
      style={{ top: props.top, left: 65 }}
      className={cx(
        'fixed',
        'w-56',
        'pointer-events-none',
        'transition-opacity',
        !props.show && cx('opacity-0'),
      )}
    >
      <Link href={props.href}>
        <a
          title={props.label}
          tabIndex={-1}
          className={cx(
            'block',
            'py-2',
            'px-6',
            'bg-primary',
            'font-bold',
            props.show && 'pointer-events-auto',
          )}
        >
          {props.label}
        </a>
      </Link>
      {props.subItems && props.subItems.length > 0 && (
        <ul
          style={{ maxHeight: window.innerHeight - (props.top ?? 0) - 60 }}
          className={cx(
            'pb-2',
            'overflow-y-scroll',
            'scrollbar-thin',
            'bg-dark',
            'scrollbar-track-dark',
            'scrollbar-thumb-dark-highlight',
            props.show && 'pointer-events-auto',
          )}
        >
          {props.subItems.map((subItem, i) => (
            <li key={i}>
              <Link href={subItem.href}>
                <a
                  tabIndex={-1}
                  className={cx(
                    'block',
                    'px-6',
                    'py-2',
                    'hover:bg-dark-selected',
                    'text-light',
                    'transition-colors',
                    'whitespace-nowrap',
                    'truncate',
                  )}
                >
                  {subItem.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
