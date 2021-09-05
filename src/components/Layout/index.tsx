import {
  HomeIcon as HomeOutline,
  ClipboardListIcon as ListOutline,
  TemplateIcon as EventOutline,
  UserGroupIcon as TeamOutline,
  LibraryIcon as AdminOutline,
  UserIcon as ProfileOutline,
  AnnotationIcon as FeedbackOutline,
} from '@heroicons/react/outline';
import {
  HomeIcon as HomeSolid,
  ClipboardListIcon as ListSolid,
  TemplateIcon as EventSolid,
  UserGroupIcon as TeamSolid,
  LibraryIcon as AdminSolid,
  UserIcon as ProfileSolid,
  AnnotationIcon as FeedbackSolid,
} from '@heroicons/react/solid';
import cx from 'clsx';
import Head from 'next/head';
import React, {
  ComponentProps,
  ReactElement,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { Role } from '@graphql/__generated__/codegen-self';
import useDeviceWidth from '@hooks/useDeviceWidth';
import useSdk from '@hooks/useSdk';
import { SessionContext } from '@lib/reactContext';
import { displayError } from '@lib/util';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export interface Props {
  children?: ReactNode;
}

export interface NavItemProps {
  label: string;
  href: string;
  exactHref?: boolean;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
  activeIcon: (props: ComponentProps<'svg'>) => ReactElement;
  subItems?: { label: string; href: string }[];
  navCollapsed?: boolean;
  expanded?: boolean;
  setExpanded?: (expand: boolean) => void;
  hidden?: boolean;
}

export default function Layout(props: Props): ReactElement {
  const device = useDeviceWidth();
  const session = useContext(SessionContext);
  const sdk = useSdk();
  const { data: uiData, error: uiError } = sdk.useGetUi();

  useEffect(() => {
    if (!uiData && uiError) displayError(uiError.message);
  }, [uiData, uiError]);

  const navItems: NavItemProps[] = useMemo<NavItemProps[]>(
    () => [
      {
        href: '/',
        exactHref: true,
        label: 'Dashboard',
        icon: HomeOutline,
        activeIcon: HomeSolid,
      },
      {
        href: '/lists',
        label: 'Lists',
        icon: ListOutline,
        activeIcon: ListSolid,
        subItems: uiData?.stoneListUsers.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          href: `/lists/${user.slug}`,
        })),
      },
      {
        href: '/events',
        label: 'Events',
        icon: EventOutline,
        activeIcon: EventSolid,
        subItems: uiData?.events.map((event) => ({
          label: event.name,
          href: `events/${event.slug}`,
        })),
      },
      {
        href: '/team',
        label: 'Team',
        icon: TeamOutline,
        activeIcon: TeamSolid,
        hidden: session?.member?.role !== Role.CAPTAIN,
      },
      {
        href: '/admin',
        label: 'Admin',
        icon: AdminOutline,
        activeIcon: AdminSolid,
        hidden: !session?.user.isAdmin,
      },
      {
        href: '/profile',
        label: 'Profile',
        icon: ProfileOutline,
        activeIcon: ProfileSolid,
        hidden: !device.mobile,
      },
      {
        href: '/feedback',
        label: 'Feedback',
        icon: FeedbackOutline,
        activeIcon: FeedbackSolid,
        hidden: session === null || session?.user.isAdmin,
      },
    ],
    [uiData, device, session],
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
