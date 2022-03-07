import cx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { fontColorFromBackground } from '@lib/stoneListHelpers';

export interface Props {
  subtheme: {
    color: string;
    name: string;
    stones: {
      id: string;
      amount: number;
      stone: {
        id: string;
        name: string;
        hex: string;
      };
      user: {
        id: string;
        displayName: string;
      };
    }[];
  };
}

export default function StonesOnSubthemeTable(props: Props): ReactElement {
  return (
    <>
      <span className={cx('text-xl', 'mb-5', 'block', 'font-bold')}>{props.subtheme.name}</span>
      <table className={cx('table-auto', 'w-full')}>
        <thead>
          <tr className={cx('border-b')}>
            <th className={cx('text-left')}>Color</th>
            <th className={cx('text-left')}>Person</th>
            <th className={cx('text-left')}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.subtheme.stones.map((stone) => (
            <tr key={stone.id} className={cx('border-b')}>
              <td
                style={{
                  backgroundColor: stone.stone.hex,
                  color: fontColorFromBackground(stone.stone.hex),
                  padding: '8px',
                }}
              >
                {stone.stone.name}
              </td>
              <td
                style={{
                  padding: '8px',
                }}
              >
                {stone.user.displayName}
              </td>
              <td
                style={{
                  width: '20px',
                  padding: '8px',
                }}
              >
                {stone.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
