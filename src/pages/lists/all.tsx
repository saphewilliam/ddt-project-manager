import cx from 'clsx';
import React, { ReactElement, useEffect, useMemo } from 'react';
import Layout from '@components/Layout';
import useSdk from '@hooks/useSdk';
import {
  fontColorFromBackground,
  formatNumber,
  makeStonelistsTableData,
  StonelistsTableData,
} from '@lib/stoneListHelpers';
import { displayError } from '@lib/util';

export default function ListAllPage(): ReactElement {
  const sdk = useSdk();
  const { data, error } = sdk.useGetStoneLists();

  const tableData = useMemo<StonelistsTableData>(() => {
    return makeStonelistsTableData(data);
  }, [data]);

  useEffect(() => {
    if (!data && error) displayError(error.message);
  }, [data, error]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>List All</h1>

      {tableData.map((table, index) => (
        <div key={index}>
          <h2 className={cx('font-bold', 'text-2xl', 'mb-4', 'mt-8')}>{table.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Color</th>
                {data?.stoneListUsers.map((user) => (
                  <th key={user.id}>{user.displayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id}>
                  <td
                    style={{
                      backgroundColor: row.hex,
                      color: fontColorFromBackground(row.hex),
                    }}
                  >
                    {row.name}
                  </td>
                  {row.stoneLists.map((stoneList) => (
                    <td key={stoneList.id}>{formatNumber(stoneList.amount)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </Layout>
  );
}
