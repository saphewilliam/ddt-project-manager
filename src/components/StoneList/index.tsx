import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import Card from '@components/Card';
import useSession from '@hooks/useSession';
import {
  getStoneListUserColumns,
  makeStoneListTableColumns,
  StoneListColumnTypes,
  StoneListTableType,
} from '@lib/inventoryHelpers';
import Button from '../Button';
import { HeadCell, ValueCell } from './StoneListCells';
import StoneListColumnModal from './StoneListColumnModal';
import StoneListEditModal, { StoneListEditModalSettings } from './StoneListEditModal';
import StoneListTable from './StoneListTable';

export interface Props {
  title: string;
  rows: StoneListTableType['rows'];
  swrKey: string;
}

export default function StoneList(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getStoneListUserColumns(props.rows));
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [editModalSettings, setEditModalSettings] = useState<StoneListEditModalSettings>({
    show: false,
    stoneId: '',
    userId: '',
    amount: 0,
  });

  useEffect(() => {
    setUserColumns(getStoneListUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<StoneListColumnTypes> = useMemo(
    () => makeStoneListTableColumns(userColumns, session),
    [props, userColumns],
  );

  const data: Data<StoneListColumnTypes> = useMemo(
    () =>
      props.rows.map((row) => ({
        color: row,
        ...row.stoneLists.reduce((prev, curr) => ({ ...prev, [curr.userId]: curr.amount }), {}),
        total: row.stoneLists.reduce((prev, curr) => prev + curr.amount, 0),
        edit: () =>
          setEditModalSettings({
            show: true,
            stoneId: row.id,
            userId: userColumns.length === 1 ? userColumns[0]!.userId : '',
            amount: null,
          }),
      })),
    [props.rows],
  );

  const { headers, originalHeaders, rows, visibilityHelpers } = useTable<StoneListColumnTypes>(
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
        <StoneListColumnModal
          visibilityHelpers={visibilityHelpers}
          originalHeaders={originalHeaders}
          setShow={setShowColumnModal}
          show={showColumnModal}
          title={props.title}
        />
      )}

      <StoneListEditModal
        settings={editModalSettings}
        setSettings={setEditModalSettings}
        swrKey={props.swrKey}
      />

      <StoneListTable headers={headers} rows={rows} />
    </Card>
  );
}
