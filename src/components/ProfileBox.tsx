import React, { ReactElement } from 'react';
import cx from 'clsx';
import { useContext } from 'react';
import { SessionContext } from '@lib/reactContext';
import { useEffect } from 'react';

export default function ProfileBox(): ReactElement {
  const session = useContext(SessionContext);

  useEffect(() => console.log(session), [session]);

  return (
    <div className={cx('bg-dark-highlight', 'rounded-lg', 'p-10', 'text-dark-fg')}>
      {session?.user.firstName} {session?.user.lastName}
    </div>
  );
}
