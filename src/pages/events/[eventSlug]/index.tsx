import { PlusSmIcon } from '@heroicons/react/outline';
import useSafeQuery from '@hooks/useSafeQuery';
import cx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import ReactTooltip from 'react-tooltip';
import Button from '@components/Button';
import Card from '@components/Card';
import Layout from '@components/Layout';
import Loading from '@components/Loading';
import SubthemeTable from '@components/SubthemeTable';
import { extractURLParam } from '@lib/util';
import ProjectAttributeTable from '@templates/InventoryTemplate/ProjectAttributeTable';
import ProjectStoneTable from '@templates/InventoryTemplate/ProjectStoneTable';

export default function EventPage(): ReactElement {
  const router = useRouter();

  const eventSlug = extractURLParam('eventSlug', router.query);

  const { data } = useSafeQuery('useEvent', { eventSlug: eventSlug ?? '' }, eventSlug);

  return (
    <Layout
      title={data?.event?.name ?? 'Event'}
      hideHeader={!data}
      headerChildren={
        <Button className={cx('flex')} icon={PlusSmIcon} label="New project" href="/" />
      }
    >
      {!data ? (
        <Loading />
      ) : (
        <div className={cx('grid', 'md:grid-cols-2', 'gap-7', 'sm:grid-cols-none')}>
          <Card className={cx('col-span-2')} title="Projects">
            <div className={cx('w-full')}>
              {data.event?.subthemes.map((subtheme) => (
                <SubthemeTable subtheme={subtheme} eventSlug={eventSlug ?? ''} key={subtheme.id} />
              ))}
            </div>
          </Card>

          <ReactTooltip id="inventoryToolTip" place="right" effect="solid" />

          <Card className={cx('col-span-2', 'lg:col-span-1')} title="Lines">
            <div className={cx('space-y-12', 'w-full')}>
              {data.event?.subthemes.map(
                (subtheme) =>
                  subtheme.stones.length > 0 && (
                    <ProjectStoneTable
                      title={subtheme.name}
                      rows={subtheme.stones}
                      key={subtheme.id}
                    />
                  ),
              )}
            </div>
          </Card>

          <Card className={cx('col-span-2', 'lg:col-span-1')} title="Attributes">
            <ProjectAttributeTable rows={data.event?.attributes ?? []} />
          </Card>
        </div>
      )}
    </Layout>
  );
}
