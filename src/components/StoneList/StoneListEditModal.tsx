import cx from 'clsx';
import React, { ReactElement } from 'react';
import Button, { ButtonType } from '@components/Button';
import Modal from '@components/Modal';

export interface StoneListEditModalSettings {
  show: boolean;
  stoneId: string;
  userId: string;
}

export interface Props {
  settings: StoneListEditModalSettings;
  setSettings: (settings: StoneListEditModalSettings) => void;
}

export default function StoneListEditModal(props: Props): ReactElement {
  return (
    <Modal
      show={props.settings.show}
      setShow={(nextShow: boolean) => props.setSettings({ ...props.settings, show: nextShow })}
      title="Edit Stonelist"
      body={
        <>
          <form action="" className={cx('space-y-4')}>
            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="">Stone</label>
              <select name="" id="" value="">
                <option value="" disabled>
                  Select a stone from the list...
                </option>
              </select>
            </div>

            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="">User</label>
              <select name="" id="" value="">
                <option value="" disabled>
                  Select a user from the list...
                </option>
              </select>
            </div>

            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="">Amount</label>
              <input type="number" name="" id="" value={0} />
            </div>
          </form>
        </>
      }
      footer={
        <>
          <Button label="Cancel" type={ButtonType.EMPTY} />
          <Button label="Submit" />
        </>
      }
    />
  );
}
