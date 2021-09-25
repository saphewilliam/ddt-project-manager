import cx from 'clsx';
import React, { ReactElement, useMemo, useState, useEffect } from 'react';
import Modal from '@components/Modal';
import { Role } from '@graphql/__generated__/codegen-self';
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
  rows: StoneListTable['rows'];
}

export default function StoneList(props: Props): ReactElement {
  const [userColumns, setUserColumns] = useState(getStoneListUserColumns(props.rows));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserColumns(getStoneListUserColumns(props.rows));
  }, [props.rows]);

  const { session } = useSession();

  const columns: Columns<StoneListColumnTypes> = useMemo(
    () => ({
      color: {
        renderCell: ColorCell,
        unhideable: true,
        sort: (a, b, invert) => (invert ? 1 : -1) * (a.order - b.order),
      },
      ...userColumns.reduce(
        (prev, curr) => ({ ...prev, [curr.userId]: { label: curr.displayname, defaultValue: 0 } }),
        {},
      ),
      total: {
        hidden: userColumns.length <= 1,
        unhideable: true,
      },
      edit: {
        renderCell: EditCell,
        label: '',
        hidden: !(session?.user.isAdmin || session?.member?.role === Role.CAPTAIN),
        unhideable: true,
        unsortable: true,
      },
    }),
    [props, userColumns],
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

  const { headers, originalHeaders, rows } = useTable<StoneListColumnTypes>(columns, data, options);

  return (
    <section className={cx('mt-12', 'mb-24')}>
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
          <Button label="Show / hide columns" onClick={() => setShowModal(true)} />
        )}
      </div>

      <Modal show={showModal} setShow={setShowModal} title="Show / hide columns">
        <div className={cx('flex', 'flex-col')}>
          {originalHeaders
            .filter((header) => header.toggleHide)
            .map((header, i) => (
              <div key={i} className={cx('flex', 'items-center', 'space-x-3')}>
                <input
                  className={cx('text-primary', 'focus:ring-primary')}
                  type="checkbox"
                  id={`${props.title}-${header.name}`}
                  checked={!header.hidden}
                  onChange={() => header.toggleHide!()}
                />
                <label htmlFor={`${props.title}-${header.name}`}>{header.label}</label>
              </div>
            ))}
        </div>
      </Modal>

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
                  'border-opacity-20',
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
