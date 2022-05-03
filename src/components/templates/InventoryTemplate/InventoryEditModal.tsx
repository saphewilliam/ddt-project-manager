import React, { ReactElement } from 'react';
import Button, { ButtonType } from '@components/Button';
import Modal from '@components/Modal';
import Tabs from '@components/Tabs';
import useInventoryEditModal from '@hooks/useInventoryEditModal';

export type Props = ReturnType<typeof useInventoryEditModal>;

export default function InventoryEditModal(props: Props): ReactElement {
  // TODO error handling
  const {
    state,
    actions,
    stoneInventoryForm,
    stoneInventorySubmitButton,
    stoneInventoryFormState,
    attributeInventoryForm,
    attributeInventorySubmitButton,
    attributeInventoryFormState,
  } = props;

  return (
    <Modal
      isOpen={state.isOpen}
      close={actions.close}
      body={
        <Tabs
          fullWidth
          tabIndex={state.tabIndex}
          setTabIndex={actions.setTabIndex}
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
            buttonType={ButtonType.EMPTY}
            loading={
              state.tabIndex === 0
                ? stoneInventoryFormState.isLoading
                : attributeInventoryFormState.isLoading
            }
            onClick={actions.close}
          />
          {state.tabIndex === 0 ? stoneInventorySubmitButton : attributeInventorySubmitButton}
        </>
      }
    />
  );
}
