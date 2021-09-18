import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, MouseEvent, useCallback } from 'react';
import ReactLoading from 'react-loading';

interface PropsBase {
  label: string;
  loading?: boolean;
}

interface ButtonProps extends PropsBase {
  onClick: (e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement, globalThis.MouseEvent>) => void;
}

interface LinkProps extends PropsBase {
  href: string;
}

export type Props = PropsBase | ButtonProps | LinkProps;

export default function Button(props: Props): ReactElement {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement, globalThis.MouseEvent>) => {
      if ('onClick' in props && !props.loading) props.onClick(e);
    },
    [props],
  );

  const className = cx(
    'block',
    'mt-2',
    props.loading ? 'bg-muted' : 'bg-primary',
    props.loading && 'cursor-default',
    'text-white',
    'w-full',
    'py-3',
    'rounded-lg',
    'font-bold',
  );

  const children: ReactElement = props.loading ? (
    <div className={cx('flex', 'justify-center')}>
      <ReactLoading color="#fff" type="bubbles" className={cx('-my-5')} />
    </div>
  ) : (
    <span>{props.label}</span>
  );

  return 'href' in props ? (
    <Link href={props.href}>
      <a className={className} onClick={handleClick}>
        {children}
      </a>
    </Link>
  ) : (
    <button disabled={props.loading} className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
