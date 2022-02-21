import { PlusSmIcon, MinusSmIcon, PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';

export interface Props {
  subtheme: {
    color: string;
    name: string;
    projects: {
      id: string;
      name: string;
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
              padding: '0.75rem 2rem',
            }}
            className={cx('align-middle')}
          >
            <button
              className={cx('py-1', 'px-1', 'rounded', 'transition-colors')}
              onClick={() => setOpen(!open)}
            >
              {open ? <MinusSmIcon className={cx('w-4')} /> : <PlusSmIcon className={cx('w-4')} />}
            </button>
            Subthema: {props.subtheme.name}
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
              <td
                className={cx('border-t-solid', 'border', 'border-gray-900/20')}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '14px',
                }}
              >
                <span className={cx('flex')}>{project.name}</span>

                <span className={cx('flex')}>{project.type}</span>
                <span className={cx('flex')}> 123456 stenen</span>
                <span className={cx('flex')}>Supervisor: {project.supervisor?.displayName}</span>
                <span className={cx('flex')}>{project.status}</span>
              </td>
              <td
                className={cx('border-t-solid', 'border', 'border-gray-900/20')}
                style={{ width: '90px' }}
              >
                <PencilIcon className={cx('flex', 'w-4')} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
