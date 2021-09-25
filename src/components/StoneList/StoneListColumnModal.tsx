import cx from 'clsx';
import React, { ReactElement } from 'react';
import Modal from '@components/Modal';
import { RenderHeadProps } from '@hooks/useTable';

export interface Props {
  title: string;
  show: boolean;
  setShow: (value: boolean) => void;
  originalHeaders: RenderHeadProps[];
}

export default function StoneListColumnModal(props: Props): ReactElement {
  return (
    <Modal show={props.show} setShow={props.setShow} title="Show / Hide Columns" body={
      <div className={cx('flex', 'flex-col')}>
        {props.originalHeaders
          .filter((header) => header.toggleHide)
          .map((header, i) => (
            <div key={i} className={cx('flex', 'items-center', 'space-x-3')}>
              <input
                tabIndex={props.show ? 0 : -1}
                className={cx('text-primary', 'focus:ring-primary')}
                type="checkbox"
                id={`${props.title}-${header.name}`}
                checked={!header.hidden}
                onChange={() => header.toggleHide!()}
              />
              <label htmlFor={`${props.title}-${header.name}`}>{header.label}</label>
            </div>
          ))}
      </div>
    }/>
  );
}
