import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/Layout';
import useSdk from '@hooks/useSdk';
import { fontColorFromBackground, formatNumber } from '@lib/stoneListHelpers';
import { displayError, extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const sdk = useSdk();
  const slug = extractURLParam('slug', router.query);

  const { data, error } = sdk.useGetStoneList({ userSlug: slug ?? '' });

  useEffect(() => {
    if (!data && error) displayError(error.message);
  }, [data, error]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>
        {data?.user?.firstName} {data?.user?.lastName}&apos;s List
      </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th>{data?.user?.displayName ?? 'Loading...'}</th>
            </tr>
          </thead>
          <tbody>
            {data?.stoneList.map((row) => (
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
                <td>edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
