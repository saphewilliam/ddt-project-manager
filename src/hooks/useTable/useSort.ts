import { useCallback, useMemo, useState } from 'react';
import { Any, Columns, ColumnTypes, Data, Row, SortOrder } from './types';
import { ColumnType, ColumnTypeEnum } from './useColumnType';

export type SortInfo = {
  order: SortOrder;
  columnName: string;
} | null;

interface SortState<T extends ColumnTypes> {
  sortedData: Data<T>;
  sortInfo: SortInfo;
  sort: (columnName: string) => void;
}

function sortWrapper<T extends ColumnTypes, U>(
  sort: (a: U, b: U, invert: boolean) => number,
  a: Row<T>,
  b: Row<T>,
  sortInfo: SortInfo,
): number {
  if (!sortInfo) return 0;

  const getValue = (r: Row<T>) => (r as Record<string, Any>)[sortInfo.columnName];

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

export default function useSort<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  columnType: ColumnType<T>,
): SortState<T> {
  const [sortInfo, setSortInfo] = useState<SortInfo>(null);

  const sortedData = useMemo(() => {
    if (sortInfo !== null) {
      const { columnName } = sortInfo;
      const customSort = columns[columnName]?.sort;
      const stringify = columns[columnName]?.stringify;
      const colType = columnType[columnName]!;

      if (!stringify && colType === null && customSort === undefined) {
        console.error(
          `Column '${columnName}' does not have a sorting or stringify function configured`,
        );
        return data;
      }

      return [...data].sort((a, b) => {
        if (customSort !== undefined) return sortWrapper(customSort, a, b, sortInfo);
        if (colType === ColumnTypeEnum.STRING) return sortWrapper(sortStrings, a, b, sortInfo);
        if (colType === ColumnTypeEnum.BOOLEAN) return sortWrapper(sortBooleans, a, b, sortInfo);
        if (colType === ColumnTypeEnum.NUMBER) return sortWrapper(sortNumbers, a, b, sortInfo);
        if (stringify)
          return sortStrings(
            stringify((a as Record<string, Any>)[columnName], a),
            stringify((b as Record<string, Any>)[columnName], b),
            sortInfo.order === SortOrder.DESC,
          );
        else return 0;
      });
    } else return data;
  }, [columns, data, columnType, sortInfo]);

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
