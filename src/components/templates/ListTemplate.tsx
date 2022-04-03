import cx from 'clsx';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import StoneList from '@components/StoneList';
import { StoneListTableData } from '@lib/stoneListHelpers';

export interface Props {
  title: string;
  loading: boolean;
  data: StoneListTableData;
  swrKey: string;
}

export default function ListTemplate(props: Props): ReactElement {
  return (
    <Layout title={props.title} hideHeader={props.loading}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <ReactTooltip id="stoneListToolTip" place="right" effect="solid" />
          <div className={cx('space-y-20')}>
            {props.data.map((table, index) => (
              <StoneList key={index} title={table.title} rows={table.rows} swrKey={props.swrKey} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
