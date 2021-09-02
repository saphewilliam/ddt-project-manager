import React, { ComponentProps, ReactElement, ReactNode, useMemo } from 'react';
import cx from 'clsx';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useDeviceWidth from '@hooks/useDeviceWidth';
import {
  HomeIcon as HomeOutline,
  ClipboardListIcon as ListOutline,
  TemplateIcon as EventOutline,
  UserGroupIcon as TeamOutline,
  LibraryIcon as AdminOutline,
  UserIcon as ProfileOutline,
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeSolid,
  ClipboardListIcon as ListSolid,
  TemplateIcon as EventSolid,
  UserGroupIcon as TeamSolid,
  LibraryIcon as AdminSolid,
  UserIcon as ProfileSolid,
} from '@heroicons/react/solid';
import { useContext } from 'react';
import { SessionContext } from '@lib/reactContext';
import { Role } from '@graphql/__generated__/codegen-self';

export interface Props {
  children?: ReactNode;
}

export interface NavItemProps {
  label: string;
  href: string;
  active: boolean;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
  activeIcon: (props: ComponentProps<'svg'>) => ReactElement;
  subItems?: { label: string; href: string }[];
  navCollapsed?: boolean;
  expanded?: boolean;
  setExpanded?: (expand: boolean) => void;
  hidden?: boolean;
}

export default function Layout(props: Props): ReactElement {
  const router = useRouter();
  const device = useDeviceWidth();
  const session = useContext(SessionContext);

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
        subItems: Array.from(Array(10)).map(() => ({
          label: 'hello world lorem ipsum dolor etsam',
          href: '/lists/hello-world',
        })),
      },
      {
        href: '/events',
        label: 'Events',
        icon: EventOutline,
        activeIcon: EventSolid,
        active: router.pathname.startsWith('/events'),
        subItems: Array.from(Array(10)).map(() => ({
          label: 'hello world lorem ipsum dolor etsam',
          href: '/lists/hello-world',
        })),
      },
      {
        href: '/team',
        label: 'Team',
        icon: TeamOutline,
        activeIcon: TeamSolid,
        active: router.pathname.startsWith('/team'),
        hidden: session?.member?.role !== Role.CAPTAIN,
      },
      {
        href: '/admin',
        label: 'Admin',
        icon: AdminOutline,
        activeIcon: AdminSolid,
        active: router.pathname.startsWith('/admin'),
        hidden: !session?.user.isAdmin,
      },
      {
        href: '/profile',
        label: 'Profile',
        icon: ProfileOutline,
        activeIcon: ProfileSolid,
        active: router.pathname.startsWith('/profile'),
        hidden: !device.mobile,
      },
    ],
    [router, session],
  );

  return (
    <div className={cx('w-screen', 'h-screen', 'flex', device.mobile && 'flex-col-reverse')}>
      <Head>
        <title>DDT Project Manager</title>
      </Head>
      {device.mobile ? <MobileNav navItems={navItems} /> : <DesktopNav navItems={navItems} />}
      <main className={cx('px-16', 'pt-12', 'flex-grow')}>{props.children}</main>
    </div>
  );
}
