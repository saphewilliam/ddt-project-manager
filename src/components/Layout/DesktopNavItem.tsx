import { ChevronRightIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  ComponentProps,
  ReactElement,
  useRef,
  useEffect,
  useState,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { NavigationContext } from '@providers/NavigationProvider';
import DesktopNavTooltip from './DesktopNavTooltip';
import { NavItemProps } from './Navigation';

export default function DesktopNavItem(props: NavItemProps): ReactElement {
  const [tooltipTop, setTooltipTop] = useState<number | undefined>(undefined);
  const [showTooltip, setShowTooltip] = useState(false);

  const navState = useContext(NavigationContext);

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
    navState.collapsed ? 'px-2' : 'px-3',
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
    className: cx('transition-all', 'duration-500', !navState.collapsed && 'mr-3'),
  };

  const commonChildren: ReactElement = (
    <div className={cx('flex', 'items-end')}>
      {isActive ? <props.activeIcon {...iconProps} /> : <props.icon {...iconProps} />}
      <span className={cx('duration-500', 'transition-opacity', navState.collapsed && 'opacity-0')}>
        {props.label}
      </span>
    </div>
  );

  useEffect(() => {
    setTooltipTop(itemRef.current?.getBoundingClientRect().top);
  }, [itemRef]);

  useEffect(() => {
    if (!navState.collapsed) setShowTooltip(false);
  }, [navState.collapsed]);

  return (
    <li
      ref={itemRef}
      className={cx('my-1')}
      onMouseEnter={() => navState.collapsed && setShowTooltip(true)}
      onMouseLeave={() => navState.collapsed && setShowTooltip(false)}
    >
      {props.subItems && props.subItems.length > 0 ? (
        <>
          <button
            title={props.label}
            className={className}
            onClick={() =>
              !navState.collapsed &&
              navState.setExpandedItem(navState.expandedItem === props.id ? null : props.id)
            }
          >
            {commonChildren}
            <ChevronRightIcon
              width={18}
              className={cx(
                'transition-all',
                'duration-200',
                navState.expandedItem === props.id && 'rotate-90',
              )}
            />
          </button>
          <ul
            ref={listRef}
            className={cx(
              navState.collapsed ? 'ml-[1.2rem]' : 'ml-[1.4rem]',
              navState.expandedItem === props.id && !navState.collapsed && 'my-2',
              'transition-all',
              'duration-500',
              'overflow-hidden',
            )}
            style={{
              maxHeight:
                !(navState.expandedItem === props.id) || navState.collapsed
                  ? 0
                  : listRef.current?.scrollHeight,
            }}
          >
            {props.subItems.map((subItem, i) => (
              <li className={cx('border-l-4', 'border-muted')} key={i}>
                <Link href={subItem.href}>
                  <a
                    tabIndex={navState.expandedItem === props.id && !navState.collapsed ? 0 : -1}
                    className={cx(
                      'block',
                      'pl-6',
                      'pr-3',
                      'py-1',
                      router.asPath.startsWith(subItem.href)
                        ? 'bg-dark-selected'
                        : cx('hover:bg-dark-selected', 'text-muted', 'hover:text-white'),
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
        <DesktopNavTooltip
          label={props.label}
          href={props.href}
          subItems={props.subItems}
          show={showTooltip}
          top={tooltipTop}
        />,
        document.querySelector('#__next')!,
      )}
    </li>
  );
}
