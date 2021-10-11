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
  revalidate: () => Promise<boolean>;
}

export default function ListTemplate(props: Props): ReactElement {
  return (
    <Layout title={props.loading ? props.title : undefined}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <ReactTooltip id="stoneListToolTip" place="right" effect="solid" />

          {props.data.map((table, index) => (
            <StoneList
              key={index}
              title={table.title}
              rows={table.rows}
              revalidate={props.revalidate}
            />
          ))}
        </>
      )}
    </Layout>
  );
}