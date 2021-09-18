import { Any, Column, Columns, ColumnTypes, Data, State } from './types';

export function makeHeaders<T extends ColumnTypes>(columns: Columns<T>): State['headers'] {
  return (Object.entries(columns) as [string, Column<T, Any>][])
    .filter(([, args]) => !args.hidden)
    .map(([name, args]) => {
      const defaultLabel: string = name
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();

      const defaultRenderHead = ({ label }: { label: string }) => <th>{label}</th>;

      const { label = defaultLabel, renderHead = defaultRenderHead } = args;

      return { name, label, render: () => renderHead({ label }) };
    });
}

export function makeRows<T extends ColumnTypes, U extends Columns<T>>(
  columns: U,
  data: Data<T>,
): State['rows'] {
  return data.map((row) => ({
    cells: (Object.entries(columns) as [string, Column<T, Any>][])
      .filter(([, args]) => !args.hidden)
      .map(([columnName, opts]) => {
        const defaultRenderCell = () => <td>{String(row[columnName] ?? opts.defaultValue)}</td>;

        const { renderCell = defaultRenderCell, defaultValue } = opts;

        return { render: () => renderCell({ value: row[columnName] ?? defaultValue, row }) };
      }),
  }));
}
