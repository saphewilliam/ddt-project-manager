import React, { ReactElement, useState } from 'react';
import cx from 'clsx';
import DesktopNavItem from './DesktopNavItem';
import ProfileBox from './ProfileBox';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { NavItemProps } from '.';

interface Props {
  navItems: NavItemProps[];
}

export default function DesktopNav(props: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const navWidth = collapsed ? 2 * 12 + 41 : 2 * 12 + 258;

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
        'scrollbar',
        'scrollbar-thin',
        'bg-dark',
        'text-light',
        'scrollbar-track-dark',
        'scrollbar-thumb-dark-highlight',
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
            collapsed ? 'mx-1' : 'mx-3',
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
              collapsed && cx('pointer-events-none', 'opacity-0'),
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
              'bg-dark-selected',
              'hover:bg-dark-highlight',
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronDoubleRightIcon
              width={16}
              className={cx(
                'text-light',
                !collapsed && 'rotate-180',
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
                <DesktopNavItem
                  key={i}
                  {...item}
                  navCollapsed={collapsed}
                  expanded={i === expandedItem}
                  setExpanded={(expand) => setExpandedItem(expand ? i : null)}
                />
              ))}
          </ul>
        </nav>
      </div>

      <ProfileBox navCollapsed={collapsed} />
    </div>
  );
}
