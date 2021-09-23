import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';
import {
  fontColorFromBackground,
  formatNumber,
  makeStonelistTableData,
  StonelistTableData,
} from '@lib/stoneListHelpers';
import { extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const slug = extractURLParam('slug', router.query);

  const { data } = useSafeQuery('useGetStoneList', { userSlug: slug ?? '' });

  const tableData = useMemo<StonelistTableData>(() => makeStonelistTableData(data), [data]);

  useEffect(() => {
    if (data?.user === null) router.push('/lists');
  }, [data]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>
        {data?.user && `${data.user.firstName} ${data.user.lastName}'s List`}
      </h1>

      {tableData.map((table, index) => (
        <div key={index}>
          <h2 className={cx('font-bold', 'text-2xl', 'mb-4', 'mt-8')}>{table.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Color</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id}>
                  <td
                    style={{
                      backgroundColor: row.stone.hex,
                      color: fontColorFromBackground(row.stone.hex),
                    }}
                  >
                    {row.stone.name}
                  </td>
                  <td>{formatNumber(row.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </Layout>
  );
}
