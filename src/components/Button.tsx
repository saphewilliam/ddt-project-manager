import cx from 'clsx';
import React, { ReactElement } from 'react';

export interface Props {
  label: string;
}

export default function Button(props: Props): ReactElement {
  return (
    <button
      className={cx(
        'mt-2',
        'bg-primary',
        'text-white',
        'w-full',
        'py-3',
        'rounded-lg',
        'font-bold',
      )}
    >
      {props.label}
    </button>
  );
}
