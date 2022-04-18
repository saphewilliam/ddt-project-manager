import cx from 'clsx';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Button, { ButtonType } from '@components/Button';
import Modal from '@components/Modal';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';

export interface AttributeInventoryEditModalSettings {
  show: boolean;
  stoneId: string;
  userId: string;
  amount: number | null;
}

export interface Props {
  settings: AttributeInventoryEditModalSettings;
  setSettings: (settings: AttributeInventoryEditModalSettings) => void;
  swrKey: string;
}

export default function AttributeInventoryEditModal(props: Props): ReactElement {
  const [attributeId, setAttributeId] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const { data: attributesData } = useSafeQuery('useAttributes', {});
  const { data: usersData } = useSafeQuery('useUsers', {});
  const sdk = useSdk();

  const { mutate } = useSWRConfig();

  const updateAmount = useCallback(async () => {
    setLoading(true);
    const { attributeList } = await sdk.AttributeList({ attributeId, userId });
    if (attributeList) setAmount(attributeList.amount);
    else setAmount(0);
    setLoading(false);
  }, [attributeId, userId]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (attributeId === '' || userId === '' || amount === null) return;
    setLoading(true);
    const data = await promiseWithCatch(
      sdk.UpdateAttributeList({ attributeId, userId, amount: amount! }),
      'Could not edit stonelist',
    );
    if (data?.updateAttributeList) {
      const { user, attribute, amount } = data.updateAttributeList;
      await mutate(props.swrKey);
      toast.success(
        `Successfully updated ${user.firstName} ${user.lastName}'s ${attribute.name} amount to ${amount}!`,
        { duration: 7000 },
      );
      props.setSettings({ ...props.settings, show: false });
    }
    setLoading(false);
  }

  useEffect(() => {
    setAttributeId(props.settings.stoneId);
    setUserId(props.settings.userId);
  }, [props.settings]);

  useEffect(() => {
    updateAmount();
  }, [attributeId, userId]);

  return (
    <Modal
      show={props.settings.show}
      setShow={(nextShow: boolean) => props.setSettings({ ...props.settings, show: nextShow })}
      title="Edit Attribute Inventory"
      body={
        <>
          <form className={cx('space-y-4')} onSubmit={handleSubmit}>
            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="editAttributeInventoryAttribute">Attribute</label>
              <select
                name="editAttributeInventoryAttribute"
                id="editAttributeInventoryAttribute"
                value={attributeId}
                onChange={(e) => setAttributeId(e.target.value)}
              >
                <option value="" disabled>
                  Select an attribute from the list...
                </option>
                {attributesData?.attributes.map((attribute) => (
                  <option key={attribute.id} value={attribute.id}>
                    {attribute.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx('flex', 'flex-col', 'space-y-1')}>
              <label htmlFor="editAttributeInventoryUser">User</label>
              <select
                name="editAttributeInventoryUser"
                id="editAttributeInventoryUser"
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
              <label htmlFor="editAttributeInventoryAmount">Amount</label>
              <input
                type="number"
                name="editAttributeInventoryAmount"
                id="editAttributeInventoryAmount"
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
            disabled={attributeId === '' || userId === '' || amount === null}
            loading={loading}
            onClick={handleSubmit}
          />
        </>
      }
    />
  );
}
