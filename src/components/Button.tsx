import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, MouseEvent, useCallback, SVGProps } from 'react';
import ReactLoading from 'react-loading';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  EMPTY = 'EMPTY',
}

interface PropsBase {
  label: string;
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement;
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
      ? cx('bg-gray', 'text-white')
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
      ? cx('text-gray-900', 'font-semibold')
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
    <div className={cx('flex', 'space-x-2')}>
      {props.icon && <props.icon width={20} />}
      <span>{props.label}</span>
    </div>
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
