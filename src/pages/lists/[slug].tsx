import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect, useState } from 'react';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
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
      if (slug !== null) {
        const newStoneList = await getStoneList({ userSlug: slug });
        if (newStoneList?.user === null) router.push('/lists');
        else setStoneList(newStoneList);
      }
    };
    setStoneList(null);
    updateStoneList();
  }, [router.asPath]);

  const tableData = useMemo(() => makeStoneListTableData(stoneList), [stoneList]);

  return (
    <Layout>
      {stoneList === null ? (
        <Loading />
      ) : (
        <>
          <h1 className={cx('font-bold', 'text-4xl')}>
            {stoneList?.user && `${stoneList.user.firstName} ${stoneList.user.lastName}'s List`}
          </h1>
          {tableData.map((table, index) => (
            <StoneList key={index} title={table.title} rows={table.rows} />
          ))}
        </>
      )}
    </Layout>
  );
}
