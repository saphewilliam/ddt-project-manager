import React, { ReactElement, useMemo } from 'react';
import cx from 'clsx';
import NavItem, { Props as NavItemProps } from './NavItem';
import ProfileBox from './ProfileBox';
import {
  HomeIcon as HomeOutline,
  ClipboardListIcon as ListOutline,
  TemplateIcon as EventOutline,
  UserGroupIcon as TeamOutline,
  LibraryIcon as AdminOutline,
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeSolid,
  ClipboardListIcon as ListSolid,
  TemplateIcon as EventSolid,
  UserGroupIcon as TeamSolid,
  LibraryIcon as AdminSolid,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function Navigation(): ReactElement {
  const router = useRouter();

  const navItems: NavItemProps[] = useMemo<NavItemProps[]>(
    () => [
      {
        href: '/',
        label: 'Dashboard',
        icon: HomeOutline,
        activeIcon: HomeSolid,
        active: router.pathname === '/',
      },
      {
        href: '/lists',
        label: 'Lists',
        icon: ListOutline,
        activeIcon: ListSolid,
        active: router.pathname.startsWith('/lists'),
      },
      {
        href: '/events',
        label: 'Events',
        icon: EventOutline,
        activeIcon: EventSolid,
        active: router.pathname.startsWith('/events'),
      },
      {
        href: '/team',
        label: 'Team',
        icon: TeamOutline,
        activeIcon: TeamSolid,
        active: router.pathname.startsWith('/team'),
      },
      {
        href: '/admin',
        label: 'Admin',
        icon: AdminOutline,
        activeIcon: AdminSolid,
        active: router.pathname.startsWith('/admin'),
      },
    ],
    [router],
  );

  return (
    <div className={cx('bg-dark', 'px-3', 'py-3', 'flex', 'flex-col', 'justify-between')}>
      <div>
        <div className={cx('mx-4', 'mt-4', 'mb-7', 'font-bold', 'text-xl', 'text-dark-fg')}>
          DDT Project Manager
        </div>

        <nav>
          <ul>
            {navItems.map((item, i) => (
              <NavItem key={i} {...item} />
            ))}
          </ul>
        </nav>
      </div>

      <ProfileBox />
    </div>
  );
}
