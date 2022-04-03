import { CalendarIcon, ChartBarIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Card from '@components/Card';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';
import { formatNumber } from '@lib/stoneListHelpers';
import { formatDate } from '@lib/util';

export default function EventsPage(): ReactElement {
  const { data } = useSafeQuery('useEvents', {});

  return (
    <Layout title="Events">
      <ul className={cx('grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
        {data?.events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.slug}`}>
              <a className={cx('block')}>
                <Card hoverable className={'space-y-5'}>
                  <div className={cx('relative', 'h-48', 'rounded-md', 'overflow-hidden')}>
                    <Image src={event.img} layout="fill" alt={event.name} objectFit="cover" />
                  </div>
                  <div className={cx('space-y-2')}>
                    <h2 className={cx('text-2xl', 'font-bold')}>{event.name}</h2>
                    <ul className={cx('text-gray-700')}>
                      <li className={cx('flex')}>
                        <ChartBarIcon className={cx('w-5', 'mr-1')} />
                        <span>{formatNumber(event.stoneAmount)} stones</span>
                      </li>
                      <li className={cx('flex')}>
                        <CalendarIcon className={cx('w-5', 'mr-1')} />
                        <span>{formatDate(new Date(event.date))}</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
