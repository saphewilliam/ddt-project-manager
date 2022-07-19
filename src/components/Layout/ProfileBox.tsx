import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useContext, useMemo } from 'react';
import { NavigationContext } from '@hooks/useNavigation';
import useSession from '@hooks/useSession';

export default function ProfileBox(): ReactElement {
  const navState = useContext(NavigationContext);
  const { session } = useSession();
  const avatar = useMemo(
    () => Buffer.from(createAvatar(style, { seed: session?.user.id })).toString('base64'),
    [session],
  );

  return (
    <Link href="/profile">
      <a
        title="Profile"
        className={cx(
          'flex',
          'items-center',
          'py-4',
          'px-3.5',
          'mt-12',
          'bg-gray-700',
          'hover:bg-gray-800',
          'transition-colors',
        )}
      >
        <div
          className={cx(
            'overflow-hidden',
            'bg-gray-900',
            'relative',
            'rounded-lg',
            'w-9',
            'min-w-[2.25rem]',
            'h-9',
          )}
        >
          {session && (
            <Image
              src={session.user.avatar ?? `data:image/svg+xml;base64,${avatar}`}
              layout="fill"
              objectFit="cover"
              alt="avatar"
            />
          )}
        </div>
        {session && (
          <div
            className={cx(
              'ml-3.5',
              'leading-6',
              'whitespace-nowrap',
              'transition-opacity',
              'duration-500',
              navState.collapsed && cx('opacity-0', 'pointer-events-none'),
            )}
          >
            <p className={cx('font-bold')}>
              {session?.user.firstName} {session?.user.lastName}
            </p>
            <p className={cx('text-gray', 'text-sm')}>
              {session?.team?.name} ({session.member?.role.toLowerCase()})
            </p>
          </div>
        )}
      </a>
    </Link>
  );
}
