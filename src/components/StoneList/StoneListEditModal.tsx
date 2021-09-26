import cx from 'clsx';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button, { ButtonType } from '@components/Button';
import Modal from '@components/Modal';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';

export interface StoneListEditModalSettings {
  show: boolean;
  stoneId: string;
  userId: string;
  amount: number | null;
}

export interface Props {
  settings: StoneListEditModalSettings;
  setSettings: (settings: StoneListEditModalSettings) => void;
  revalidate: () => Promise<boolean>;
}

export default function StoneListEditModal(props: Props): ReactElement {
  const [stoneId, setStoneId] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const { data: stonesData } = useSafeQuery('useGetStones', {});
  const { data: usersData } = useSafeQuery('useGetUsers', {});
  const { getStoneList, updateStoneList } = useSdk();

  const updateAmount = useCallback(async () => {
    setLoading(true);
    const { stoneList } = await getStoneList({ stoneId, userId });
    if (stoneList) setAmount(stoneList.amount);
    else setAmount(0);
    setLoading(false);
  }, [stoneId, userId]);

  useEffect(() => {
    setStoneId(props.settings.stoneId);
    setUserId(props.settings.userId ?? '');
  }, [props.settings]);

  useEffect(() => {
    updateAmount();
  }, [stoneId, userId]);

  return (
    <Modal
      show={props.settings.show}
      setShow={(nextShow: boolean) => props.setSettings({ ...props.settings, show: nextShow })}
      title="Edit Stonelist"
      body={
        <>
          <form className={cx('space-y-4')}>
            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="editStoneListStone">Stone</label>
              <select
                name="editStoneListStone"
                id="editStoneListStone"
                value={stoneId}
                onChange={(e) => setStoneId(e.target.value)}
              >
                <option value="" disabled>
                  Select a stone from the list...
                </option>
                {stonesData?.stones.map((stone) => (
                  <option key={stone.id} value={stone.id}>
                    {stone.name} ({stone.alias}
                    {stone.alias2 ? ` -> ${stone.alias2}` : ''})
                  </option>
                ))}
              </select>
            </div>

            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="editStoneListUser">User</label>
              <select
                name="editStoneListUser"
                id="editStoneListUser"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="" disabled>
                  Select a user from the list...
                </option>
                {usersData?.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="editStoneListAmount">Amount</label>
              <input
                type="number"
                name="editStoneListAmount"
                id="editStoneListAmount"
                value={amount ?? ''}
                onChange={(e) => {
                  const parsed = parseInt(e.target.value);
                  if (e.target.value === '') setAmount(null);
                  else if (!isNaN(parsed) && parsed >= 0) setAmount(parsed);
                }}
                disabled={loading}
              />
            </div>
          </form>
        </>
      }
      footer={
        <>
          <Button
            label="Cancel"
            type={ButtonType.EMPTY}
            loading={loading}
            onClick={() => props.setSettings({ ...props.settings, show: false })}
          />
          <Button
            label="Submit"
            disabled={stoneId === '' || userId === '' || amount === null}
            loading={loading}
            onClick={async () => {
              setLoading(true);
              const data = await promiseWithCatch(
                updateStoneList({ stoneId, userId, amount: amount! }),
                'Could not edit stonelist',
              );
              if (data?.updateStoneList) {
                const { user, stone, amount } = data.updateStoneList;
                props.revalidate();
                toast.success(
                  `Successfully updated ${user.firstName} ${user.lastName}'s ${stone.name} to ${amount}!`,
                  { duration: 7000 },
                );
                props.setSettings({ ...props.settings, show: false });
              }
              setLoading(false);
            }}
          />
        </>
      }
    />
  );
}
