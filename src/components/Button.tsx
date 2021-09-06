import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface PropsBase {
  label: string;
}

interface ButtonProps extends PropsBase {
  onClick: () => void;
}

interface LinkProps extends PropsBase {
  href: string;
}

export type Props = PropsBase | ButtonProps | LinkProps;

export default function Button(props: Props): ReactElement {
  const className = cx(
    'block',
    'mt-2',
    'bg-primary',
    'text-white',
    'w-full',
    'py-3',
    'rounded-lg',
    'font-bold',
  );

  return 'href' in props ? (
    <Link href={props.href}>
      <a className={className}>{props.label}</a>
    </Link>
  ) : (
    <button className={className}>{props.label}</button>
  );
}
