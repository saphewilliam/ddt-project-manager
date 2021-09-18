import { Columns, ColumnTypes, Data, Options, State } from './types';
import { makeHeaders, makeRows } from './util';

export default function useTable<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  options?: Options,
): State {
  console.log(options);
  return { headers: makeHeaders(columns), rows: makeRows(columns, data) };
}
