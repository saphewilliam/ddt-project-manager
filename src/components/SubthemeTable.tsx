import { PlusSmIcon, MinusSmIcon, PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { fontColorFromBackground } from '@lib/stoneListHelpers';

export interface Props {
  eventSlug: string;
  subtheme: {
    color: string;
    name: string;
    projects: {
      id: string;
      name: string;
      slug: string;
      type: string;
      status: string;
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
              color: fontColorFromBackground(props.subtheme.color),
            }}
            className={cx('px-4', 'py-2')}
          >
            <div className={cx('flex', 'items-center')}>
              <button
                className={cx('py-1', 'px-1', 'rounded', 'transition-colors')}
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <MinusSmIcon className={cx('w-4')} />
                ) : (
                  <PlusSmIcon className={cx('w-4')} />
                )}
              </button>
              Subtheme: {props.subtheme.name}
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        {open &&
          props.subtheme.projects.map((project) => (
            <tr key={project.id}>
              <td
                style={{
                  width: '20px',
                  padding: '8px',
                  backgroundColor: props.subtheme.color,
                }}
              ></td>
              <td className={cx('border', 'border-gray-300', 'px-4', 'py-2', 'text-sm')}>
                <Link href={`/events/${props.eventSlug}/${project.slug}`}>
                  <a>{project.name}</a>
                </Link>
                <span className={cx('flex')}>{project.type}</span>
                <span className={cx('flex')}> 123456 stones</span>
                <span className={cx('flex')}>Supervisor: {project.supervisor?.displayName}</span>
                <span className={cx('flex')}>{project.status}</span>
              </td>
              <td className={cx('border', 'border-gray-300')} style={{ width: '90px' }}>
                {/* TODO */}
                <div className={cx('flex', 'justify-center')}>
                  <Link href="/edit/TODO">
                    <a className={cx('hover:bg-primary', 'p-2', 'rounded-md', 'transition-colors')}>
                      <PencilIcon className={cx('flex', 'w-4')} />
                    </a>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
