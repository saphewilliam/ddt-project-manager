import React, { ReactElement, useMemo } from 'react';
import ListTemplate from '@components/templates/InventoryTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeAllInventoryTableData } from '@lib/inventoryHelpers';

export default function AllInventoryPage(): ReactElement {
  const { data: inventoryData } = useSafeQuery('useInventory', {});

  const tableData = useMemo(() => makeAllInventoryTableData(inventoryData), [inventoryData]);

  return (
    <ListTemplate
      loading={inventoryData === undefined}
      tableData={tableData}
      swrKey="useInventory"
      title="All inventory"
    />
  );
}
