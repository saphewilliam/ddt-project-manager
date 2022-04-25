import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import React, { ReactElement, useMemo, useState, useEffect, Dispatch, SetStateAction } from 'react';
import Button from '@components/Button';
import Card from '@components/Card';
import Table from '@components/Table';
import useSession from '@hooks/useSession';
import {
  getInventoryUserColumns,
  makeStoneInventoryTableColumns,
  StoneInventoryColumnTypes,
  StoneInventoryTable,
} from '@lib/inventoryHelpers';
import { HeadCell, ValueCell } from './InventoryCells';
import InventoryColumnModal from './InventoryColumnModal';
import { InventoryEditModalSettings } from './InventoryEditModal';

export interface Props {
  title: string;
  rows: StoneInventoryTable['rows'];
  setEditModalSettings: Dispatch<SetStateAction<InventoryEditModalSettings>>;
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
        edit: () =>
          props.setEditModalSettings({
            show: true,
            id: { stone: row.id },
            userId: userColumns.length === 1 ? userColumns[0]!.userId : '',
            amount: null,
          }),
      })),
    [props.rows],
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
          setShow={setShowColumnModal}
          show={showColumnModal}
          title={props.title}
        />
      )}

      <Table headers={headers} rows={rows} />
    </Card>
  );
}
