import React, { ReactElement, useMemo } from 'react';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeAllInventoryTableData } from '@lib/inventoryHelpers';
import InventoryTemplate from '@templates/InventoryTemplate';

export default function AllInventoryPage(): ReactElement {
  const { data } = useSafeQuery('useInventory', {});

  const tableData = useMemo(() => makeAllInventoryTableData(data), [data]);

  return (
    <InventoryTemplate
      loading={data === undefined}
      tableData={tableData}
      swrKey="useInventory"
      title="All inventory"
      userId={null}
    />
  );
}
