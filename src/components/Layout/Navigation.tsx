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
import React, { ReactElement, useMemo, ComponentProps } from 'react';
import { Role } from '@graphql/__generated__/codegen-self';
import useDeviceWidth from '@hooks/useDeviceWidth';
import useSafeQuery from '@hooks/useSafeQuery';
import useSession from '@hooks/useSession';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export interface NavItemProps {
  id: number;
  label: string;
  href: string;
  exactHref?: boolean;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
  activeIcon: (props: ComponentProps<'svg'>) => ReactElement;
  subItems?: { label: string; href: string }[];
  hidden?: boolean;
}

export default function Navigation(): ReactElement {
  const device = useDeviceWidth();
  const { session } = useSession();
  const { data } = useSafeQuery('useUi', {});

  const navItems: NavItemProps[] = useMemo<NavItemProps[]>(
    () => [
      {
        id: 0,
        href: '/',
        exactHref: true,
        label: 'Dashboard',
        icon: HomeOutline,
        activeIcon: HomeSolid,
      },
      {
        id: 1,
        href: '/inventory',
        label: 'Inventory',
        icon: ListOutline,
        activeIcon: ListSolid,
        subItems: [{ label: 'All', href: '/inventory/all' }].concat(
          data?.stoneListUsers.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            href: `/inventory/${user.slug}`,
          })) ?? [],
        ),
      },
      {
        id: 2,
        href: '/events',
        label: 'Events',
        icon: EventOutline,
        activeIcon: EventSolid,
        subItems: data?.events.map((event) => ({
          label: event.name,
          href: `/events/${event.slug}`,
        })),
      },
      {
        id: 3,
        href: '/team',
        label: 'Team',
        icon: TeamOutline,
        activeIcon: TeamSolid,
        hidden: session?.member?.role !== Role.CAPTAIN,
      },
      {
        id: 4,
        href: '/admin',
        label: 'Admin',
        icon: AdminOutline,
        activeIcon: AdminSolid,
        hidden: !session?.user.isAdmin,
      },
      {
        id: 5,
        href: '/profile',
        label: 'Profile',
        icon: ProfileOutline,
        activeIcon: ProfileSolid,
        hidden: !device?.xs,
      },
      {
        id: 6,
        href: '/feedback',
        label: 'Feedback',
        icon: FeedbackOutline,
        activeIcon: FeedbackSolid,
        hidden: session === null || session?.user.isAdmin,
      },
    ],
    [data, device, session],
  );

  return device?.xs ? <MobileNav navItems={navItems} /> : <DesktopNav navItems={navItems} />;
}
