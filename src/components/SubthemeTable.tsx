import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline';
import cx from 'clsx';
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
    <table className={cx('table-auto', 'w-100')}>
      <thead>
        <tr>
          <td colSpan={3} style={{ backgroundColor: props.subtheme.color }}>
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
              <td>
                <span>{project.name}</span>
                <span>{project.type}</span>
                <span> 123456 stenen</span>
                <span>Supervisor: {project.supervisor?.displayName}</span>
                <span>{project.status}</span>
              </td>
              <td style={{ width: '90px' }}>Edit.....</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
