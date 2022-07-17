import { PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Button from '@components/Button';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import { Role } from '@graphql/__generated__/codegen';
import useInventoryEditModal from '@hooks/useInventoryEditModal';
import useSession from '@hooks/useSession';
import { InventoryTableData } from '@lib/inventoryHelpers';
import AttributeTable from '@templates/InventoryTemplate/AttributeTable';
import StoneTable from '@templates/InventoryTemplate/StoneTable';
import InventoryEditModal from './InventoryEditModal';

export interface Props {
  title: string;
  swrKey: string;
  loading: boolean;
  tableData: InventoryTableData;
  userId?: string;
}

export default function InventoryTemplate(props: Props): ReactElement {
  const inventoryEditModalState = useInventoryEditModal(props.swrKey);

  const { session } = useSession();

  return (
    <Layout
      title={props.title}
      hideHeader={props.loading}
      headerChildren={
        session?.user.isAdmin || session?.member?.role === Role.CAPTAIN ? (
          <Button
            label="Edit inventory"
            icon={PencilIcon}
            onClick={() => inventoryEditModalState.actions.openStone({ userId: props.userId })}
          />
        ) : undefined
      }
    >
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <ReactTooltip id="inventoryToolTip" place="right" effect="solid" />
          <div className={cx('space-y-20')}>
            {props.tableData.stones.map((table, index) => (
              <StoneTable
                key={index}
                editModalState={inventoryEditModalState.state}
                editModalActions={inventoryEditModalState.actions}
                {...table}
              />
            ))}
            {props.tableData.attributes.map((table, index) => (
              <AttributeTable
                key={index}
                editModalState={inventoryEditModalState.state}
                editModalActions={inventoryEditModalState.actions}
                {...table}
              />
            ))}
          </div>
          <InventoryEditModal {...inventoryEditModalState} />
        </>
      )}
    </Layout>
  );
}
