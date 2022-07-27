import useSafeQuery from '@hooks/useSafeQuery';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect } from 'react';
import { makeInventoryTableData } from '@lib/inventoryHelpers';
import { extractURLParam } from '@lib/util';
import InventoryTemplate from '@templates/InventoryTemplate';

export default function UserInventoryPage(): ReactElement {
  const router = useRouter();
  const slug = extractURLParam('slug', router.query);

  const { data } = useSafeQuery(`useUserInventory`, { userSlug: slug ?? '' }, slug);

  useEffect(() => {
    if (data !== undefined && data.user === null) router.push('/inventory');
  }, [data]);

  const tableData = useMemo(() => makeInventoryTableData(data), [data]);

  return (
    <InventoryTemplate
      loading={data === undefined}
      tableData={tableData}
      swrKey={`useUserInventory${slug}`}
      userId={data?.user?.id}
      title={
        data?.user ? `${data.user.firstName} ${data.user.lastName} Inventory` : 'User Inventory'
      }
    />
  );
}
