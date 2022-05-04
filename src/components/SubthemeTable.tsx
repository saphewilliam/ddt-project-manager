import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { ProjectType, ProjectStatus } from '@graphql/__generated__/codegen-self';
import { projectTypeToString, fontColorFromBackgroundHex, formatNumber } from '@lib/util';
import ProjectStatusBadge from './ProjectStatusBadge';

export interface Props {
  eventSlug: string;
  subtheme: {
    color: string;
    name: string;
    stoneAmount: number;
    projects: {
      id: string;
      name: string;
      slug: string;
      type: ProjectType;
      status: ProjectStatus;
      stoneAmount: number;
      supervisor?: { displayName: string } | null;
    }[];
  };
}

export default function SubthemeTable(props: Props): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <table className={cx('table-auto', 'w-full')}>
      <thead>
        <tr>
          <td
            colSpan={3}
            style={{
              backgroundColor: props.subtheme.color,
              color: fontColorFromBackgroundHex(props.subtheme.color),
            }}
            className={cx('px-2', 'py-2', 'cursor-pointer')}
            onClick={() => setOpen(!open)}
          >
            <div className={cx('flex', 'items-center', 'space-x-2')}>
              <button className={cx('py-1', 'px-1')}>
                {open ? (
                  <MinusSmIcon className={cx('w-4')} />
                ) : (
                  <PlusSmIcon className={cx('w-4')} />
                )}
              </button>
              <span>
                {props.subtheme.name} ({formatNumber(props.subtheme.stoneAmount)} stones)
              </span>
            </div>
          </td>
        </tr>
      </thead>

      {open && (
        <tbody>
          {props.subtheme.projects.map((project) => (
            <tr key={project.id}>
              <td className={cx('w-4')} style={{ backgroundColor: props.subtheme.color }}></td>
              <td className={cx('border', 'border-gray-300', 'px-4', 'py-2', 'text-sm')}>
                <div className={cx('flex', 'flex-col', 'items-start')}>
                  <Link href={`/events/${props.eventSlug}/${project.slug}`}>
                    <a className={cx('font-bold')}>{project.name}</a>
                  </Link>
                  <span>{projectTypeToString(project.type)}</span>
                  <span>{formatNumber(project.stoneAmount)} stones</span>
                  <span>Supervisor: {project.supervisor?.displayName}</span>
                  <ProjectStatusBadge status={project.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
