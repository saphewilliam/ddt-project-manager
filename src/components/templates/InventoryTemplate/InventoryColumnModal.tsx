import { RenderHeadProps, VisibilityHelpers } from '@saphe/react-table';
import cx from 'clsx';
import React, { ReactElement } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';

export interface Props {
  title: string;
  show: boolean;
  setShow: (value: boolean) => void;
  originalHeaders: RenderHeadProps[];
  visibilityHelpers: VisibilityHelpers;
}

export default function InventoryColumnModal(props: Props): ReactElement {
  return (
    <Modal
      show={props.show}
      setShow={props.setShow}
      title="Show / Hide Columns"
      body={
        <div className={cx('flex', 'flex-col')}>
          {props.originalHeaders
            .filter((header) => header.toggleVisibility)
            .map((header, i) => (
              <div key={i} className={cx('flex', 'items-center', 'space-x-3')}>
                <input
                  tabIndex={props.show ? 0 : -1}
                  className={cx('text-primary', 'focus:ring-primary')}
                  type="checkbox"
                  id={`${props.title}-${header.name}`}
                  checked={!header.hidden}
                  onChange={() => header.toggleVisibility!()}
                />
                <label htmlFor={`${props.title}-${header.name}`}>{header.label}</label>
              </div>
            ))}
          <div className={cx('flex', 'mt-4', 'space-x-2')}>
            <Button label="Hide all" onClick={props.visibilityHelpers.hideAll} />
            <Button label="Show all" onClick={props.visibilityHelpers.showAll} />
          </div>
        </div>
      }
    />
  );
}
