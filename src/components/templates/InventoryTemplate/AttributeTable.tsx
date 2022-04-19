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
import { HeadCell, ValueCell } from './InventoryCells';
import InventoryColumnModal from './InventoryColumnModal';
import InventoryEditModal, { InventoryEditModalSettings } from './InventoryEditModal';

export interface Props {
  title: string;
  rows: AttributeInventoryTable['rows'];
  swrKey: string;
}

export default function AttributeTable(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getInventoryUserColumns(props.rows));
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [editModalSettings, setEditModalSettings] = useState<InventoryEditModalSettings>({
    show: false,
    id: null,
    userId: '',
    amount: 0,
  });

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
          setEditModalSettings({
            show: true,
            id: { attribute: row.id },
            userId: userColumns.length === 1 ? userColumns[0]!.userId : '',
            amount: null,
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
          setShow={setShowColumnModal}
          show={showColumnModal}
          title={props.title}
        />
      )}

      <InventoryEditModal
        settings={editModalSettings}
        setSettings={setEditModalSettings}
        swrKey={props.swrKey}
      />

      <Table headers={headers} rows={rows} />
    </Card>
  );
}
