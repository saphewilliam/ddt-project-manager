import cx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';

export interface Props {
  className: string;
  children: ReactNode;
}

export default function Card(props: Props): ReactElement {
  return (
    <div
      className={cx(
        'flex',
        'justify-between',
        'rounded-md',
        'border-solid',
        'border',
        'border-gray-900/10',
        'shadow-sm',
        'px-7',
        'py-5',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
