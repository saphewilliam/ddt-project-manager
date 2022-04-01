import { PlusSmIcon } from '@heroicons/react/outline';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Button from '@components/Button';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import ProjectStoneList from '@components/StoneList/ProjectStoneList';
import SubthemeTable from '@components/SubthemeTable';
import useSafeQuery from '@hooks/useSafeQuery';
import { extractURLParam } from '@lib/util';

export default function EventPage(): ReactElement {
  const router = useRouter();

  const eventSlug = extractURLParam('eventSlug', router.query);

  const { data, isValidating } = useSafeQuery(
    'useEvent',
    { eventSlug: eventSlug ?? '' },
    eventSlug,
  );

  return (
    <Layout
      title={data?.event?.name ?? 'Event'}
      hideHeader={isValidating}
      headerChildren={
        <Button className={cx('flex')} icon={PlusSmIcon} label="New project" href="/" />
      }
    >
      {isValidating ? (
        <Loading />
      ) : (
        <div className={cx('grid', 'md:grid-cols-2', 'gap-7', 'sm:grid-cols-none')}>
          <Card className={cx('col-span-2')} title="Projects">
            <div className={cx('w-full')}>
              {data?.event?.subthemes.map((subtheme) => (
                <SubthemeTable subtheme={subtheme} eventSlug={eventSlug ?? ''} key={subtheme.id} />
              ))}
            </div>
          </Card>

          <ReactTooltip id="stoneListToolTip" place="right" effect="solid" />
          <Card className={cx('col-span-2', 'lg:col-span-1')} title="Lines">
            <div className={cx('space-y-12', 'w-full')}>
              {data?.event?.subthemes.map(
                (subtheme) =>
                  subtheme.stones.length > 0 && (
                    <ProjectStoneList
                      title={subtheme.name}
                      rows={subtheme.stones}
                      key={subtheme.id}
                    />
                  ),
              )}
            </div>
          </Card>

          <Card className={cx('col-span-2', 'lg:col-span-1')} title="Attributes">
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
          </Card>
        </div>
      )}
    </Layout>
  );
}
