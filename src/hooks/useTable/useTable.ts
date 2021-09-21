import { useEffect, useMemo } from 'react';
import { Columns, ColumnTypes, Data, Options, State } from './types';
import useColumnType from './useColumnType';
import useDefaultValues from './useDefaultValues';
import useHidden from './useHidden';
import useIntermediateMemo from './useIntermediateMemo';
import usePagination from './usePagination';
import useSearch from './useSearch';
import useSort from './useSort';
import { makeHeaders, makeOriginalRows, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options<T>,
): State<T> {
  const columnsMemo = useIntermediateMemo(columns);
  const dataMemo = useIntermediateMemo(data);
  const optionsMemo = useIntermediateMemo(options);

  // Calculate which columns should be hidden
  const { hidden, setHidden, setAllHidden } = useHidden(columnsMemo);

  // Set undefined values to defaultvalue
  const { defaultValuesData } = useDefaultValues(dataMemo, columnsMemo);

  // Find the runtime type of each column
  const { columnType } = useColumnType(columnsMemo, defaultValuesData);

  // Search filter the data
  const { searchedData, searchString, setSearchString, highlight } = useSearch(
    columnsMemo,
    defaultValuesData,
    hidden,
    columnType,
    optionsMemo,
  );

  // Sort the searched data
  const { sortedData, sortInfo, sort } = useSort(columnsMemo, searchedData, columnType);

  // Paginate the searched, sorted data
  const { paginatedData, page, pageAmount, setPage } = usePagination(
    sortedData,
    optionsMemo?.pageSize,
  );

  // Set page to 0 if sorted data updates
  useEffect(() => {
    if (optionsMemo?.pageSize !== undefined) setPage(0);
  }, [sortedData, optionsMemo, setPage]);

  const { headers, originalHeaders } = useMemo(
    () => makeHeaders(columnsMemo, hidden, setHidden, sortInfo, sort, optionsMemo),
    [columnsMemo, hidden, setHidden, sortInfo, sort, optionsMemo],
  );

  const originalRows = useMemo(
    () => makeOriginalRows(columnsMemo, dataMemo, highlight),
    [columnsMemo, dataMemo, highlight],
  );

  const rows = useMemo(
    () => makeRows(columnsMemo, paginatedData, hidden, highlight, optionsMemo),
    [columnsMemo, paginatedData, hidden, highlight, optionsMemo],
  );

  return {
    originalHeaders,
    headers,
    originalRows,
    rows,
    hiddenHelpers: {
      hidden,
      hideAll: () => setAllHidden(true),
      showAll: () => setAllHidden(false),
    },
    paginationHelpers: {
      page: page + 1,
      pageAmount,
      setPage,
      canPrev: page > 0,
      canNext: page < pageAmount - 1,
      prevPage: () => setPage(page - 1),
      nextPage: () => setPage(page + 1),
    },
    searchHelpers: {
      searchString,
      setSearchString,
    },
  };
}
