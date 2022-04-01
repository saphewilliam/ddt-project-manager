import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import cx from 'clsx';
import { ReactElement } from 'react';
import { ProjectStoneListColumnTypes } from '@lib/stoneListHelpers';
import { ColorCell, HeadCell, ValueCell } from './StoneListCells';
import StoneListTable from './StoneListTable';

export interface Props {
  title: string;
  rows: {
    amount: number;
    user: { displayName: string };
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

export default function ProjectStoneList(props: Props): ReactElement {
  const columns: Columns<ProjectStoneListColumnTypes> = {
    color: {
      renderCell: ColorCell,
      sort: (a, b) => b.order - a.order,
    },
    person: {},
    amount: {},
  };

  const data: Data<ProjectStoneListColumnTypes> = props.rows.map((row) => ({
    color: row.stone,
    person: row.user.displayName,
    amount: row.amount,
  }));

  const { headers, rows } = useTable<ProjectStoneListColumnTypes>(columns, data, {
    sort: {
      initial: { column: 'color', order: SortOrder.DESC },
      order: [SortOrder.DESC, SortOrder.ASC],
    },
    style: { renderCell: ValueCell, renderHead: HeadCell },
  });

  return (
    <div>
      <span className={cx('text-xl', 'mb-3', 'block', 'font-semibold')}>{props.title}</span>
      <StoneListTable headers={headers} rows={rows} />
    </div>
  );
}
