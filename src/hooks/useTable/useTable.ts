import { useMemo } from 'react';
import { Columns, ColumnTypes, Data, Options, State } from './types';
import useHidden from './useHidden';
import { makeHeaders, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options<T>,
): State<T> {
  const { hidden, setHidden, setAllHidden } = useHidden(columns);

  const { headers, originalHeaders } = useMemo(
    () => makeHeaders(columns, hidden, setHidden, options),
    [columns, hidden, setHidden, options],
  );

  const { rows, originalRows } = useMemo(
    () => makeRows(columns, data, hidden, options),
    [columns, data, hidden, options],
  );

  return {
    headers,
    originalHeaders,
    rows,
    originalRows,
    hiddenCols: { hidden, hideAll: () => setAllHidden(true), showAll: () => setAllHidden(false) },
  };
}
