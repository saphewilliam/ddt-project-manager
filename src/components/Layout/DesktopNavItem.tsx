import { ChevronRightIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ComponentProps, ReactElement, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavItemProps } from './';

export default function DesktopNavItem(props: NavItemProps): ReactElement {
  const [tooltipTop, setTooltipTop] = useState<number | undefined>(undefined);
  const [showTooltip, setShowTooltip] = useState(false);

  const itemRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const isActive = props.exactHref
    ? router.pathname === props.href
    : router.pathname.startsWith(props.href);

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
    (isActive || showTooltip) && 'bg-dark-selected',
  );

  const iconProps: ComponentProps<'svg'> = {
    width: 25,
    className: cx('transition-all', 'duration-500', !props.navCollapsed && 'mr-3'),
  };

  const commonChildren: ReactElement = (
    <div className={cx('flex', 'items-end')}>
      {isActive ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
      <span className={cx('duration-500', 'transition-opacity', props.navCollapsed && 'opacity-0')}>
        {props.label}
      </span>
    </div>
  );

  useEffect(() => {
    setTooltipTop(itemRef.current?.getBoundingClientRect().top);
  }, [itemRef]);

  useEffect(() => {
    if (!props.navCollapsed) setShowTooltip(false);
  }, [props.navCollapsed]);

  return (
    <li
      ref={itemRef}
      className={cx('my-1')}
      onMouseEnter={() => props.navCollapsed && setShowTooltip(true)}
      onMouseLeave={() => props.navCollapsed && setShowTooltip(false)}
    >
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
              className={cx('transition-all', 'duration-200', props.expanded && 'rotate-90')}
            />
          </button>
          <ul
            ref={listRef}
            className={cx(
              props.navCollapsed ? 'ml-[1.2rem]' : 'ml-[1.4rem]',
              props.expanded && !props.navCollapsed && 'my-2',
              'transition-all',
              'duration-500',
              'overflow-hidden',
            )}
            style={{
              maxHeight: !props.expanded || props.navCollapsed ? 0 : listRef.current?.scrollHeight,
            }}
          >
            {props.subItems.map((subItem, i) => (
              <li className={cx('border-l-4', 'border-muted')} key={i}>
                <Link href={subItem.href}>
                  <a
                    tabIndex={props.expanded && !props.navCollapsed ? 0 : -1}
                    className={cx(
                      'block',
                      'pl-6',
                      'pr-3',
                      'py-1',
                      'hover:bg-dark-selected',
                      'text-muted',
                      'hover:text-white',
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
        </>
      ) : (
        <Link href={props.href}>
          <a title={props.label} className={className}>
            {commonChildren}
          </a>
        </Link>
      )}
      {createPortal(
        <div
          style={{ top: tooltipTop, left: 65 }}
          className={cx(
            'fixed',
            'w-56',
            'pointer-events-none',
            'transition-opacity',
            !showTooltip && cx('opacity-0'),
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
                showTooltip && 'pointer-events-auto',
              )}
            >
              {props.label}
            </a>
          </Link>
          {props.subItems && props.subItems.length > 0 && (
            <ul
              style={{ maxHeight: window.innerHeight - (tooltipTop ?? 0) - 60 }}
              className={cx(
                'pb-2',
                'overflow-y-scroll',
                'scrollbar',
                'scrollbar-thin',
                'bg-dark',
                'scrollbar-track-dark',
                'scrollbar-thumb-dark-highlight',
                showTooltip && 'pointer-events-auto',
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
        </div>,
        document.querySelector('#__next')!,
      )}
    </li>
  );
}
