import fuzzysort from 'fuzzysort';
import { useCallback, useEffect, useState } from 'react';
import {
  Any,
  Columns,
  ColumnTypes,
  Data,
  Hidden,
  HighlightFunc,
  Options,
  Row,
  SearchMode,
  SearchState,
} from './types';

async function searchFuzzy<T extends ColumnTypes>(
  preparedData: PreparedData<T>,
  searchString: string,
  columnNames: string[],
): Promise<Data<T>> {
  const searched = await fuzzysort.goAsync(searchString, preparedData, { keys: columnNames });
  return searched.map((row) => row.obj.originalRow);
}

async function searchExact<T extends ColumnTypes>(
  preparedData: PreparedData<T>,
  searchString: string,
  columnNames: string[],
): Promise<Data<T>> {
  const searched = preparedData.filter((row) => {
    for (const [columnName, value] of Object.entries(row)) {
      if (
        columnNames.indexOf(columnName) !== -1 &&
        (value as unknown as string).toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      )
        return true;
    }
    return false;
  });

  return searched.map((row) => row.originalRow);
}

type PreparedData<T extends ColumnTypes> = { originalRow: Row<T> }[];

async function prepareData<T extends ColumnTypes>(
  data: Data<T>,
  columns: Columns<T>,
): Promise<PreparedData<T>> {
  return data.map((row) =>
    Object.entries(columns).reduce(
      (prev, [columnName, column]) => {
        const value = (row as Record<string, Any>)[columnName];
        const stringValue = column.stringify ? column.stringify(value, row) : String(value);
        return { ...prev, [columnName]: stringValue };
      },
      { originalRow: row },
    ),
  );
}

export default function useSearch<T extends ColumnTypes>(
  columns: Columns<T>,
  data: Data<T>,
  hidden: Hidden<T>,
  options?: Options<T>,
): SearchState<T> {
  const [searchString, setSearchString] = useState('');
  const [searchedData, setSearchedData] = useState(data);

  const highlight: HighlightFunc = useCallback(
    (query: string) => {
      if (searchString === '') return [{ value: query, highlighted: false }];
      else if (options?.search?.mode === SearchMode.EXACT) {
        const match = query.toLowerCase().indexOf(searchString.toLowerCase());
        if (match === -1) return [{ value: query, highlighted: false }];
        else
          return [
            { value: query.substr(0, match), highlighted: false },
            { value: query.substr(match, searchString.length), highlighted: true },
            { value: query.substr(match + searchString.length), highlighted: false },
          ];
      } else {
        const match = fuzzysort.single(searchString, query);
        if (match === null) return [{ value: query, highlighted: false }];
        else {
          const delimiter = '~.*>+';
          return fuzzysort
            .highlight(match, delimiter, delimiter)!
            .split(delimiter)
            .map((value, idx) => ({ value, highlighted: idx % 2 === 1 }));
        }
      }
    },
    [searchString, options],
  );

  useEffect(() => {
    if (searchString === '') setSearchedData(data);
    else {
      const search = async () => {
        const columnNames = Object.keys(columns).filter((columnName) => !hidden[columnName]);
        const preparedData = await prepareData(data, columns);
        if (options?.search?.mode === SearchMode.EXACT)
          setSearchedData(await searchExact(preparedData, searchString, columnNames));
        else setSearchedData(await searchFuzzy(preparedData, searchString, columnNames));
      };
      search();
    }
  }, [columns, data, hidden, options, searchString, setSearchedData]);

  return { searchString, setSearchString, searchedData, highlight };
}
