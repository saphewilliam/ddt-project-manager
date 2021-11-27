import { CalendarIcon, ChartBarIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Button, { ButtonType } from '@components/Button';
import Layout from '@components/Layout';
import useSafeQuery from '@hooks/useSafeQuery';

export default function EventsPage(): ReactElement {
  const { data } = useSafeQuery('useGetEvents', {});

  return (
    <Layout title="Events">
      <ul className={cx('grid', 'md:gap-4', 'md:grid-cols-2', 'lg:grid-cols-3')}>
        {data?.events.map((event) => (
          <li
            className={cx(
              'flex',
              'items-start',
              'flex-col',
              'border-solid',
              'border-4',
              'border-secondary-dark',
              'p-4',
              'mb-5',
            )}
            key={event.id}
          >
            <div className={cx('relative', 'w-full', 'h-48')}>
              <Image
                src="/img/login_bg.jpg"
                layout="fill"
                alt="Naam van het event"
                objectFit="cover"
              />
            </div>
            <div className={cx('event-card-inner', 'py-4', 'flex', 'flex-col', 'items-start')}>
              <h2 className={cx('text-3xl', 'pb-2')}>{event.name}</h2>
              <div className={cx('event-card-meta', 'pt-2', 'pb-4', 'flex', 'items-center')}>
                <ul>
                  <li className={cx('flex', 'mb-1')}>
                    <ChartBarIcon className={cx('w-5', 'mr-1')} />
                    <span className={cx('font-semibold')}>123456 stenen</span>
                  </li>
                  <li className={cx('flex')}>
                    <CalendarIcon className={cx('w-5', 'mr-1')} />
                    <span className={cx('font-semibold')}>
                      {new Date(event.date).toLocaleDateString('nl')}
                    </span>
                  </li>
                </ul>
              </div>
              <Button
                type={ButtonType.SECONDARY}
                label={event.name}
                href={`/events/${event.slug}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
