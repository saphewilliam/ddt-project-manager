import cx from 'clsx';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import AttributeTable from '@components/templates/InventoryTemplate/AttributeTable';
import StoneTable from '@components/templates/InventoryTemplate/StoneTable';
import { InventoryTableData } from '@lib/inventoryHelpers';

export interface Props {
  title: string;
  loading: boolean;
  tableData: InventoryTableData;
  swrKey: string;
}

export default function InventoryTemplate(props: Props): ReactElement {
  return (
    <Layout title={props.title} hideHeader={props.loading}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <ReactTooltip id="stoneListToolTip" place="right" effect="solid" />
          <div className={cx('space-y-20')}>
            {props.tableData.stones.map((table, index) => (
              <StoneTable key={index} title={table.title} rows={table.rows} swrKey={props.swrKey} />
            ))}
            {props.tableData.attributes.map((table, index) => (
              <AttributeTable
                key={index}
                title={table.title}
                rows={table.rows}
                swrKey={props.swrKey}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
