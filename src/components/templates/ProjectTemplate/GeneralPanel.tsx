import { PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode } from 'react';
import Loading from '@components/Loading';
import { Role } from '@graphql/__generated__/codegen';
import { ProjectQuery, useProjectQuery } from '@graphql/Project/__generated__/queries';
import useSession from '@hooks/useSession';
import useURLParams from '@hooks/useURLParams';
import { extractURLParam } from '@lib/util';
import DescriptionSection from './DescriptionSection';
import InfoSection from './InfoSection';
import ProjectPartsSection from './ProjectPartsSection';

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
      <span className={cx('flex', 'space-x-3', 'mb-2')}>
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

export default function GeneralPanel(): ReactElement {
  const iets = useURLParams({ array: false, name: 'hello', type: 'string' });

  const router = useRouter();
  const projectId = extractURLParam('projectId', router.query);
  const [projectQuery, refetchProject] = useProjectQuery({
    variables: { where: { id: projectId } },
  });

  const project = projectQuery.data?.project;
  if (!project) return <Loading />;

  return (
    <>
      <InfoSection {...{ project }} />

      <hr className={cx('my-4')} />

      <DescriptionSection {...{ project }} />

      <hr className={cx('my-4')} />

      <ProjectPartsSection {...{ project }} />
    </>
  );
}
