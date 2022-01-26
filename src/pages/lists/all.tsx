import React, { ReactElement, useMemo } from 'react';
import ListTemplate from '@components/templates/ListTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeStoneListsTableData } from '@lib/stoneListHelpers';

export default function ListAllPage(): ReactElement {
  const { data } = useSafeQuery('useStoneLists', {});

  const tableData = useMemo(() => makeStoneListsTableData(data), [data]);

  return (
    <ListTemplate
      loading={data === undefined}
      data={tableData}
      swrKey="useGetStoneLists"
      title="List All"
    />
  );
}
