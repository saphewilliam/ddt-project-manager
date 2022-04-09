import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ProjectStatus } from '@graphql/__generated__/codegen-self';
import { fontColorFromBackgroundHex } from '@lib/stoneListHelpers';

export interface Props {
  status: ProjectStatus;
}

export default function EventsProjectPill(props: Props): ReactElement {
  switch (props.status) {
    case ProjectStatus.BUILDING:
      return (
        <span
          style={{ backgroundColor: '#900C3F', color: fontColorFromBackgroundHex('##900C3F') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Building
        </span>
      );
    case ProjectStatus.BUILT:
      return (
        <span
          style={{ backgroundColor: '#70ad47', color: fontColorFromBackgroundHex('#70ad47') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Built
        </span>
      );
    case ProjectStatus.CANCELLED:
      return (
        <span
          style={{ backgroundColor: '#C70039', color: fontColorFromBackgroundHex('#C70039') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Cancelled
        </span>
      );
    case ProjectStatus.COUNTED:
      return (
        <span
          style={{ backgroundColor: '#47ad83', color: fontColorFromBackgroundHex('#47ad83') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Counted
        </span>
      );
    case ProjectStatus.PLANNED:
      return (
        <span
          style={{ backgroundColor: '#ffc000', color: fontColorFromBackgroundHex('#ffc000') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        ></span>
      );
    case ProjectStatus.PLANNING:
      return (
        <span
          style={{ backgroundColor: '#f6f600', color: fontColorFromBackgroundHex('#f6f600') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Planning
        </span>
      );
    case ProjectStatus.READY:
      return (
        <span
          style={{ backgroundColor: '#70ad47', color: fontColorFromBackgroundHex('#70ad47') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Ready
        </span>
      );
    case ProjectStatus.STARTING:
      return (
        <span
          style={{ backgroundColor: '#52BE80', color: fontColorFromBackgroundHex('#52BE80') }}
          className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
        >
          Starting
        </span>
      );
  }
}
