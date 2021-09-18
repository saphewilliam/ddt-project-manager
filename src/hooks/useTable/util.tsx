import { Column, Columns, Data, State } from './types';

/** Utility function to create strongly typed columns */
export function c<T>(col?: Column<any, T>): Column<any, T> {
  return col ?? {};
}

export function makeHeaders<T extends Columns<T>>(columns: T): State['headers'] {
  return Object.entries(columns).map(([name, opts]) => {
    const defaultLabel: string = name
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();

    const defaultRenderHead = ({ label }: { label: string }) => <th>{label}</th>;

    const { label = defaultLabel, renderHead = defaultRenderHead } = opts;

    return { name, label, render: () => renderHead({ label }) };
  });
}

export function makeRows<T extends Columns<T>>(columns: T, data: Data<T>): State['rows'] {
  return data.map((row) => ({
    cells: Object.entries(columns).map(([columnName, opts]) => {
      const defaultRenderCell = () => <td>{String(row[columnName])}</td>;

      const { renderCell = defaultRenderCell } = opts;

      return { render: () => renderCell({ value: row[columnName], row }) };
    }),
  }));
}
