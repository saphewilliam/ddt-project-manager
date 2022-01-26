import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, MouseEvent, useCallback } from 'react';
import ReactLoading from 'react-loading';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  EMPTY = 'EMPTY',
  SECONDARY = 'SECONDARY',
}

interface PropsBase {
  label: string;
  type?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

interface ButtonProps extends PropsBase {
  onClick: (e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement, globalThis.MouseEvent>) => void;
}

interface LinkProps extends PropsBase {
  href: string;
}

export type Props = PropsBase | ButtonProps | LinkProps;

export default function Button(props: Props): ReactElement {
  const type = props.type ?? ButtonType.PRIMARY;

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement, globalThis.MouseEvent>) => {
      if ('onClick' in props && !props.loading) props.onClick(e);
    },
    [props],
  );

  const className = cx(
    props.className,
    'block',
    props.loading || props.disabled
      ? cx('bg-muted', 'text-white')
      : type === ButtonType.PRIMARY
      ? cx(
          'bg-primary',
          'hover:bg-primary-light',
          'shadow',
          'hover:shadow-md',
          'text-white',
          'font-bold',
        )
      : type === ButtonType.EMPTY
      ? cx('text-black', 'font-semibold')
      : type === ButtonType.SECONDARY
      ? cx(
          'bg-secondary',
          'hover:bg-secondary-dark',
          'shadow',
          'hover:shadow-md',
          'text-white',
          'font-bold',
        )
      : '',
    (props.loading || props.disabled) && 'cursor-default',
    'transition-all',
    'py-2',
    'px-5',
    'rounded-lg',
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
    <button disabled={props.loading || props.disabled} className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
