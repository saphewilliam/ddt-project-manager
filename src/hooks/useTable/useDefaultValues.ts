import { useMemo } from 'react';
import { Any, Columns, ColumnTypes, Data, DefaultValue, DefaultValuesState, Row } from './types';

function getDefaultValue<T extends ColumnTypes, U>(
  defaultValue: DefaultValue<T, U>,
  row: Row<T>,
): U {
  if (typeof defaultValue !== 'function') return defaultValue;
  else return (defaultValue as (row: Row<T>) => U)(row);
}

export default function useDefaultValues<T extends ColumnTypes>(
  data: Data<T>,
  columns: Columns<T>,
): DefaultValuesState<T> {
  const defaultValuesData = useMemo<Data<T>>(
    () =>
      data.map((row) =>
        Object.entries(columns).reduce(
          (prev, [name, column]) => ({
            ...prev,
            [name]: (row as Record<string, Any>)[name] ?? getDefaultValue(column.defaultValue, row),
          }),
          {} as Row<T>,
        ),
      ),
    [data, columns],
  );

  return { defaultValuesData };
}
