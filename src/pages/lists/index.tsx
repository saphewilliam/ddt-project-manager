import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export default function ListsPage(): ReactElement {
  const { data } = useSafeQuery('useGetStoneListUsers', {});

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Lists</h1>
      <ul>
        <li key={0}>
          <Link href={`/lists/all`}>
            <a>All</a>
          </Link>
        </li>
        {data?.stoneListUsers.map((user) => (
          <li key={user.id}>
            <Link href={`/lists/${user.slug}`}>
              <a>
                {user.firstName} {user.lastName}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
