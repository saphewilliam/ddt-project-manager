import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import IconFacebook from '@icons/IconFacebook';
import IconInstagram from '@icons/IconInstagram';
import IconYouTube from '@icons/IconYouTube';
import SMBtn from './SocialMediaButton';

export default function SocketFooter(): ReactElement {
  const d = new Date();
  return (
    <footer
      className={cx(
        'flex',
        'flex-col',
        'md:flex-row',
        'justify-between',
        'items-center',
        'py-3',
        'px-8',
        'space-y-2',
        'md:space-y-0',
        'bg-gray-100',
      )}
    >
      <span className={cx('text-sm', 'text-center', 'w-48', 'sm:w-auto')}>
        &copy; {d.getFullYear()}{' '}
        <Link href="https://dutchdominoteam.nl">
          <a target="_blank" rel="noopener" className={cx('font-semibold')}>
            Dutch Domino Team
          </a>
        </Link>
        . All rights reserved.
      </span>

      {/* Icons and brand colors from https://simpleicons.org/ */}
      <div className={cx('flex', 'space-x-4', 'text-gray-700')}>
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
