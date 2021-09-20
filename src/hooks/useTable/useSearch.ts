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
  SearchMode,
  SearchState,
} from './types';

async function searchExact<T extends ColumnTypes>(
  data: Data<T>,
  columns: Columns<T>,
  searchString: string,
  columnNames: string[],
): Promise<Data<T>> {
  console.log(columns, searchString, columnNames);
  // TODO
  // const $rows = $('#table tr');
  // $('#search').keyup(function () {
  //   const val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  //   $rows
  //     .show()
  //     .filter(function () {
  //       const text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
  //       return !~text.indexOf(val);
  //     })
  //     .hide();
  // });

  return data;
}

async function searchFuzzy<T extends ColumnTypes>(
  data: Data<T>,
  columns: Columns<T>,
  searchString: string,
  columnNames: string[],
): Promise<Data<T>> {
  const rows = data.map((row) =>
    Object.entries(columns).reduce(
      (prev, [columnName, column]) => {
        const value = (row as Record<string, Any>)[columnName];
        const stringValue = column.stringify ? column.stringify(value, row) : String(value);
        return { ...prev, [columnName]: stringValue };
      },
      { originalRow: row },
    ),
  );

  const sorted = await fuzzysort.goAsync(searchString, rows, { keys: columnNames });
  return sorted.map((row) => row.obj.originalRow);
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
        // TODO
        return [{ value: query, highlighted: false }];
      } else {
        const match = fuzzysort.single(searchString, query);
        if (match === null) return [{ value: query, highlighted: false }];
        else {
          const delimiter = '~.*';
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
      const columnNames = Object.keys(columns).filter((columnName) => !hidden[columnName]);
      if (options?.search?.mode === SearchMode.EXACT)
        searchExact(data, columns, searchString, columnNames).then((data) => setSearchedData(data));
      else
        searchFuzzy(data, columns, searchString, columnNames).then((data) => setSearchedData(data));
    }
  }, [columns, data, hidden, options, searchString, setSearchedData]);

  return { searchString, setSearchString, searchedData, highlight };
}
