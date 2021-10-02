import cx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';
import Button, {ButtonType} from '@components/Button';

export default function EventsPage(): ReactElement {
  const { data } = useSafeQuery('useGetEvents', {});

  return (
    <Layout>
      <h1 className={cx('font-bold', 'text-4xl')}>Events</h1>
      <ul className={cx('grid', 'gap-4', 'grid-cols-3')}>
        {data?.events.map((event) => (
          <li className={cx('border-solid', 'border-4', 'border-secondary-dark', 'p-4')} key={event.id}>
            <Link href={`/events/${event.slug}`}>
              <a>{event.name}</a>
            </Link>
            <Button type={ButtonType.SECONDARY} label={event.name} href={`/events/${event.slug}`}/>
              
          </li>
        ))}
      </ul>
    </Layout>
  );
}
