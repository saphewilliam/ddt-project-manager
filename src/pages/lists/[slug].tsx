import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Layout from '@components/Layout';
import StoneList from '@components/StoneList';
import { getStoneListQuery } from '@graphql/__generated__/codegen-self';
import useSdk from '@hooks/useSdk';
import { makeStoneListTableData } from '@lib/stoneListHelpers';
import { extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const { getStoneList } = useSdk();

  const [stoneList, setStoneList] = useState<getStoneListQuery | null>(null);

  useEffect(() => {
    const updateStoneList = async () => {
      const slug = extractURLParam('slug', router.query);
      const newStoneList = await getStoneList({ userSlug: slug ?? '' });
      setStoneList(newStoneList);
    };
    setStoneList(null);
    updateStoneList();
  }, [router]);

  const tableData = useMemo(() => makeStoneListTableData(stoneList), [stoneList]);

  useEffect(() => {
    if (stoneList?.user === null) router.push('/lists');
  }, [stoneList]);

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>
        {stoneList?.user && `${stoneList.user.firstName} ${stoneList.user.lastName}'s List`}
      </h1>

      {stoneList === null ? (
        <ReactLoading color="#989A9E" type="spinningBubbles" />
      ) : (
        tableData.map((table, index) => (
          <StoneList key={index} title={table.title} rows={table.rows} />
        ))
      )}
    </Layout>
  );
}
