import { useState, useEffect, useCallback } from 'react';
import { Column, Columns, ColumnTypes, Hidden, HiddenState } from './types';

function getHidden<T extends ColumnTypes>(
  columns: Columns<T>,
  prevHidden?: Record<string, boolean> | boolean,
): Hidden<T> {
  const hidden: Record<string, boolean> = {};

  for (const [name, args] of Object.entries<Column<T>>(columns)) {
    let prevColHidden: boolean | undefined;

    if (prevHidden !== undefined) {
      if (typeof prevHidden === 'boolean') prevColHidden = prevHidden;
      else prevColHidden = prevHidden[name];
    }

    hidden[name] = args.hidden ?? (args.unhideable ? false : null) ?? prevColHidden ?? false;
  }

  return hidden as Hidden<T>;
}

export default function useHidden<T extends ColumnTypes>(columns: Columns<T>): HiddenState<T> {
  const [hidden, setHidden] = useState(getHidden(columns));

  useEffect(() => {
    setHidden(getHidden(columns, hidden));
  }, [columns]);

  const setAllHidden = useCallback(
    (value: boolean) => setHidden(getHidden(columns, value)),
    [columns],
  );

  return { hidden, setHidden, setAllHidden };
}
