import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import cx from 'clsx';
import { ReactElement } from 'react';
import Table from '@components/Table';
import { StonesOnProjectColumnTypes } from '@lib/inventoryHelpers';
import { ColorCell, HeadCell, ValueCell } from './InventoryCells';

export interface Props {
  title?: string;
  rows: {
    amount: number;
    user: {
      id: string;
      displayName: string;
    };
    stone: {
      id: string;
      name: string;
      hex: string;
      hex2?: string | null;
      alias: string;
      alias2?: string | null;
      order: number;
    };
  }[];
}

export default function ProjectStoneTable(props: Props): ReactElement {
  const columns: Columns<StonesOnProjectColumnTypes> = {
    color: {
      renderCell: ColorCell,
      sort: (a, b) => b.order - a.order,
    },
    person: {},
    amount: {},
  };

  const data: Data<StonesOnProjectColumnTypes> = props.rows.map((row) => ({
    color: row.stone,
    person: row.user.displayName,
    amount: row.amount,
  }));

  const { headers, rows } = useTable<StonesOnProjectColumnTypes>(columns, data, {
    sort: {
      initial: { column: 'color', order: SortOrder.DESC },
      order: [SortOrder.DESC, SortOrder.ASC],
    },
    style: { renderCell: ValueCell, renderHead: HeadCell },
  });

  return (
    <div className={cx('w-full')}>
      {props.title && (
        <span className={cx('text-xl', 'mb-3', 'block', 'font-semibold')}>{props.title}</span>
      )}
      <Table headers={headers} rows={rows} />
    </div>
  );
}
