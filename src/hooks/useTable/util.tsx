import { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  Any,
  Column,
  Columns,
  ColumnTypes,
  Data,
  Hidden,
  Options,
  RenderCellProps,
  RenderHeadProps,
  SortInfo,
  SortOrder,
  State,
} from './types';

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
        toggleSort: () => sort(name),
      };

      originalHeaders.push(header);
      if (!columnHidden) headers.push({ ...header, render: () => renderHead(header) });
    }
  }

  return { headers, originalHeaders };
}

export function makeRows<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  hidden: Hidden<T>,
  options?: Options<T>,
): { rows: State<T>['rows']; originalRows: State<T>['originalRows'] } {
  const rows: State<T>['rows'] = [];
  const originalRows: State<T>['originalRows'] = [];

  for (const row of data) {
    const cells: (RenderCellProps<T> & { render: () => ReactElement })[] = [];
    const originalCells: RenderCellProps<T>[] = [];

    for (const [columnName, columnArgs] of Object.entries<Column<T>>(columns)) {
      if (!columnArgs.hidden) {
        const columnHidden = hidden[columnName]!;
        const value = (row as Record<string, Any>)[columnName] ?? columnArgs.defaultValue;
        const defaultRenderCell = () => <td>{String(value)}</td>;
        const renderCell = columnArgs.renderCell ?? options?.style?.renderCell ?? defaultRenderCell;

        const cell: RenderCellProps<T> = { row, value };

        originalCells.push(cell);
        if (!columnHidden) cells.push({ ...cell, render: () => renderCell(cell) });
      }
    }

    rows.push({ cells });
    originalRows.push({ originalCells });
  }

  return { rows, originalRows };
}
