import { Header, Row, ColumnTypes } from '@saphe/react-table';
import cx from 'clsx';
import React, { ReactElement, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

export interface Props<T extends ColumnTypes> {
  headers: Header[];
  rows: Row<T>[];
}

export default function Table<T extends ColumnTypes>(props: Props<T>): ReactElement {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [props.rows]);

  return (
    <div
      className={cx(
        'relative',
        'w-full',
        'pb-4',
        'overflow-x-auto',
        'scrollbar-thin',
        'scrollbar-track-gray-100',
        'scrollbar-thumb-gray-400',
        'scrollbar-rounded',
      )}
    >
      <table className={cx('w-full')}>
        <thead>
          <tr>
            {props.headers.map((header, i) => (
              <header.render key={i} />
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, i) => (
            <tr
              key={i}
              className={cx(
                'hover:bg-gray-100',
                'transition-colors',
                'border-b',
                'border-gray-900',
                'border-opacity-20',
              )}
            >
              {row.cells.map((cell, j) => (
                <cell.render key={j} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
