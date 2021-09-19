import { useEffect, useMemo } from 'react';
import { Columns, ColumnTypes, Data, Options, State } from './types';
import useHidden from './useHidden';
import useIntermediateMemo from './useIntermediateMemo';
import usePagination from './usePagination';
import useSort from './useSort';
import { makeHeaders, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options<T>,
): State<T> {
  const columnsMemo = useIntermediateMemo(columns);
  const dataMemo = useIntermediateMemo(data);
  const optionsMemo = useIntermediateMemo(options);

  const { sortedData, sortInfo, sort } = useSort(columnsMemo, dataMemo);

  const { page, pageAmount, setPage, paginatedData } = usePagination(
    sortedData,
    optionsMemo?.pageSize,
  );

  useEffect(() => {
    if (optionsMemo?.pageSize !== undefined) setPage(0);
  }, [sortedData]);

  const { hidden, setHidden, setAllHidden } = useHidden(columnsMemo);

  const { headers, originalHeaders } = useMemo(
    () => makeHeaders(columnsMemo, hidden, setHidden, sortInfo, sort, optionsMemo),
    [columnsMemo, optionsMemo, hidden, setHidden, sortInfo, sort],
  );

  const { rows, originalRows } = useMemo(
    () => makeRows(columnsMemo, paginatedData, hidden, optionsMemo),
    [columnsMemo, optionsMemo, paginatedData, hidden],
  );

  return {
    headers,
    originalHeaders,
    rows,
    originalRows,
    hiddenCols: {
      hidden,
      hideAll: () => setAllHidden(true),
      showAll: () => setAllHidden(false),
    },
    pagination: {
      page: page + 1,
      pageAmount,
      setPage,
      canPrev: page > 0,
      canNext: page < pageAmount - 1,
      prevPage: () => setPage(page - 1),
      nextPage: () => setPage(page + 1),
    },
  };
}
