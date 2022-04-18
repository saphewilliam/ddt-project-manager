import React, { ReactElement, useMemo } from 'react';
import ListTemplate from '@components/templates/ListTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeStoneListsTableData } from '@lib/inventoryHelpers';

export default function AllInventoryPage(): ReactElement {
  const { data } = useSafeQuery('useStoneLists', {});

  const tableData = useMemo(() => makeStoneListsTableData(data), [data]);

  return (
    <ListTemplate
      loading={data === undefined}
      data={tableData}
      swrKey="useGetStoneLists"
      title="All inventory"
    />
  );
}
