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

/** Used to type column values */
export interface Column<T extends Columns<T>, U> {
  /** Optional: name shown at the top of the column */
  label?: string;
  /** Optional: specifies how the cells in this column render */
  renderCell?: (props: { row: Row<T>; value: U }) => ReactElement;
  /** Optional: specifies how the header cell of this column renders */
  renderHead?: (props: { label: string }) => ReactElement;

  /** Optional (default = `false`): don't show this column at all */
  // hidden?: boolean;
  // sort: eeeh
  // type: if type is not string, number, or bool, then renderCell is required, default = string
  // defaultValue: makes the value nullable
  // TODO also make a function that accepts the row
  // defaultValue?: T;
  // nullable?: boolean;
}

// interface ColumnBase {
//   /** Required: name shown at the top of the column */
//   label: string;
//   /** Optional (default = `false`): don't show this column at all */
//   hidden?: boolean;
//   // render?: (value: { row: any; value: string }) => ReactNode;
//   // sort: eeeh
//   // type: if type is not string, number, or bool, then renderCell is required, default = string
//   // defaultValue: makes the value nullable
// }

// interface ValueColumn extends ColumnBase {
//   /** Optional (default = `ColumnType.string`): the value type of the column */
//   type?: ColumnType.STRING | ColumnType.NUMBER | ColumnType.BOOLEAN;
// }

// interface ObjectColumn extends ColumnBase {
//   /** Optional (default = `ColumnType.string`): the value type of the column */
//   type: ColumnType.OBJECT;
// }

// export type Column<T = string> = ValueColumn | ObjectColumn;

/** User input object for column configuration */
export interface Columns<T extends Columns<T>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [columnName: string]: Column<T, any>;
}

// From https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
// type SubType<Base, Condition> = Pick<
//   Base,
//   {
//     [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
//   }[keyof Base]
// >;

// export type Data<T extends Columns> = {
//   [P in keyof T]?: FieldValue<T[P]>;
// } &
//   {
//     [P in keyof SubType<T, { validation: { required: string } }>]: FieldValue<T[P]>;
//   };

// export type GetColumnType<T extends Column> = T extends { type: ColumnType.BOOLEAN }
//   ? boolean
//   : T extends { type: ColumnType.NUMBER }
//   ? number
//   : T extends { type: ColumnType.OBJECT }
//   ? Record<string, any>
//   : string;

/** User input object for data configuration */
// export type Data<T extends Columns> = {
//   [P in keyof T]?: T[P] extends Column<infer T> ? T : never;
// } &
//   {
//     [P in keyof SubType<T, { defaultValue: number }>]: T[P] extends Column<infer T> ? T : never;
//   };

/** User input object for row configuration */
export type Row<T extends Columns<T>> = {
  [P in keyof T]: T[P] extends Column<T, infer U> ? U : never;
};

/** User input object for data configuration */
export type Data<T extends Columns<T>> = Array<Row<T>>;

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
