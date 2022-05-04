import useTable, { Columns, Data, SortOrder } from '@saphe/react-table';
import { ReactElement } from 'react';
import Table from '@components/Table';
import { AttributesOnProjectColumnTypes } from '@lib/inventoryHelpers';
import { HeadCell, ValueCell } from './InventoryCells';

export interface Props {
  rows: {
    amount: number;
    user: { displayName: string };
    attribute: {
      id: string;
      namePlural: string;
    };
  }[];
}

export default function ProjectAttributeTable(props: Props): ReactElement {
  const columns: Columns<AttributesOnProjectColumnTypes> = {
    attribute: {
      sort: (a, b) => b.name.localeCompare(a.name),
      stringify: (value) => value.name,
    },
    person: {},
    amount: {},
  };

  const data: Data<AttributesOnProjectColumnTypes> = props.rows.map((row) => ({
    attribute: { ...row.attribute, name: row.attribute.namePlural },
    person: row.user.displayName,
    amount: row.amount,
  }));

  const { headers, rows } = useTable<AttributesOnProjectColumnTypes>(columns, data, {
    sort: {
      initial: { column: 'attribute', order: SortOrder.DESC },
      order: [SortOrder.DESC, SortOrder.ASC],
    },
    style: { renderCell: ValueCell, renderHead: HeadCell },
  });

  return <Table headers={headers} rows={rows} />;
}
