import { ChevronDoubleRightIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { ReactElement, useContext } from 'react';
import { NavigationContext } from '@providers/NavigationProvider';
import DesktopNavItem from './DesktopNavItem';
import { NavItemProps } from './Navigation';
import ProfileBox from './ProfileBox';

interface Props {
  navItems: NavItemProps[];
}

export default function DesktopNav(props: Props): ReactElement {
  const navState = useContext(NavigationContext);
  const navWidth = navState.collapsed ? 2 * 12 + 41 : 2 * 12 + 258;

  return (
    <div
      className={cx(
        'flex',
        'flex-col',
        'justify-between',
        'transition-all',
        'duration-500',
        'overflow-y-scroll',
        'overflow-x-hidden',
        'scrollbar-thin',
        'bg-gray-900',
        'text-gray-200',
        'scrollbar-track-gray-900',
        'scrollbar-thumb-gray-800',
      )}
      style={{
        width: navWidth + 'px',
        minWidth: navWidth + 'px',
      }}
    >
      <div className={cx('px-3', 'pt-3')}>
        <div
          className={cx(
            'relative',
            'flex',
            'justify-end',
            'transition-all',
            'mb-7',
            'mt-4',
            'duration-500',
            navState.collapsed ? 'mx-1' : 'mx-3',
          )}
        >
          <h1
            className={cx(
              'font-bold',
              'text-lg',
              'transition-opacity',
              'whitespace-nowrap',
              'absolute',
              'right-[3.2rem]',
              'duration-500',
              navState.collapsed && cx('pointer-events-none', 'opacity-0'),
            )}
          >
            DDT Project Manager
          </h1>
          <button
            title="Toggle navigation"
            className={cx(
              'p-2',
              'rounded-full',
              'transition-colors',
              'bg-gray-700',
              'hover:bg-gray-800',
            )}
            onClick={() => navState.setCollapsed(!navState.collapsed)}
          >
            <ChevronDoubleRightIcon
              width={16}
              className={cx(
                'text-gray-200',
                !navState.collapsed && 'rotate-180',
                'transition-transform',
                'duration-500',
              )}
            />
          </button>
        </div>

        <nav>
          <ul>
            {props.navItems
              .filter((item) => !item.hidden)
              .map((item, i) => (
                <DesktopNavItem key={i} {...item} />
              ))}
          </ul>
        </nav>
      </div>

      <ProfileBox />
    </div>
  );
}
