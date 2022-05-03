import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import FormFields from '@components/FormFields';
import useAsyncReducer from '@hooks/useAsyncReducer';
import { promiseWithCatch } from '@lib/util';
import useForm, { Field } from './useForm';
import useSafeQuery from './useSafeQuery';
import useSdk from './useSdk';

interface InternalState {
  isOpen: boolean;
  tabIndex: number;
  stoneId: string | null;
  stoneAmount: number | null;
  attributeId: string | null;
  attributeAmount: number | null;
  userId: string | null;
}

const initialState: InternalState = {
  isOpen: false,
  tabIndex: 0,
  stoneId: null,
  stoneAmount: null,
  attributeId: null,
  attributeAmount: null,
  userId: null,
};

export default function useInventoryEditModal(swrKey: string) {
  const sdk = useSdk();
  const { mutate } = useSWRConfig();

  const { data: attributesData } = useSafeQuery('useAttributes', {});
  const { data: stonesData } = useSafeQuery('useStones', {});
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

  const { state, actions } = useAsyncReducer(initialState, {
    close: (prevState) => ({ ...prevState, isOpen: false }),
    setTabIndex: (prevState, tabIndex: number) => ({ ...prevState, tabIndex }),
    openStone: (_, config?: { stoneId?: string; userId?: string }) => ({
      ...initialState,
      isOpen: true,
      tabIndex: 0,
      stoneId: config?.stoneId ?? null,
      userId: config?.userId ?? null,
    }),
    openAttribute: (_, config?: { attributeId?: string; userId?: string }) => ({
      ...initialState,
      isOpen: true,
      tabIndex: 1,
      attributeId: config?.attributeId ?? null,
      userId: config?.userId ?? null,
    }),
    setStoneInventory: (
      prevState,
      inventory: { stoneId: string | null; userId: string | null; stoneAmount?: number },
    ) => ({ ...prevState, ...inventory }),
    setAttributeInventory: (
      prevState,
      inventory: { attributeId: string | null; userId: string | null; attributeAmount?: number },
    ) => ({ ...prevState, ...inventory }),
  });

  // TODO code duplication between the two forms
  const {
    formState: stoneInventoryFormState,
    form: stoneInventoryForm,
    submitButton: stoneInventorySubmitButton,
  } = useForm({
    name: 'stoneInventory',
    submitButton: { hidden: true },
    fieldPack: FormFields,
    fields: {
      stoneId: {
        type: Field.SELECT,
        label: 'Stone',
        placeholder: 'Select a stone from the list...',
        validation: { required: 'Please select a stone' },
        initialValue: state.stoneId ?? undefined,
        options: stonesOptions,
      },
      userId: {
        type: Field.SELECT,
        label: 'User',
        placeholder: 'Select a user from the list...',
        validation: { required: 'Please select a user' },
        initialValue: state.userId ?? undefined,
        options: usersOptions,
      },
      amount: {
        type: Field.NUMBER,
        validation: { required: 'Please enter an amount' },
        initialValue: state.stoneAmount ?? undefined,
      },
    },
    async onChange({ stoneId, userId }) {
      if (stoneId !== state.stoneId || userId !== state.userId) {
        if (!stoneId || !userId) actions.setStoneInventory({ stoneId, userId });
        else {
          const { stoneInventory } = await sdk.StoneInventory({ stoneId, userId });
          actions.setStoneInventory({
            stoneId,
            userId,
            stoneAmount: stoneInventory?.amount ?? 0,
          });
        }
      }
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        sdk.UpdateStoneInventory(formValues),
        'Could not edit inventory',
      );

      if (data) {
        await mutate(swrKey);
        actions.close();

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

  const {
    formState: attributeInventoryFormState,
    form: attributeInventoryForm,
    submitButton: attributeInventorySubmitButton,
  } = useForm({
    name: 'attributeInventory',
    submitButton: { hidden: true },
    fieldPack: FormFields,
    fields: {
      attributeId: {
        type: Field.SELECT,
        label: 'Attribute',
        placeholder: 'Select a attribute from the list...',
        validation: { required: 'Please select an attribute' },
        initialValue: state.attributeId ?? undefined,
        options: attributesOptions,
      },
      userId: {
        type: Field.SELECT,
        label: 'User',
        placeholder: 'Select a user from the list...',
        validation: { required: 'Please select a user' },
        initialValue: state.userId ?? undefined,
        options: usersOptions,
      },
      amount: {
        type: Field.NUMBER,
        validation: { required: 'Please enter an amount' },
        initialValue: state.attributeAmount ?? undefined,
      },
    },
    async onChange({ attributeId, userId }) {
      if (attributeId !== state.attributeId || userId !== state.userId) {
        if (!attributeId || !userId) actions.setAttributeInventory({ attributeId, userId });
        else {
          const { attributeInventory } = await sdk.AttributeInventory({ attributeId, userId });
          actions.setAttributeInventory({
            attributeId,
            userId,
            attributeAmount: attributeInventory?.amount ?? 0,
          });
        }
      }
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        sdk.UpdateAttributeInventory(formValues),
        'Could not edit inventory',
      );

      if (data) {
        await mutate(swrKey);
        actions.close();

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

  return {
    state,
    actions,
    stoneInventoryFormState,
    stoneInventoryForm,
    stoneInventorySubmitButton,
    attributeInventoryFormState,
    attributeInventoryForm,
    attributeInventorySubmitButton,
  };
}
