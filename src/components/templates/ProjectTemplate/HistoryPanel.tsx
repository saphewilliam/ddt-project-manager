import cx from 'clsx';
import React, { ReactElement } from 'react';
import { ProjectQuery } from '@graphql/__generated__/codegen';
import { formatDate } from '@lib/util';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
}

export default function HistoryPanel({ project }: Props): ReactElement {
  return (
    <span className={cx('flex', 'space-x-1')}>
      <span className={cx('italic', 'font-bold')}>
        {project.createdBy ? project.createdBy.displayName : '~deleted user~'}
      </span>
      <span>created this project on</span>
      <span className={cx('font-bold')}>{formatDate(new Date(project.createdAt))}</span>
    </span>
  );
}
