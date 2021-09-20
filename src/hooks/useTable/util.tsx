import { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  Any,
  Column,
  Columns,
  ColumnTypes,
  Data,
  DefaultValue,
  Hidden,
  Options,
  RenderCellProps,
  RenderHeadProps,
  Row,
  SortInfo,
  SortOrder,
  State,
} from './types';

export function getDefaultValue<T extends ColumnTypes, U>(
  defaultValue: DefaultValue<T, U>,
  row: Row<T>,
): U {
  if (typeof defaultValue !== 'function') return defaultValue;
  else return (defaultValue as (row: Row<T>) => U)(row);
}

export function makeHeaders<T extends ColumnTypes>(
  columns: Columns<T>,
  hidden: Hidden<T>,
  setHidden: Dispatch<SetStateAction<Hidden<T>>>,
  sortInfo: SortInfo,
  sort: (columnName: string) => void,
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

      const {
        label = defaultLabel,
        renderHead = options?.style?.renderHead ?? defaultRenderHead,
        unhideable = false,
        unsortable = false,
      } = args;

      const columnHidden = hidden[name]!;
      const toggleHide = (value?: boolean) =>
        setHidden({ ...hidden, [name]: value ?? !columnHidden });

      const header: RenderHeadProps = {
        name,
        label,
        hidden: columnHidden,
        toggleHide: !unhideable ? toggleHide : undefined,
        sortOrder: sortInfo?.columnName === name ? sortInfo.order : SortOrder.UNSORTED,
        toggleSort: !unsortable ? () => sort(name) : undefined,
      };

      originalHeaders.push(header);
      if (!columnHidden) headers.push({ ...header, render: () => renderHead(header) });
    }
  }

  return { headers, originalHeaders };
}

function makeRow<T extends ColumnTypes, U>(
  callback: (cell: RenderCellProps<T>, columnsArgs: Column<T>, columnName: string) => U | null,
  columns: Columns<T>,
  row: Row<T>,
): U[] {
  const cells: U[] = [];

  for (const [columnName, columnArgs] of Object.entries<Column<T>>(columns)) {
    const { hidden, defaultValue } = columnArgs;
    if (!hidden) {
      const value = (row as Record<string, Any>)[columnName] ?? getDefaultValue(defaultValue, row);
      const cell = callback({ row, value }, columnArgs, columnName);
      if (cell) cells.push(cell);
    }
  }

  return cells;
}

export function makeOriginalRows<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
): State<T>['originalRows'] {
  const originalRows: State<T>['originalRows'] = [];

  for (const row of data) {
    const originalCells = makeRow((cell) => cell, columns, row);
    originalRows.push({ originalCells });
  }

  return originalRows;
}

export function makeRows<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  hidden: Hidden<T>,
  options?: Options<T>,
): State<T>['rows'] {
  const rows: State<T>['rows'] = [];

  for (const row of data) {
    const cells = makeRow(
      (cell, columnArgs, columnName) => {
        if (hidden[columnName]) return null;
        else {
          const defaultRenderCell = () => <td>{String(cell.value)}</td>;
          const renderCell =
            columnArgs.renderCell ?? options?.style?.renderCell ?? defaultRenderCell;
          return { ...cell, render: () => renderCell(cell) };
        }
      },
      columns,
      row,
    );

    rows.push({ cells });
  }

  return rows;
}
