import { Columns, Data, State } from './types';
import { makeHeaders, makeRows } from './util';

// interface Options {}

export default function useTable<T extends Columns<T>>(
  columns: T,
  data: Data<T>,
  // options?: Options,
): State {
  return { headers: makeHeaders(columns), rows: makeRows(columns, data) };
}
