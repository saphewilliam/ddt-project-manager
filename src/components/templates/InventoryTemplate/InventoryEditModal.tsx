import React, { ReactElement, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Button, { ButtonType } from '@components/Button';
import FormFields from '@components/FormFields';
import Modal from '@components/Modal';
import Tabs from '@components/Tabs';
import useForm, { Field } from '@hooks/useForm';
import { Dispatch, State } from '@hooks/useInventoryEditModal';
import useSafeQuery from '@hooks/useSafeQuery';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';

export interface Props {
  state: State;
  dispatch: Dispatch;
  swrKey: string;
}

export default function InventoryEditModal(props: Props): ReactElement {
  const sdk = useSdk();
  const { mutate } = useSWRConfig();

  const { data: stonesData } = useSafeQuery('useStones', {});
  const { data: attributesData } = useSafeQuery('useAttributes', {});
  const { data: usersData } = useSafeQuery('useUsers', {});

  const stonesOptions = useMemo(
    () =>
      stonesData?.stones.map((stone) => ({
        value: stone.id,
        label: `${stone.name} (${stone.alias}${stone.alias2 ? ` -> ${stone.alias2}` : ''})`,
      })) ?? [],
    [stonesData],
  );

  const attributesOptions = useMemo(
    () =>
      attributesData?.attributes.map((attribute) => ({
        value: attribute.id,
        label: attribute.name,
      })) ?? [],
    [attributesData],
  );

  const usersOptions = useMemo(
    () =>
      usersData?.users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })) ?? [],
    [usersData],
  );

  // TODO code duplication between the two forms
  const { form: stoneInventoryForm, submitButton: stoneInventorySubmitButton } = useForm({
    name: 'stoneInventory',
    submitButton: { hidden: true },
    fieldPack: FormFields,
    fields: {
      stoneId: {
        type: Field.SELECT,
        label: 'Stone',
        placeholder: 'Select a stone from the list...',
        validation: { required: 'Please select a stone' },
        initialValue: props.state.stoneId ?? undefined,
        options: stonesOptions,
      },
      userId: {
        type: Field.SELECT,
        label: 'User',
        placeholder: 'Select a user from the list...',
        validation: { required: 'Please select a user' },
        initialValue: props.state.userId ?? undefined,
        options: usersOptions,
      },
      amount: {
        type: Field.NUMBER,
        validation: { required: 'Please enter an amount' },
        initialValue: props.state.stoneAmount ?? undefined,
      },
    },
    async onChange(formValues) {
      props.dispatch({ type: 'updateStoneAmount', payload: formValues });
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        // FIXME UpdateStoneInventory fires twice???
        sdk.UpdateStoneInventory(formValues),
        'Could not edit inventory',
      );

      if (data) {
        await mutate(props.swrKey);
        await props.dispatch({ type: 'close' });

        if (!data.updateStoneInventory) toast.success(`Successfully updated inventory`);
        else {
          const { user, stone, amount } = data.updateStoneInventory;
          toast.success(
            `Successfully updated ${user.firstName} ${user.lastName}'${
              user.lastName[user.lastName.length - 1] !== 's' ? 's' : ''
            } ${stone.name} amount to ${amount}!`,
            { duration: 7000 },
          );
        }
      }
    },
  });

  const { form: attributeInventoryForm, submitButton: attributeInventorySubmitButton } = useForm({
    name: 'attributeInventory',
    submitButton: { hidden: true },
    fieldPack: FormFields,
    fields: {
      attributeId: {
        type: Field.SELECT,
        label: 'Attribute',
        placeholder: 'Select a attribute from the list...',
        validation: { required: 'Please select an attribute' },
        initialValue: props.state.attributeId ?? undefined,
        options: attributesOptions,
      },
      userId: {
        type: Field.SELECT,
        label: 'User',
        placeholder: 'Select a user from the list...',
        validation: { required: 'Please select a user' },
        initialValue: props.state.userId ?? undefined,
        options: usersOptions,
      },
      amount: {
        type: Field.NUMBER,
        validation: { required: 'Please enter an amount' },
        initialValue: props.state.attributeAmount ?? undefined,
      },
    },
    async onChange(formValues) {
      console.log('onChange');

      props.dispatch({ type: 'updateAttributeAmount', payload: formValues });
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        // FIXME UpdateAttributeInventory fires twice???
        sdk.UpdateAttributeInventory(formValues),
        'Could not edit inventory',
      );

      if (data) {
        await mutate(props.swrKey);
        props.dispatch({ type: 'close' });

        if (!data.updateAttributeInventory) toast.success(`Successfully updated inventory`);
        else {
          const { user, attribute, amount } = data.updateAttributeInventory;
          toast.success(
            `Successfully updated ${user.firstName} ${user.lastName}'s ${attribute.name} amount to ${amount}!`,
            { duration: 7000 },
          );
        }
      }
    },
  });

  // useEffect(() => {
  //   if (!props.settings.id) {
  //     setStoneId('');
  //     setAttributeId('');
  //     setTabIndex(0);
  //   } else if ('stone' in props.settings.id) {
  //     setStoneId(props.settings.id.stone);
  //     setAttributeId('');
  //     setTabIndex(0);
  //   } else {
  //     setStoneId('');
  //     setAttributeId(props.settings.id.attribute);
  //     setTabIndex(1);
  //   }
  //   setUserId(props.settings.userId ?? '');
  // }, [props.settings]);

  // useEffect(() => {
  //   updateStoneAmount();
  // }, [stoneId, userId]);

  // useEffect(() => {
  //   updateAttributeAmount();
  // }, [attributeId, userId]);

  return (
    <Modal
      isOpen={props.state.isOpen}
      close={() => props.dispatch({ type: 'close' })}
      body={
        <Tabs
          fullWidth
          tabIndex={props.state.tabIndex}
          setTabIndex={(tabIndex) => props.dispatch({ type: 'setTabIndex', payload: { tabIndex } })}
          tabData={[
            { label: 'Stone Inventory', content: stoneInventoryForm },
            { label: 'Attribute Inventory', content: attributeInventoryForm },
          ]}
        />
      }
      footer={
        <>
          <Button
            label="Cancel"
            type={ButtonType.EMPTY}
            loading={props.state.isLoading}
            onClick={() => props.dispatch({ type: 'close' })}
          />
          {props.state.tabIndex === 0 ? stoneInventorySubmitButton : attributeInventorySubmitButton}
        </>
      }
    />
  );
}
