import React, { ReactElement } from 'react';
import cx from 'clsx';

export default function Test(): ReactElement {
  return <div className={cx('bg-primary', 'w-screen', 'h-screen')} />;
}
