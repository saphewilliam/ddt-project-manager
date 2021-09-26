import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect, useState, useCallback } from 'react';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import StoneList from '@components/StoneList';
import { getUserStoneListQuery } from '@graphql/__generated__/codegen-self';
import useSdk from '@hooks/useSdk';
import { makeStoneListTableData } from '@lib/stoneListHelpers';
import { extractURLParam, promiseWithCatch } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const { getUserStoneList } = useSdk();

  const [stoneList, setStoneList] = useState<getUserStoneListQuery | null>(null);

  const updateStoneList = useCallback(async () => {
    const slug = extractURLParam('slug', router.query);
    if (slug !== null) {
      const newStoneList = await promiseWithCatch(
        getUserStoneList({ userSlug: slug }),
        'Could not fetch users',
      );
      if (newStoneList?.user === null) router.push('/lists');
      else setStoneList(newStoneList);
    }
    return true;
  }, [router.asPath]);

  useEffect(() => {
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
            <StoneList
              key={index}
              title={table.title}
              rows={table.rows}
              revalidate={updateStoneList}
            />
          ))}
        </>
      )}
    </Layout>
  );
}
