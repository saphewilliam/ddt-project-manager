import cx from 'clsx';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Button, { ButtonType } from '@components/Button';
import Modal from '@components/Modal';
import Tabs from '@components/Tabs';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';

export interface InventoryEditModalSettings {
  show: boolean;
  id: { attribute: string } | { stone: string } | null;
  userId: string;
  amount: number | null;
}

export interface Props {
  settings: InventoryEditModalSettings;
  setSettings: (settings: InventoryEditModalSettings) => void;
  swrKey: string;
}

export default function InventoryEditModal(props: Props): ReactElement {
  const [attributeId, setAttributeId] = useState('');
  const [stoneId, setStoneId] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const { data: stonesData } = useSafeQuery('useStones', {});
  const { data: attributesData } = useSafeQuery('useAttributes', {});
  const { data: usersData } = useSafeQuery('useUsers', {});

  const sdk = useSdk();

  const { mutate } = useSWRConfig();

  const updateStoneAmount = useCallback(async () => {
    setLoading(true);
    const { stoneList } = await sdk.StoneList({ stoneId, userId });
    if (stoneList) setAmount(stoneList.amount);
    else setAmount(0);
    setLoading(false);
  }, [stoneId, userId]);

  const updateAttributeAmount = useCallback(async () => {
    setLoading(true);
    const { attributeList } = await sdk.AttributeList({ attributeId, userId });
    if (attributeList) setAmount(attributeList.amount);
    else setAmount(0);
    setLoading(false);
  }, [attributeId, userId]);

  async function handleStoneSubmit(e: any) {
    e.preventDefault();
    if (stoneId === '' || userId === '' || amount === null) return;
    setLoading(true);
    const data = await promiseWithCatch(
      sdk.UpdateStoneList({ stoneId, userId, amount: amount! }),
      'Could not edit stone inventory',
    );
    if (data?.updateStoneList) {
      const { user, stone, amount } = data.updateStoneList;
      await mutate(props.swrKey);
      toast.success(
        `Successfully updated ${user.firstName} ${user.lastName}'s ${stone.name} amount to ${amount}!`,
        { duration: 7000 },
      );
      props.setSettings({ ...props.settings, show: false });
    }
    setLoading(false);
  }

  async function handleAttributeSubmit(e: any) {
    e.preventDefault();
    if (attributeId === '' || userId === '' || amount === null) return;
    setLoading(true);
    const data = await promiseWithCatch(
      sdk.UpdateAttributeList({ attributeId, userId, amount: amount! }),
      'Could not edit attribute inventory',
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
    if (!props.settings.id) {
      setStoneId('');
      setAttributeId('');
      setTabIndex(0);
    } else if ('stone' in props.settings.id) {
      setStoneId(props.settings.id.stone);
      setAttributeId('');
      setTabIndex(0);
    } else {
      setStoneId('');
      setAttributeId(props.settings.id.attribute);
      setTabIndex(1);
    }
    setUserId(props.settings.userId);
  }, [props.settings]);

  useEffect(() => {
    updateStoneAmount();
  }, [stoneId, userId]);

  useEffect(() => {
    updateAttributeAmount();
  }, [attributeId, userId]);

  return (
    <Modal
      show={props.settings.show}
      setShow={(show: boolean) => props.setSettings({ ...props.settings, show })}
      // title="Edit Inventory"
      body={
        <Tabs
          fullWidth
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabData={[
            {
              label: 'Stone Inventory',
              content: (
                <form className={cx('space-y-4')} onSubmit={handleStoneSubmit}>
                  <div className={cx('flex', 'flex-col', 'space-y-1')}>
                    <label htmlFor="editStoneInventoryStone">Stone</label>
                    <select
                      name="editStoneInventoryStone"
                      id="editStoneInventoryStone"
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
                    <label htmlFor="editStoneInventoryUser">User</label>
                    <select
                      name="editStoneInventoryUser"
                      id="editStoneInventoryUser"
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
                    <label htmlFor="editStoneInventoryAmount">Amount</label>
                    <input
                      type="number"
                      name="editStoneInventoryAmount"
                      id="editStoneInventoryAmount"
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
              ),
            },
            {
              label: 'Attribute Inventory',
              content: (
                <form className={cx('space-y-4')} onSubmit={handleAttributeSubmit}>
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
              ),
            },
          ]}
        />
      }
      footer={
        <>
          <Button
            label="Cancel"
            type={ButtonType.EMPTY}
            loading={loading}
            onClick={() => props.setSettings({ ...props.settings, show: false })}
          />
          {tabIndex === 0 ? (
            <Button
              label="Submit"
              disabled={stoneId === '' || userId === '' || amount === null}
              loading={loading}
              onClick={handleStoneSubmit}
            />
          ) : (
            <Button
              label="Submit"
              disabled={attributeId === '' || userId === '' || amount === null}
              loading={loading}
              onClick={handleAttributeSubmit}
            />
          )}
        </>
      }
    />
  );
}
