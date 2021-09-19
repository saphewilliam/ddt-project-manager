import { useCallback, useMemo, useState } from 'react';
import { Any, Columns, ColumnTypes, Data, SortInfo, SortOrder, SortState } from './types';

function sortWrapper<T>(
  sort: (a: T, b: T, invert: boolean) => number,
  invert: boolean,
  a?: T,
  b?: T,
  defaultValue?: T,
): number {
  const aValue = a ?? defaultValue;
  const bValue = b ?? defaultValue;

  if (aValue === undefined && bValue === undefined) return 0;
  else if (aValue === undefined) return invert ? -1 : 1;
  else if (bValue === undefined) return invert ? 1 : -1;
  return sort(aValue, bValue, invert);
}

function defaultNumberSort(a: number, b: number, invert: boolean): number {
  return (invert ? -1 : 1) * (a - b);
}

function defaultStringSort(a: string, b: string, invert: boolean): number {
  return (invert ? -1 : 1) * a.localeCompare(b);
}

function defaultBooleanSort(a: boolean, b: boolean, invert: boolean): number {
  if (a && !b) return invert ? 1 : -1;
  if (b && !a) return invert ? -1 : 1;
  return 0;
}

function getColumnType<T extends ColumnTypes>(
  data: Data<T>,
  columnName: string | null,
): string | null {
  if (columnName === null) return null;
  for (const row of data) {
    const type = typeof (row as Record<string, Any>)[columnName];
    if (['string', 'number', 'boolean'].indexOf(type) !== -1) return type;
  }
  return null;
}

export default function useSort<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
): SortState<T> {
  const [sortInfo, setSortInfo] = useState<SortInfo>(null);

  const sortedData = useMemo(() => {
    if (sortInfo !== null) {
      const { columnName, order } = sortInfo;
      const customSort = columns[columnName]?.sort;
      const defaultValue = columns[columnName]?.defaultValue;
      const invert = order === SortOrder.DESC;
      const colType = getColumnType(data, columnName);

      if (colType === null && customSort === undefined) {
        console.error(`Column '${columnName}' does not have a sorting function configured`);
        return data;
      }

      return [...data].sort((a, b) => {
        const aValue = (a as Record<string, Any>)[columnName];
        const bValue = (b as Record<string, Any>)[columnName];

        if (customSort !== undefined)
          return sortWrapper(customSort, invert, aValue, bValue, defaultValue);
        else if (colType === 'string')
          return sortWrapper(defaultStringSort, invert, aValue, bValue, defaultValue);
        else if (colType === 'boolean')
          return sortWrapper(defaultBooleanSort, invert, aValue, bValue, defaultValue);
        else if (colType === 'number')
          return sortWrapper(defaultNumberSort, invert, aValue, bValue, defaultValue);
        else return 0;
      });
    } else return data;
  }, [columns, data, sortInfo]);

  const sort = useCallback(
    (columnName: string) => {
      if (sortInfo?.columnName !== columnName) setSortInfo({ columnName, order: SortOrder.ASC });
      else if (sortInfo.order === SortOrder.ASC) setSortInfo({ columnName, order: SortOrder.DESC });
      else if (sortInfo.order === SortOrder.DESC) setSortInfo(null);
    },
    [sortInfo, setSortInfo],
  );

  return { sortedData, sort, sortInfo };
}
