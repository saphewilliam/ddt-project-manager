import { useRouter } from 'next/router';
import React, { ReactElement, useMemo, useEffect } from 'react';
import InventoryTemplate from '@components/templates/InventoryTemplate';
import useSafeQuery from '@hooks/useSafeQuery';
import { makeInventoryTableData } from '@lib/inventoryHelpers';
import { extractURLParam } from '@lib/util';

export default function ListUserPage(): ReactElement {
  const router = useRouter();
  const slug = extractURLParam('slug', router.query);

  const { data } = useSafeQuery(`useUserInventory`, { userSlug: slug ?? '' }, slug);

  useEffect(() => {
    if (data !== undefined && data.user === null) {
      router.push('/inventory');
    }
  }, [data]);

  const tableData = useMemo(() => makeInventoryTableData(data), [data]);

  return (
    <InventoryTemplate
      loading={data === undefined}
      tableData={tableData}
      swrKey={`useUserInventory${slug}`}
      title={
        data?.user ? `${data.user.firstName} ${data.user.lastName} Inventory` : 'User Inventory'
      }
    />
  );
}
