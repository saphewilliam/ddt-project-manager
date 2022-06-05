import cx from 'clsx';
import React, { ReactElement } from 'react';
import { ProjectQuery } from '@graphql/__generated__/codegen-self';
import { formatDate } from '@lib/util';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
}

export default function HistoryPanel({ project }: Props): ReactElement {
  return (
    <span className={cx('flex', 'space-x-1')}>
      <span>On</span>
      <span className={cx('font-bold')}>{formatDate(new Date(project.createdAt))}</span>
      <span className={cx('italic')}>
        {project.createdBy ? project.createdBy.displayName : '~deleted user~'}
      </span>
      <span>created this project</span>
    </span>
  );
}
