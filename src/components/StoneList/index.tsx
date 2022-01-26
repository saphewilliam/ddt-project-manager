import useTable, { Columns, Data } from '@saphe/react-table';
import cx from 'clsx';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import useSession from '@hooks/useSession';
import {
  getStoneListUserColumns,
  makeStoneListTableColumns,
  StoneListColumnTypes,
  StoneListTableType,
} from '@lib/stoneListHelpers';
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

  const { headers, originalHeaders, rows } = useTable<StoneListColumnTypes>(columns, data, {
    style: { renderCell: ValueCell, renderHead: HeadCell },
  });

  return (
    <section>
      <div
        className={cx(
          'flex',
          'flex-col',
          'md:flex-row',
          'mb-8',
          'justify-between',
          'items-start',
          'md:items-starts',
          'space-y-5',
          'md:space-y-0',
        )}
      >
        <h2 className={cx('font-semibold', 'text-2xl')}>{props.title}</h2>
        {userColumns.length > 1 && (
          <Button label="Show / hide columns" onClick={() => setShowColumnModal(true)} />
        )}
      </div>

      <StoneListColumnModal
        originalHeaders={originalHeaders}
        setShow={setShowColumnModal}
        show={showColumnModal}
        title={props.title}
      />

      <StoneListEditModal
        settings={editModalSettings}
        setSettings={setEditModalSettings}
        swrKey={props.swrKey}
      />

      <StoneListTable headers={headers} rows={rows} />
    </section>
  );
}
