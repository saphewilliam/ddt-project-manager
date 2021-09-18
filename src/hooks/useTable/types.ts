import { ReactElement } from 'react';

/** The sorting state of a column */
export enum SortState {
  /** Sort data in this column in ascending order */
  ASC = 'ASC',
  /** Sort data in this column in descending order */
  DESC = 'DESC',
  /** Don't sort the data in this column */
  UNSORTED = 'UNSORTED',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

/** User input type for column type configuration */
export interface ColumnTypes {
  [columnName: string]: Any;
}

/** User input object for column configuration */
export type Columns<T extends ColumnTypes> = {
  [P in keyof T]: Column<T, T[P]>;
};

export interface Column<T extends ColumnTypes, U> {
  /** Optional: name shown at the top of the column */
  label?: string;
  /** Optional (default = `false`): don't show this column at all */
  hidden?: boolean;
  /** Optional: the value that should replace undefined at runtime */
  defaultValue?: U;
  /** Optional: specifies how the cells in this column render */
  renderCell?: (props: { row: Row<T>; value: U }) => ReactElement;
  /** Optional: specifies how the header cell of this column renders */
  renderHead?: (props: { label: string }) => ReactElement;
}

/** User input object for data row configuration */
export type Row<T extends ColumnTypes> = Partial<Pick<T, RowOptionals<T>>> &
  Omit<T, RowOptionals<T>> &
  Record<string, Any>;

type RowOptionals<T extends ColumnTypes> = {
  [K in keyof T]: null extends T[K] ? K : undefined extends T[K] ? K : never;
}[keyof T];

/** User input object for data configuration */
export type Data<T extends ColumnTypes> = Array<Row<T>>;

/** User input object for options configuration */
export interface Options {}

/** Output table state object */
export interface State {
  headers: {
    name: string;
    label: string;
    render: () => ReactElement;
    // toggleHide: (value?: boolean) => void;
    // hidden: boolean;
    // toggleSort: (state?: SortState) => void;
    // sortState: SortState;
  }[];
  rows: {
    cells: {
      render: () => ReactElement;
    }[];
  }[];
}
