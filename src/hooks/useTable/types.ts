import { Dispatch, ReactElement, SetStateAction } from 'react';

/** The sorting state of a column */
export enum SortOrder {
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

export interface RenderHeadProps {
  name: string;
  label: string;
  hidden: boolean;
  toggleHide?: (hide?: boolean) => void;
  sortOrder: SortOrder;
  toggleSort?: (order?: SortOrder) => void;
}

export interface RenderCellProps<T extends ColumnTypes = Any, U = Any> {
  row: Row<T>;
  value: U;
}

export type DefaultValue<T extends ColumnTypes, U> = U | ((row: Row<T>) => U);

export interface Column<T extends ColumnTypes, U = Any> {
  /** Optional: name shown at the top of the column */
  label?: string;
  /** Optional: the value that should replace undefined at runtime */
  defaultValue?: DefaultValue<T, U>;
  /** Optional (default = `false`): don't show this column at all */
  hidden?: boolean;
  /** Optional (default = `false`): user is not able to hide this column */
  unhideable?: boolean;
  /** Optional: custom sorting function for this column */
  sort?: (a: U, b: U, invert: boolean) => number;
  /** Optional (default = `false`): user is not able to sort this column */
  unsortable?: boolean;
  /** Optional: specifies how the header cell of this column renders */
  renderHead?: (props: RenderHeadProps) => ReactElement;
  /** Optional: specifies how the cells in this column render */
  renderCell?: (props: RenderCellProps<T, U>) => ReactElement;
}

/** User input object for data row configuration */
export type Row<T extends ColumnTypes> = Partial<Pick<T, RowOptionals<T>>> &
  Omit<T, RowOptionals<T>>;

type RowOptionals<T extends ColumnTypes> = {
  [K in keyof T]: null extends T[K] ? K : undefined extends T[K] ? K : never;
}[keyof T];

/** User input object for data configuration */
export type Data<T extends ColumnTypes> = Array<Row<T>>;

/** User input object for options configuration */
export interface Options<T extends ColumnTypes> {
  /** Optional: enable pagination */
  pageSize?: number;
  /** Optional: set default styling for the table elements */
  style?: {
    /** Optional: specifies how the header cell of the columns render by default */
    renderHead?: (props: RenderHeadProps) => ReactElement;
    /** Optional: specifies how the header cell of the columns render by default */
    renderCell?: (props: RenderCellProps<T>) => ReactElement;
  };
}

export type Hidden<T extends ColumnTypes> = {
  [P in keyof T]: boolean;
};

export interface HiddenState<T extends ColumnTypes> {
  hidden: Hidden<T>;
  setHidden: Dispatch<SetStateAction<Hidden<T>>>;
  setAllHidden: (hide: boolean) => void;
}

export interface PaginationState<T extends ColumnTypes> {
  page: number;
  pageAmount: number;
  setPage: (pageNumber: number) => void;
  paginatedData: Data<T>;
}

export type SortInfo = {
  order: SortOrder;
  columnName: string;
} | null;

export interface SortState<T extends ColumnTypes> {
  sortedData: Data<T>;
  sortInfo: SortInfo;
  sort: (columnName: string) => void;
}

/** Output table state object */
export interface State<T extends ColumnTypes> {
  headers: (RenderHeadProps & { render: () => ReactElement })[];
  originalHeaders: RenderHeadProps[];
  rows: { cells: (RenderCellProps<T> & { render: () => ReactElement })[] }[];
  originalRows: { originalCells: RenderCellProps<T>[] }[];
  hiddenCols: {
    hidden: Hidden<T>;
    hideAll: () => void;
    showAll: () => void;
  };
  pagination: {
    page: number;
    pageAmount: number;
    setPage: (pageNumber: number) => void;
    nextPage: () => void;
    canNext: boolean;
    prevPage: () => void;
    canPrev: boolean;
  };
}
