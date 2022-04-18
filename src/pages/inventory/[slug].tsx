import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect } from 'react';
import InventoryTemplate from '@components/templates/InventoryTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeInventoryTableData } from '@lib/inventoryHelpers';
import { extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const slug = extractURLParam('slug', router.query);

  const { data: inventoryData } = useSafeQuery(`useUserInventory`, { userSlug: slug ?? '' }, slug);

  useEffect(() => {
    if (inventoryData !== undefined && inventoryData.user === null) router.push('/inventory');
  }, [inventoryData]);

  const tableData = useMemo(() => makeInventoryTableData(inventoryData), [inventoryData]);

  return (
    <InventoryTemplate
      loading={inventoryData === undefined}
      tableData={tableData}
      swrKey={`useUserInventory${slug}`}
      title={
        inventoryData?.user
          ? `${inventoryData.user.firstName} ${inventoryData.user.lastName} Inventory`
          : 'User Inventory'
      }
    />
  );
}
