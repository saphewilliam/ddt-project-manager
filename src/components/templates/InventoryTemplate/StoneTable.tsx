import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import Button from '@components/Button';
import Card from '@components/Card';
import Table from '@components/Table';
import { State } from '@hooks/useForm';
import useSession from '@hooks/useSession';
import {
  getInventoryUserColumns,
  makeStoneInventoryTableColumns,
  StoneInventoryColumnTypes,
  StoneInventoryTable,
} from '@lib/inventoryHelpers';
import { Props as EditModalProps } from '@templates/InventoryTemplate/InventoryEditModal';
import { HeadCell, ValueCell } from './InventoryCells';
import InventoryColumnModal from './InventoryColumnModal';

export interface Props {
  title: string;
  rows: StoneInventoryTable['rows'];
  editModalState: EditModalProps['state'];
  editModalActions: EditModalProps['actions'];
  editModalFormActions: State['formState']['actions'];
}

export default function StoneTable(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getInventoryUserColumns(props.rows));
  const [showColumnModal, setShowColumnModal] = useState(false);

  useEffect(() => {
    setUserColumns(getInventoryUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<StoneInventoryColumnTypes> = useMemo(
    () => makeStoneInventoryTableColumns(userColumns, session),
    [props, userColumns],
  );

  const data: Data<StoneInventoryColumnTypes> = useMemo(
    () =>
      props.rows.map((row) => ({
        color: row,
        ...row.stoneInventory.reduce((prev, curr) => ({ ...prev, [curr.userId]: curr.amount }), {}),
        total: row.stoneInventory.reduce((prev, curr) => prev + curr.amount, 0),
        edit: () => {
          props.editModalActions.openStone({});
          // FIXME change is always called twice
          if (props.editModalState.stoneId !== row.id)
            props.editModalFormActions.change('stoneId', row.id);
          if (userColumns.length === 1 && props.editModalState.userId !== userColumns[0]!.userId)
            props.editModalFormActions.change('userId', userColumns[0]!.userId);
        },
      })),
    [props.rows, props.editModalState.stoneId],
  );

  const { headers, originalHeaders, rows, visibilityHelpers } = useTable<StoneInventoryColumnTypes>(
    columns,
    data,
    {
      style: { renderCell: ValueCell, renderHead: HeadCell },
      sort: {
        initial: { column: 'color', order: SortOrder.DESC },
        order: [SortOrder.DESC, SortOrder.ASC],
      },
    },
  );

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
