import { ReactElement } from 'react';
import {
  Column,
  Columns,
  ColumnTypes,
  Data,
  Options,
  RenderCellProps,
  RenderHeadProps,
  State,
} from './types';

export function makeHeaders<T extends ColumnTypes>(
  columns: Columns<T>,
  // hidden: boolean,
  // toggleHide: (value?: boolean) => void,
  options?: Options<T>,
): { headers: State<T>['headers']; originalHeaders: State<T>['originalHeaders'] } {
  const headers: State<T>['headers'] = [];
  const originalHeaders: State<T>['originalHeaders'] = [];

  for (const [name, args] of Object.entries<Column<T>>(columns)) {
    if (!args.hidden) {
      const defaultLabel: string = name
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();

      const defaultRenderHead = ({ label }: { label: string }) => <th>{label}</th>;

      const { label = defaultLabel, renderHead = options?.style?.renderHead ?? defaultRenderHead } =
        args;

      const header: RenderHeadProps = { name, label };

      originalHeaders.push(header);
      // if !columnHidden
      headers.push({ ...header, render: () => renderHead(header) });
    }
  }

  return { headers, originalHeaders };
}

export function makeRows<T extends ColumnTypes, U extends Columns<T>>(
  columns: U,
  data: Data<T>,
  options?: Options<T>,
): { rows: State<T>['rows']; originalRows: State<T>['originalRows'] } {
  const rows: State<T>['rows'] = [];
  const originalRows: State<T>['originalRows'] = [];

  for (const row of data) {
    const cells: (RenderCellProps<T> & { render: () => ReactElement })[] = [];
    const originalCells: RenderCellProps<T>[] = [];

    for (const [columnName, columnArgs] of Object.entries<Column<T>>(columns)) {
      if (!columnArgs.hidden) {
        const defaultRenderCell = () => (
          <td>{String(row[columnName] ?? columnArgs.defaultValue)}</td>
        );

        const { renderCell = options?.style?.renderCell ?? defaultRenderCell, defaultValue } =
          columnArgs;

        const cell: RenderCellProps<T> = { row, value: row[columnName] ?? defaultValue };

        originalCells.push(cell);
        // if !columnHidden
        cells.push({ ...cell, render: () => renderCell(cell) });
      }
    }

    rows.push({ cells });
    originalRows.push({ originalCells });
  }

  return { rows, originalRows };
}
