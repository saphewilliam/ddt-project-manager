import { PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { ProjectQuery, Role } from '@graphql/__generated__/codegen-self';
import useSession from '@hooks/useSession';
import DescriptionSection from './DescriptionSection';
import InfoSection from './InfoSection';
import ProjectPartsSection from './ProjectPartsSection';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
  swrKey: string;
}

export function GeneralPanelSection(props: {
  title: string;
  isEditing: boolean;
  project: NonNullable<ProjectQuery['project']>;
  startEditing: () => void;
  children: ReactNode;
}): ReactElement {
  const { session } = useSession();

  return (
    <section>
      <span className={cx('flex', 'space-x-2', 'mb-2')}>
        <h3 className={cx('font-bold', 'text-lg')}>{props.title}</h3>
        {!props.isEditing &&
          (session?.user.isAdmin ||
            session?.member?.role === Role.CAPTAIN ||
            session?.user.id === props.project.supervisor?.id) && (
            <button
              onClick={() => props.startEditing()}
              className={cx('border', 'py-1', 'px-2', 'rounded-md', 'hover:bg-gray-50')}
            >
              <PencilIcon width={16} />
            </button>
          )}
      </span>
      {props.children}
    </section>
  );
}

export default function GeneralPanel({ project, swrKey }: Props): ReactElement {
  return (
    <>
      <InfoSection {...{ project, swrKey }} />

      <hr className={cx('my-4')} />

      <DescriptionSection {...{ project, swrKey }} />

      <hr className={cx('my-4')} />

      <ProjectPartsSection {...{ project, swrKey }} />
    </>
  );
}
