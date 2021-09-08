import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import IconFacebook from '@components/Icons/IconFacebook';
import IconInstagram from '@components/Icons/IconInstagram';
import IconYouTube from '@components/Icons/IconYouTube';
import SMBtn from './SocialMediaButton';

export default function SocketFooter(): ReactElement {
  const d = new Date();
  return (
    <footer className={cx('flex', 'justify-between', 'items-center', 'py-3', 'px-8', 'bg-light')}>
      <span className={cx('text-sm')}>
        &copy; {d.getFullYear()}{' '}
        <Link href="https://dutchdominoteam.nl">
          <a target="_blank" rel="noopener" className={cx('font-semibold')}>
            Dutch Domino Team
          </a>
        </Link>
        . All rights reserved.
      </span>

      {/* Icons and brand colors from https://simpleicons.org/ */}
      <div className={cx('flex', 'space-x-4', 'text-dark-highlight')}>
        <SMBtn color="#F00" href="https://youtube.com/dutchdominoteam" label="YouTube">
          <IconYouTube />
        </SMBtn>
        <SMBtn color="#E4405F" href="https://instagram.com/dutch_domino_team/" label="Instagram">
          <IconInstagram />
        </SMBtn>
        <SMBtn color="#1877F2" href="https://facebook.com/dutchdominoteam" label="Facebook">
          <IconFacebook />
        </SMBtn>
      </div>
    </footer>
  );
}
