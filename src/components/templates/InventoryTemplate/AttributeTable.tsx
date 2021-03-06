import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import Button from '@components/Button';
import Card from '@components/Card';
import Table from '@components/Table';
import useSession from '@hooks/useSession';
import {
  getInventoryUserColumns,
  makeAttributeInventoryTableColumns,
  AttributeInventoryColumnTypes,
  AttributeInventoryTable,
} from '@lib/inventoryHelpers';
import { Props as EditModalProps } from '@templates/InventoryTemplate/InventoryEditModal';
import { HeadCell, ValueCell } from './InventoryCells';
import InventoryColumnModal from './InventoryColumnModal';

export interface Props {
  title: string;
  rows: AttributeInventoryTable['rows'];
  editModalState: EditModalProps['state'];
  editModalActions: EditModalProps['actions'];
}

export default function AttributeTable(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getInventoryUserColumns(props.rows));
  const [showColumnModal, setShowColumnModal] = useState(false);

  useEffect(() => {
    setUserColumns(getInventoryUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<AttributeInventoryColumnTypes> = useMemo(
    () => makeAttributeInventoryTableColumns(userColumns, session),
    [props, userColumns],
  );

  const data: Data<AttributeInventoryColumnTypes> = useMemo(
    () =>
      props.rows.map((row) => ({
        attribute: row,
        ...row.attributeInventory.reduce(
          (prev, curr) => ({ ...prev, [curr.userId]: curr.amount }),
          {},
        ),
        total: row.attributeInventory.reduce((prev, curr) => prev + curr.amount, 0),
        edit: () =>
          props.editModalActions.openAttribute({
            attributeId: row.id,
            userId: userColumns.length === 1 ? userColumns[0]!.userId : undefined,
            amount:
              row.attributeInventory.length === 1 && userColumns.length === 1
                ? row.attributeInventory[0]?.amount
                : undefined,
          }),
      })),
    [props.rows],
  );

  const { headers, originalHeaders, rows, visibilityHelpers } =
    useTable<AttributeInventoryColumnTypes>(columns, data, {
      style: { renderCell: ValueCell, renderHead: HeadCell },
      sort: {
        initial: { column: 'attribute', order: SortOrder.DESC },
        order: [SortOrder.DESC, SortOrder.ASC],
      },
    });

  return (
    <Card
      title={props.title}
      headerChildren={
        <div>
          {userColumns.length > 1 && (
            <Button label="Show / hide columns" onClick={() => setShowColumnModal(true)} />
          )}
        </div>
      }
    >
      {userColumns.length > 1 && (
        <InventoryColumnModal
          visibilityHelpers={visibilityHelpers}
          originalHeaders={originalHeaders}
          close={() => setShowColumnModal(false)}
          isOpen={showColumnModal}
          title={props.title}
        />
      )}

      <Table headers={headers} rows={rows} />
    </Card>
  );
}
