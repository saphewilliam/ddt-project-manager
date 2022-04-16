import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ProjectStatus } from '@graphql/__generated__/codegen-self';
import { fontColorFromBackgroundHex } from '@lib/stoneListHelpers';

export interface Props {
  status: ProjectStatus;
}

export default function EventsProjectPill(props: Props): ReactElement {
  let label = '';
  let color = '';
  switch (props.status) {
    case ProjectStatus.BUILDING:
      label = 'Building';
      color = '#900C3F';
      break;
    case ProjectStatus.BUILT:
      label = 'Built';
      color = '#70ad47';
      break;
    case ProjectStatus.CANCELLED:
      label = 'Cancelled';
      color = '#C70039';
      break;
    case ProjectStatus.COUNTED:
      label = 'Counted';
      color = '#47ad83';
      break;
    case ProjectStatus.PLANNED:
      label = 'Planned';
      color = '#ffc000';
      break;
    case ProjectStatus.PLANNING:
      label = 'Planning';
      color = '#f6f600';
      break;
    case ProjectStatus.READY:
      label = 'Ready';
      color = '#70ad47';
      break;
    case ProjectStatus.STARTING:
      label = 'Starting';
      color = '#52BE80';
      break;
  }
  return (
    <span
      style={{ backgroundColor: color, color: fontColorFromBackgroundHex(color) }}
      className={cx('whitespace-nowrap', 'py-1', 'px-2', 'text-xs')}
    >
      {label}
    </span>
  );
}
