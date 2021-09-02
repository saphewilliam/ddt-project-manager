import React, { ReactElement, useMemo } from 'react';
import cx from 'clsx';
import { useContext } from 'react';
import { SessionContext } from '@lib/reactContext';
import Image from 'next/image';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';

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
    <div
      className={cx(
        'flex',
        'justify-between',
        'items-center',
        'py-4',
        'px-3.5',
        'mt-12',
        'bg-dark-selected',
      )}
    >
      <div className={cx('flex', 'items-center')}>
        <div
          className={cx(
            'overflow-hidden',
            'bg-dark',
            'relative',
            'p-2',
            'rounded-full',
            'flex',
            'w-9',
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
              'ml-3',
              'leading-5',
              'whitespace-nowrap',
              'transition-opacity',
              'duration-500',
              props.navCollapsed && cx('opacity-0', 'pointer-events-none'),
            )}
          >
            <p className={cx('font-bold')}>
              {session?.user.firstName} {session?.user.lastName}
            </p>
            <p className={cx('text-muted', 'text-xs')}>
              {session?.team?.name} ({session?.member?.role.toLowerCase()})
            </p>
          </div>
        )}
      </div>
      <button>
        {/* TODO add menu with settings and logout options */}
        <DotsCircleHorizontalIcon width={27} />
      </button>
    </div>
  );
}
