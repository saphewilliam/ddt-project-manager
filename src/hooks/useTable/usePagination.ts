import { useState, useCallback, useMemo } from 'react';
import { ColumnTypes, Data, PaginationState } from './types';

export default function usePagination<T extends ColumnTypes>(
  data: Data<T>,
  pageSize?: number,
): PaginationState<T> {
  const [page, setPage] = useState(0);

  const pageAmount = useMemo(
    () => (pageSize === undefined ? 1 : Math.ceil(data.length / pageSize)),
    [data, pageSize],
  );

  const paginatedData = useMemo(
    () => (pageSize === undefined ? data : data.slice(page * pageSize, page * pageSize + pageSize)),
    [data, page, pageSize],
  );

  const safeSetPage = useCallback(
    (pageNumber: number) => {
      if (pageSize === undefined)
        console.warn('To enable pagination, please set the `pageSize` option');
      else if (pageNumber < 0 || pageNumber >= pageAmount)
        console.error(
          `Cannot set page to ${pageNumber}, should be in between 0 and ${pageAmount - 1}`,
        );
      else setPage(pageNumber);
    },
    [pageSize, pageAmount, setPage],
  );

  return { page, pageAmount, paginatedData, setPage: safeSetPage };
}
