import React, { ComponentProps, ReactElement } from 'react';
import cx from 'clsx';
import Link from 'next/link';
import { useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { NavItemProps } from '.';

export default function DesktopNavItem(props: NavItemProps): ReactElement {
  const ref = useRef<HTMLUListElement>(null);

  const className = cx(
    'flex',
    'items-center',
    'justify-between',
    'py-2',
    props.navCollapsed ? 'px-2' : 'px-3',
    'w-full',
    'rounded-md',
    'cursor-pointer',
    'text-light',
    'transition-all',
    'hover:bg-dark-selected',
    props.active && 'bg-dark-selected',
  );

  const iconProps: ComponentProps<'svg'> = {
    width: 25,
    className: cx('text-light', 'transition-all', 'duration-500', !props.navCollapsed && 'mr-3'),
  };

  const commonChildren: ReactElement = (
    <div className={cx('flex', 'items-end')}>
      {props.active ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
      <span
        className={cx(
          'duration-500',
          'transition-opacity',
          props.navCollapsed && cx('opacity-0', 'pointer-events-none)'),
        )}
      >
        {props.label}
      </span>
    </div>
  );

  return (
    <li className={cx('my-1')}>
      {props.subItems && props.subItems.length > 0 ? (
        <>
          <button
            title={props.label}
            className={className}
            onClick={() =>
              !props.navCollapsed && props.setExpanded && props.setExpanded(!props.expanded)
            }
          >
            {commonChildren}
            <ChevronRightIcon
              width={18}
              className={cx(
                'transition-all',
                'duration-200',
                props.expanded && 'rotate-90',
                props.navCollapsed && cx('opacity-0', 'pointer-events-none'),
              )}
            />
          </button>
          <ul
            ref={ref}
            className={cx(
              props.navCollapsed ? 'ml-4' : 'ml-[1.4rem]',
              props.expanded && !props.navCollapsed && 'my-2',
              'transition-all',
              'duration-500',
              'overflow-hidden',
            )}
            style={{
              maxHeight:
                (!props.expanded || props.navCollapsed ? 0 : ref.current?.scrollHeight) + 'px',
            }}
          >
            {props.subItems.map((subItem, index) => (
              <li
                key={index}
                className={cx(
                  'pl-6',
                  'pr-3',
                  'py-1',
                  'border-l-4',
                  'border-muted',
                  'hover:bg-dark-selected',
                  'text-muted',
                  'hover:text-white',
                  'transition-colors',
                  'whitespace-nowrap',
                  'truncate',
                )}
              >
                <Link href={subItem.href}>
                  <a tabIndex={props.expanded ? 0 : -1}>{subItem.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link href={props.href}>
          <a title={props.label} className={className}>
            {commonChildren}
          </a>
        </Link>
      )}
    </li>
  );
}
