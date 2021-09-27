import cx from 'clsx';
import React, { ReactElement, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { State as TableState } from '@hooks/useTable';
import { StoneListColumnTypes } from '@lib/stoneListHelpers';

export interface Props {
  headers: TableState<StoneListColumnTypes>['headers'];
  rows: TableState<StoneListColumnTypes>['rows'];
}

export default function StoneListTable(props: Props): ReactElement {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [props.rows]);

  return (
    <div className={cx('relative', 'w-full')}>
      <table className={cx('text-left', 'w-full')}>
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
                'hover:bg-light',
                'transition-colors',
                'border-b',
                'border-dark',
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
