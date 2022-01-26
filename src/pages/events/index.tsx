import { CalendarIcon, ChartBarIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export default function EventsPage(): ReactElement {
  const { data } = useSafeQuery('useEvents', {});

  return (
    <Layout title="Events">
      <ul className={cx('grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
        {data?.events.map((event) => (
          <li
            className={cx(
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
            key={event.id}
          >
            <Link href={`/events/${event.slug}`}>
              <a className={cx('block', 'space-y-5')}>
                <div className={cx('relative', 'h-48', 'rounded-md', 'overflow-hidden')}>
                  <Image src={event.img} layout="fill" alt="Naam van het event" objectFit="cover" />
                </div>
                <div className={cx('space-y-2')}>
                  <h2 className={cx('text-2xl', 'font-bold')}>{event.name}</h2>
                  <ul className={cx('text-gray-700')}>
                    <li className={cx('flex')}>
                      <ChartBarIcon className={cx('w-5', 'mr-1')} />
                      <span>123456 stenen</span>
                    </li>
                    <li className={cx('flex')}>
                      <CalendarIcon className={cx('w-5', 'mr-1')} />
                      <span>{new Date(event.date).toLocaleDateString('nl')}</span>
                    </li>
                  </ul>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
