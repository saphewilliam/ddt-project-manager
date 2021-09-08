import { Column, Columns, Data, State } from './types';

/** Utility function to create strongly typed columns */
export function c<T>(col: Column<T>): Column<T> {
  return col;
}

export function makeHeaders<T extends Columns>(columns: T): State['headers'] {
  return Object.entries(columns).map(([name, { label }]) => ({ name, label }));
}

export function makeRows<T extends Columns>(columns: T, data: Data<T>): State['rows'] {
  return data.map((row) => ({
    cells: Object.entries(columns).map(([columnName, { render }]) => {
      return {
        render: () => (render ? render(row[columnName]!) : String(row[columnName])),
      };
    }),
  }));
}
