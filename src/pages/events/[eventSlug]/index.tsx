import { PlusSmIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Button from '@components/Button';
import Layout from '@components/Layout';
import StonesOnSubthemeTable from '@components/StonesOnSubthemeTable';
import SubthemeTable from '@components/SubthemeTable';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function EventPage(): ReactElement {
  const router = useRouter();

  const eventSlug = extractURLParam('eventSlug', router.query);

  const { data } = useSafeQuery('useEvent', { eventSlug: eventSlug ?? '' }, eventSlug);

  return (
    <Layout title="Event" hideHeader>
      <div className={cx('grid', 'md:grid-cols-2', 'gap-4', 'sm:grid-cols-none')}>
        <section
          className={cx(
            'flex',
            'justify-between',
            'col-span-2',

            'rounded-xl',
            'transition-all',
            'border-solid',
            'border',
            'border-gray-900/20',
            'p-6',
          )}
        >
          <h2 className={cx('font-bold', 'text-3xl')}>Projects in {data?.event?.name} </h2>
          <span className={cx()}>
            <Button className={cx('flex')} icon={PlusSmIcon} label="New project" href="/"></Button>
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
              <SubthemeTable subtheme={subtheme} eventSlug={eventSlug ?? ''} key={subtheme.id} />
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
            <p className={cx('text-2xl', 'font-semibold	')}>Lines</p>
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
            <p className={cx('text-2xl', 'font-semibold	')}>Total attributes</p>
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
          <div className={cx('space-y-6')}>
            {data?.event?.subthemes.map(
              (subtheme) =>
                subtheme.stones.length > 0 && (
                  <StonesOnSubthemeTable subtheme={subtheme} key={subtheme.id} />
                ),
            )}
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
          <table className={cx('table-auto', 'w-full')}>
            <tbody>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Muizenvallen</td>
                <td>7</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Muurhaakjes</td>
                <td>7</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Diodes/Vlakstarterhouders</td>
                <td>100</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Vlakstarters (8 stones)</td>
                <td>3</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Vlakstarters (10 stones)</td>
                <td>9</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Vlakstarters (11 stones)</td>
                <td>37</td>
              </tr>
              <tr className={cx('border-b-0', 'border-gray-300', 'px-4', 'py-2')}>
                <td>Vlakstarters (12 stones)</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
