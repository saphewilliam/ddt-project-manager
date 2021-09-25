import cx from 'clsx';
import React, { ReactElement, useMemo } from 'react';
import ReactLoading from 'react-loading';
import Layout from '@components/Layout';
import StoneList from '@components/StoneList';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeStoneListsTableData } from '@lib/stoneListHelpers';

export default function ListAllPage(): ReactElement {
  const { data } = useSafeQuery('useGetStoneLists', {});

  const tableData = useMemo(() => makeStoneListsTableData(data), [data]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>List All</h1>

      {data === undefined ? (
        <ReactLoading color="#989A9E" type="spinningBubbles" />
      ) : (
        tableData.map((table, index) => (
          <StoneList key={index} title={table.title} rows={table.rows} />
        ))
      )}
    </Layout>
  );
}
