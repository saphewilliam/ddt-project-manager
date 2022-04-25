import { PencilIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import React, { ReactElement, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Button from '@components/Button';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import { Role } from '@graphql/__generated__/codegen-self';
import useSession from '@hooks/useSession';
import { InventoryTableData } from '@lib/inventoryHelpers';
import AttributeTable from '@templates/InventoryTemplate/AttributeTable';
import StoneTable from '@templates/InventoryTemplate/StoneTable';
import InventoryEditModal, { InventoryEditModalSettings } from './InventoryEditModal';

export interface Props {
  title: string;
  loading: boolean;
  tableData: InventoryTableData;
  userId: string | null | undefined;
  swrKey: string;
}

export default function InventoryTemplate(props: Props): ReactElement {
  const [editModalSettings, setEditModalSettings] = useState<InventoryEditModalSettings>({
    show: false,
    id: null,
    userId: null,
    amount: 0,
  });

  const { session } = useSession();

  return (
    <Layout
      title={props.title}
      hideHeader={props.loading}
      headerChildren={
        session?.user.isAdmin || session?.member?.role === Role.CAPTAIN ? (
          <Button
            label="Edit inventory"
            icon={PencilIcon}
            onClick={() =>
              setEditModalSettings({
                show: true,
                id: null,
                userId: props.userId ?? null,
                amount: null,
              })
            }
          />
        ) : undefined
      }
    >
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <ReactTooltip id="inventoryToolTip" place="right" effect="solid" />
          <div className={cx('space-y-20')}>
            {props.tableData.stones.map((table, index) => (
              <StoneTable key={index} setEditModalSettings={setEditModalSettings} {...table} />
            ))}
            {props.tableData.attributes.map((table, index) => (
              <AttributeTable key={index} setEditModalSettings={setEditModalSettings} {...table} />
            ))}
          </div>
          <InventoryEditModal
            settings={editModalSettings}
            setSettings={setEditModalSettings}
            swrKey={props.swrKey}
          />
        </>
      )}
    </Layout>
  );
}
