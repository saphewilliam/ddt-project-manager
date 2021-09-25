import cx from 'clsx';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import useSession from '@hooks/useSession';
import useTable, { Columns, Data } from '@hooks/useTable';
import {
  fontColorFromBackground,
  formatNumber,
  StoneListColumnTypes,
  StoneListTable,
} from '@lib/stoneListHelpers';

export interface Props {
  title: string;
  showTotal?: boolean;
  rows: StoneListTable['rows'];
}

export function getUserColumns(
  rows: StoneListTable['rows'],
): { userId: string; displayname: string }[] {
  const userIds: Record<string, boolean> = {};
  const result: { userId: string; displayname: string }[] = [];

  rows.forEach((row) =>
    row.stoneLists.forEach((stoneList) => {
      if (!userIds[stoneList.userId]) {
        userIds[stoneList.userId] = true;
        result.push({ userId: stoneList.userId, displayname: stoneList.displayName });
      }
    }),
  );
  return result;
}

export default function StoneList(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState<ReturnType<typeof getUserColumns>>(
    getUserColumns(props.rows),
  );

  useEffect(() => {
    setUserColumns(getUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<StoneListColumnTypes> = useMemo(
    () => ({
      color: {
        renderCell: ({ value }) => (
          <td
            style={{
              backgroundColor: value.hex,
              color: fontColorFromBackground(value.hex),
            }}
            className={cx('whitespace-nowrap')}
          >
            {value.name} ({value.alias})
          </td>
        ),
        sort: (a, b, invert) => (invert ? -1 : 1) * (a.order - b.order),
        unhideable: true,
      },
      ...userColumns.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.userId]: {
            label: curr.displayname,
            defaultValue: 0,
            renderCell: ({ value }: { value: number }) => <td>{formatNumber(value)}</td>,
          },
        }),
        {},
      ),
      total: {
        renderCell: ({ value }) => <td>{formatNumber(value)}</td>,
        hidden: !props.showTotal,
        unhideable: true,
      },
      edit: {
        renderCell: ({ value }) => <td>{value}</td>,
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

  const { headers, originalHeaders, rows, originalRows, hiddenHelpers } =
    useTable<StoneListColumnTypes>(columns, data);

  return (
    <div>
      <h2 className={cx('font-bold', 'text-2xl', 'mb-4', 'mt-8')}>{props.title}</h2>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <header.render key={i} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) => (
                <cell.render key={j} />
              ))}
            </tr>

            //   {row.stoneLists.map((stoneList) => (
            //     <td key={stoneList.id}>{formatNumber(stoneList.amount)}</td>
            //   ))}
          ))}
        </tbody>
      </table>
    </div>
  );
}
