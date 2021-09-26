import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';

export interface Props {
  label: string;
  color: string;
  href: string;
  children: ReactElement;
}

export default function SocialMediaButton(props: Props): ReactElement {
  const [hover, setHover] = useState(false);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link href={props.href}>
        <a
          title={props.label}
          style={{ color: hover ? props.color : 'inherit' }}
          target="_blank"
          rel="noopener"
          className={cx('transition-colors')}
        >
          {props.children}
        </a>
      </Link>
    </div>
  );
}
