import { PlusSmIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Button from '@components/Button';
import Layout from '@components/Layout';
import SubthemeTable from '@components/SubthemeTable';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function EventPage(): ReactElement {
  const router = useRouter();

  const { data } = useSafeQuery('useEvent', {
    eventSlug: extractURLParam('eventSlug', router.query) ?? '',
  });

  return (
    <Layout title="Event">
      <div className={cx('grid', 'md:grid-cols-2', 'gap-4', 'sm:grid-cols-none')}>
        <section
          className={cx(
            'flex',
            'justify-between',
            'col-span-2',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <h1 className={cx('font-bold', 'text-4xl')}>Projecten van {data?.event?.name} </h1>
          <span className={cx()}>
            <Button
              className={cx('flex')}
              icon={PlusSmIcon}
              label="Nieuw project"
              href="/"
            ></Button>
          </span>
        </section>

        <section
          className={cx(
            'col-span-2',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <div>
            {data?.event?.subthemes.map((subtheme) => (
              <SubthemeTable subtheme={subtheme} key={subtheme.id} />
            ))}
          </div>
        </section>

        <section
          className={cx(
            'col-span-2',
            'lg:col-span-1',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <div>
            <p>Lijnen</p>
          </div>
        </section>
        <section
          className={cx(
            'col-span-2',
            'lg:col-span-1',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <div>
            <p>Totaal attributen</p>
          </div>
        </section>

        <section
          className={cx(
            'col-span-2',
            'lg:col-span-1',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <div>
            <p>[lijnenlijst]</p>
          </div>
        </section>
        <section
          className={cx(
            'col-span-2',
            'lg:col-span-1',
            'border-solid',
            'border',
            'rounded-xl',
            'transition-all',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <div>
            <p>[attributenlijst]</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
