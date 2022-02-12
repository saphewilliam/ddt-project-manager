import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export interface Props {
  name: string;
  href: string;
}

function ListPageCard(props: Props): ReactElement {
  return (
    <li>
      <Link href={props.href}>
        <a
          className={cx(
            'block',
            'border-solid',
            'border',
            'rounded-xl',
            'shadow-lg',
            'hover:shadow-xl',
            'transition-all',
            'border-gray-900/20',
            'hover:border-gray-900/10',
            'p-6',
          )}
        >
          <span className={cx('text-2xl', 'font-bold', 'mb-0')}>{props.name}</span>
          <li className={cx('flex', 'mt-0')}>
            <span>123456 stenen</span>
          </li>
        </a>
      </Link>
    </li>
  );
}

export default function ListsPage(): ReactElement {
  const { data } = useSafeQuery('useStoneListUsers', {});

  return (
    <Layout title="Lists">
      <ul className={cx('grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
        <ListPageCard href="/lists/all" name="All" />
        {data?.stoneListUsers.map((user) => (
          <ListPageCard
            key={user.id}
            href={`/lists/${user.slug}`}
            name={`${user.firstName} ${user.lastName}`}
          />
        ))}
      </ul>
    </Layout>
  );
}
