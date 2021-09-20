import { useCallback, useMemo, useState } from 'react';
import {
  Any,
  Columns,
  ColumnTypes,
  Data,
  DefaultValue,
  Row,
  SortInfo,
  SortOrder,
  SortState,
} from './types';
import { getDefaultValue } from './util';

function sortWrapper<T extends ColumnTypes, U>(
  sort: (a: U, b: U, invert: boolean) => number,
  a: Row<T>,
  b: Row<T>,
  sortInfo: SortInfo,
  defaultValue?: DefaultValue<T, U>,
): number {
  if (!sortInfo) return 0;

  const getValue = (r: Row<T>) =>
    (r as Record<string, Any>)[sortInfo.columnName] ?? getDefaultValue(defaultValue, r);

  const invert = sortInfo.order === SortOrder.DESC;
  const aValue = getValue(a);
  const bValue = getValue(b);

  if (aValue === undefined && bValue === undefined) return 0;
  else if (aValue === undefined) return invert ? -1 : 1;
  else if (bValue === undefined) return invert ? 1 : -1;
  return sort(aValue, bValue, invert);
}

function sortNumbers(a: number, b: number, invert: boolean): number {
  return (invert ? -1 : 1) * (a - b);
}

function sortStrings(a: string, b: string, invert: boolean): number {
  return (invert ? -1 : 1) * a.localeCompare(b);
}

function sortBooleans(a: boolean, b: boolean, invert: boolean): number {
  if (a && !b) return invert ? 1 : -1;
  if (b && !a) return invert ? -1 : 1;
  return 0;
}

function getColumnType<T extends ColumnTypes>(
  data: Data<T>,
  columns: Columns<T>,
  columnName: string | null,
): string | null {
  if (columnName === null || data.length === 0) return null;

  const isValidType = (type: string) => ['string', 'number', 'boolean'].indexOf(type) !== -1;

  const defaultValueType = typeof getDefaultValue(columns[columnName]?.defaultValue, data[0]!);
  if (isValidType(defaultValueType)) return defaultValueType;

  for (const row of data) {
    const type = typeof (row as Record<string, Any>)[columnName];
    if (isValidType(type)) return type;
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
      const { columnName } = sortInfo;
      const customSort = columns[columnName]?.sort;
      const defaultValue = columns[columnName]?.defaultValue;

      const colType = getColumnType(data, columns, columnName);

      if (colType === null && customSort === undefined) {
        console.error(`Column '${columnName}' does not have a sorting function configured`);
        return data;
      }

      return [...data].sort((a, b) => {
        if (customSort !== undefined) return sortWrapper(customSort, a, b, sortInfo, defaultValue);
        if (colType === 'string') return sortWrapper(sortStrings, a, b, sortInfo, defaultValue);
        if (colType === 'boolean') return sortWrapper(sortBooleans, a, b, sortInfo, defaultValue);
        if (colType === 'number') return sortWrapper(sortNumbers, a, b, sortInfo, defaultValue);
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
