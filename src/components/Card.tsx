import cx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';

export interface Props {
  title?: string;
  className?: string;
  hoverable?: boolean;
  children?: ReactNode;
  headerChildren?: ReactNode;
}

export default function Card(props: Props): ReactElement {
  return (
    <div
      className={cx(
        'flex',
        'flex-col',
        'rounded-lg',
        'border-solid',
        'border',
        'border-gray-200',
        'bg-white',
        'shadow-md',
        'shadow-gray-200',
        'px-7',
        'py-5',
        props.hoverable && cx('hover:shadow-lg', 'transition-shadow'),
        props.className,
      )}
    >
      {props.title && (
        <div
          className={cx(
            'flex',
            'flex-col',
            'md:flex-row',
            'mb-6',
            'justify-between',
            'items-start',
            'space-y-5',
            'md:space-y-0',
          )}
        >
          <h3 className={cx('text-2xl', 'font-bold')}>{props.title}</h3>
          {props.headerChildren && <div>{props.headerChildren}</div>}
        </div>
      )}
      {props.children}
    </div>
  );
}
