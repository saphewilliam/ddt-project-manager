import { useEffect, useMemo } from 'react';
import { Columns, ColumnTypes, Data, Options, State } from './types';
import useHidden from './useHidden';
import useIntermediateMemo from './useIntermediateMemo';
import usePagination from './usePagination';
import { makeHeaders, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options<T>,
): State<T> {
  const columnsMemo = useIntermediateMemo(columns);
  const dataMemo = useIntermediateMemo(data);
  const optionsMemo = useIntermediateMemo(options);

  const { hidden, setHidden, setAllHidden } = useHidden(columnsMemo);

  const { page, pageAmount, setPage, paginatedData } = usePagination(
    dataMemo,
    optionsMemo?.pageSize,
  );

  const { headers, originalHeaders } = useMemo(
    () => makeHeaders(columnsMemo, hidden, setHidden, optionsMemo),
    [columnsMemo, hidden, setHidden, optionsMemo],
  );

  const { rows, originalRows } = useMemo(
    () => makeRows(columns, paginatedData, hidden, optionsMemo),
    [columnsMemo, paginatedData, hidden, optionsMemo],
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
