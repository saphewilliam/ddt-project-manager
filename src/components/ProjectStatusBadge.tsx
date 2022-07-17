import cx from 'clsx';
import React, { ReactElement } from 'react';
import { ProjectStatus } from '@graphql/__generated__/codegen-self';
import { fontColorFromBackgroundHex } from '@lib/util';

export interface Props {
  status: ProjectStatus;
}

export const projectStatuses: ProjectStatus[] = [
  ProjectStatus.CANCELLED,
  ProjectStatus.PLANNED,
  ProjectStatus.DESIGNING,
  ProjectStatus.DESIGNED,
  ProjectStatus.READY,
  ProjectStatus.BUILDING,
  ProjectStatus.BUILT,
  ProjectStatus.COUNTED,
];

export function getProjectStatusBadgeText(status: ProjectStatus): { label: string; color: string } {
  switch (status) {
    case ProjectStatus.CANCELLED:
      return { label: 'Cancelled', color: '#910000' };
    case ProjectStatus.PLANNED:
      return { label: 'Planned', color: '#9e3002' };
    case ProjectStatus.DESIGNING:
      return { label: 'Designing', color: '#aa6704' };
    case ProjectStatus.DESIGNED:
      return { label: 'Designed', color: '#b6a406' };
    case ProjectStatus.READY:
      return { label: 'Ready', color: '#9ec209' };
    case ProjectStatus.BUILDING:
      return { label: 'Building', color: '#6ece0c' };
    case ProjectStatus.BUILT:
      return { label: 'Built', color: '#39d90f' };
    case ProjectStatus.COUNTED:
      return { label: 'Counted', color: '#13e426' };
  }
}

export default function ProjectStatusBadge(props: Props): ReactElement {
  const { color, label } = getProjectStatusBadgeText(props.status);

  return (
    <span
      style={{ backgroundColor: color, color: fontColorFromBackgroundHex(color) }}
      className={cx('whitespace-nowrap', 'py-1', 'px-3', 'text-xs', 'rounded-md')}
    >
      {label}
    </span>
  );
}
