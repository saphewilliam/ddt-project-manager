import cx from 'clsx';
import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/Layout';
import useSdk from '@hooks/useSdk';
import { displayError } from '@lib/util';

export default function ListAllPage(): ReactElement {
  const sdk = useSdk();
  const { data, error } = sdk.useGetStoneLists();

  useEffect(() => {
    if (!data && error) displayError(error.message);
  }, [data, error]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>List All</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th></th>
              <th>World</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hello</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
