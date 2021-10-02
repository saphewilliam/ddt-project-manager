import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export default function EventsPage(): ReactElement {
  const { data } = useSafeQuery('useGetEvents', {});

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Events</h1>
      <ul>
        {data?.events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.slug}`}>
              <a>{event.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
