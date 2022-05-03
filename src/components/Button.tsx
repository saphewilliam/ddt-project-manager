import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, SVGProps } from 'react';
import ReactLoading from 'react-loading';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  EMPTY = 'EMPTY',
}

interface PropsBase {
  label: string;
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement;
  buttonType?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

interface ButtonProps extends PropsBase {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: 'submit' | 'button' | 'reset';
}

interface LinkProps extends PropsBase {
  href: string;
}

export type Props = PropsBase | ButtonProps | LinkProps;

export default function Button(props: Props): ReactElement {
  const buttonType = props.buttonType ?? ButtonType.PRIMARY;

  const className = cx(
    props.className,
    'block',
    props.loading || props.disabled
      ? cx('bg-gray', 'text-white')
      : buttonType === ButtonType.PRIMARY
      ? cx(
          'bg-primary',
          'hover:bg-primary-light',
          'shadow',
          'hover:shadow-md',
          'text-white',
          'font-bold',
        )
      : buttonType === ButtonType.EMPTY
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
    <div className={cx('flex', 'space-x-2', 'justify-center')}>
      {props.icon && <props.icon width={20} />}
      <span>{props.label}</span>
    </div>
  );

  return 'href' in props ? (
    <Link href={props.href}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    <button
      disabled={props.loading || props.disabled}
      type={'type' in props ? props.type : 'button'}
      className={className}
      onClick={(e) => 'onClick' in props && props.onClick(e)}
    >
      {children}
    </button>
  );
}
