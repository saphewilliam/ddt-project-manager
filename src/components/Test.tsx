import React, { ReactElement } from 'react';
import cx from 'clsx';

export default function Test(): ReactElement {
  return <div className={cx('bg-red-500', 'w-screen', 'h-screen')} />;
}
