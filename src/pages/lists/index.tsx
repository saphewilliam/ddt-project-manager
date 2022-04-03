import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement, useMemo } from 'react';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import useSafeQuery from '@hooks/useSafeQuery';
import { formatNumber } from '@lib/stoneListHelpers';

export interface Props {
  name: string;
  href: string;
  amount: number;
}

function ListPageCard(props: Props): ReactElement {
  return (
    <li>
      <Link href={props.href}>
        <a className={cx('block')}>
          <Card hoverable>
            <span className={cx('text-2xl', 'font-bold', 'mb-0')}>{props.name}</span>
            <li className={cx('flex', 'mt-0', 'text-gray-500')}>
              <span>{formatNumber(props.amount)} stones</span>
            </li>
          </Card>
        </a>
      </Link>
    </li>
  );
}

export default function ListsPage(): ReactElement {
  const { data } = useSafeQuery('useStoneListUsers', {});

  const allTotal: number = useMemo(
    () => data?.stoneListUsers.reduce((carr, curr) => carr + curr.stoneAmount, 0) ?? 0,
    [data],
  );

  return (
    <Layout title="Lists">
      {data ? (
        <ul className={cx('grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
          <ListPageCard href="/lists/all" name="All" amount={allTotal} />
          {data.stoneListUsers.map((user) => (
            <ListPageCard
              key={user.id}
              href={`/lists/${user.slug}`}
              name={`${user.firstName} ${user.lastName}`}
              amount={user.stoneAmount}
            />
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
