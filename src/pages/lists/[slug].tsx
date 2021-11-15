import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect } from 'react';
import ListTemplate from '@components/templates/ListTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeStoneListTableData } from '@lib/stoneListHelpers';
import { extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const slug = extractURLParam('slug', router.query);

  const { data } = useSafeQuery(`useGetUserStoneList`, { userSlug: slug ?? '' }, slug);

  useEffect(() => {
    if (data !== undefined && data.user === null) {
      router.push('/lists');
    }
  }, [data]);

  const tableData = useMemo(() => makeStoneListTableData(data), [data]);

  return (
    <ListTemplate
      loading={data === undefined}
      data={tableData}
      swrKey={`useGetUserStoneList${slug}`}
      title={data?.user ? `${data.user.firstName} ${data.user.lastName}` : ''}
    />
  );
}
