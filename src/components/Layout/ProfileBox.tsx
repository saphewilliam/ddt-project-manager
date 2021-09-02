import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement, useMemo, useContext } from 'react';
import { SessionContext } from '@lib/reactContext';

export interface Props {
  navCollapsed: boolean;
}

export default function ProfileBox(props: Props): ReactElement {
  const session = useContext(SessionContext);
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
          'bg-dark-selected',
          'hover:bg-dark-highlight',
          'transition-colors',
        )}
      >
        <div
          className={cx(
            'overflow-hidden',
            'bg-dark',
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
              props.navCollapsed && cx('opacity-0', 'pointer-events-none'),
            )}
          >
            <p className={cx('font-bold')}>
              {session?.user.firstName} {session?.user.lastName}
            </p>
            <p className={cx('text-muted', 'text-sm')}>
              {session?.team?.name} ({session.member?.role.toLowerCase()})
            </p>
          </div>
        )}
      </a>
    </Link>
  );
}
