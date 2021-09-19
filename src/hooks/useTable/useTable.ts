import { useMemo } from 'react';
import { Columns, ColumnTypes, Data, Options, State } from './types';
import { makeHeaders, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options<T>,
): State<T> {
  const { headers, originalHeaders } = useMemo(() => makeHeaders(columns), [columns]);
  const { rows, originalRows } = useMemo(
    () => makeRows(columns, data, options),
    [columns, data, options],
  );

  return { headers, originalHeaders, rows, originalRows };
}
