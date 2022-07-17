import cx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <div
      style={{ top: props.top, left: 65 }}
      className={cx(
        'fixed',
        'z-20',
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
            'bg-gray-900',
            'scrollbar-track-gray-800',
            'scrollbar-thumb-gray-600',
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
                    subItem.href === router.asPath
                      ? cx('bg-gray-700', 'text-white')
                      : cx('hover:bg-gray-700', 'text-gray-200', 'hover:text-white'),
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
