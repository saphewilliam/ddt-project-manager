import cx from 'clsx';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import { InventoryTableData } from '@lib/inventoryHelpers';
import AttributeTable from '@templates/InventoryTemplate/AttributeTable';
import StoneTable from '@templates/InventoryTemplate/StoneTable';

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
          <ReactTooltip id="inventoryToolTip" place="right" effect="solid" />
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
