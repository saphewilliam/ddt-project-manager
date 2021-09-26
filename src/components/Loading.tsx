import cx from 'clsx';
import React, { ReactElement } from 'react';
import ReactLoading from 'react-loading';

export interface Props {
  className?: string;
}

export default function Loading(props: Props): ReactElement {
  return (
    <div className={cx('flex', 'justify-center', 'items-center', 'h-full', 'w-full')}>
      <ReactLoading color="#989A9E" type="spinningBubbles" className={cx(props.className)} />
    </div>
  );
}
