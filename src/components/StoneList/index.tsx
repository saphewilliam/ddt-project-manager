import cx from 'clsx';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import useSession from '@hooks/useSession';
import useTable, { Columns, Data, Options } from '@hooks/useTable';
import {
  getStoneListUserColumns,
  StoneListColumnTypes,
  StoneListTable,
} from '@lib/stoneListHelpers';
import Button from '../Button';
import { ColorCell, EditCell, HeadCell, ValueCell } from './StoneListCells';

export interface Props {
  title: string;
  showTotal?: boolean;
  rows: StoneListTable['rows'];
}

export default function StoneList(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getStoneListUserColumns(props.rows));

  useEffect(() => {
    setUserColumns(getStoneListUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<StoneListColumnTypes> = useMemo(
    () => ({
      color: {
        renderCell: ColorCell,
        unhideable: true,
        sort: (a, b, invert) => (invert ? -1 : 1) * (a.order - b.order),
      },
      ...userColumns.reduce(
        (prev, curr) => ({ ...prev, [curr.userId]: { label: curr.displayname, defaultValue: 0 } }),
        {},
      ),
      total: {
        hidden: !props.showTotal,
        unhideable: true,
      },
      edit: {
        renderCell: EditCell,
        hidden: !session?.user.isAdmin,
        unhideable: true,
        unsortable: true,
      },
    }),
    [props],
  );

  const data: Data<StoneListColumnTypes> = useMemo(
    () =>
      props.rows.map((row) => ({
        color: row,
        ...row.stoneLists.reduce((prev, curr) => ({ ...prev, [curr.userId]: curr.amount }), {}),
        total: row.stoneLists.reduce((prev, curr) => prev + curr.amount, 0),
        edit: row.id,
      })),
    [props.rows],
  );

  const options: Options<StoneListColumnTypes> = {
    style: { renderCell: ValueCell, renderHead: HeadCell },
  };

  const { headers, originalHeaders, rows, originalRows, hiddenHelpers } =
    useTable<StoneListColumnTypes>(columns, data, options);

  return (
    <section className={cx('mt-10', 'mb-16')}>
      <div className={cx('flex', 'justify-between', 'items-start')}>
        <h2 className={cx('font-bold', 'text-2xl', 'mb-7')}>{props.title}</h2>
        <Button label="Show / hide columns" onClick={() => alert('hi')} />
      </div>
      <div className={cx('relative', 'w-full')}>
        <table className={cx('text-left', 'w-full')}>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <header.render key={i} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cx(
                  'hover:bg-light',
                  'transition-colors',
                  'border-b',
                  'border-dark',
                  'border-opacity-30',
                )}
              >
                {row.cells.map((cell, j) => (
                  <cell.render key={j} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
