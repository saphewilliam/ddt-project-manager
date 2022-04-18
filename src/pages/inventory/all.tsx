import React, { ReactElement, useMemo } from 'react';
import InventoryTemplate from '@components/templates/InventoryTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeAllInventoryTableData } from '@lib/inventoryHelpers';

export default function AllInventoryPage(): ReactElement {
  const { data } = useSafeQuery('useInventory', {});

  const tableData = useMemo(() => makeAllInventoryTableData(data), [data]);

  return (
    <InventoryTemplate
      loading={data === undefined}
      tableData={tableData}
      swrKey="useInventory"
      title="All inventory"
    />
  );
}
