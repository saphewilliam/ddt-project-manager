import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { generateSlug } from '@lib/util';

export default async function seedEvents(prisma: PrismaClient): Promise<void> {
  await prisma.event.createMany({
    data: [
      {
        id: idMap.events.WDC_2021,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'WDC 2021',
        slug: generateSlug('WDC 2021'),
        date: '2021-08-01T00:00:00.000Z',
        img: '/img/events/wdc_2021.jpg',
      },
      {
        id: idMap.events.DDT_2019,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'DDT 2019',
        slug: generateSlug('DDT 2019'),
        date: '2019-08-25T00:00:00.000Z',
        img: '/img/events/ddt_2019.jpg',
      },
      {
        id: idMap.events.VEXX,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'VEXX',
        slug: generateSlug('VEXX'),
        date: '2020-08-07T00:00:00.000Z',
        img: '/img/events/vexx.jpg',
      },
      {
        id: idMap.events.DDT_10_YEARS,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: '10 Years DDT',
        slug: generateSlug('10 Years DDT'),
        date: '2020-08-14T00:00:00.000Z',
        img: '/img/events/10_years_ddt.jpg',
      },
      {
        id: idMap.events.WDC_2022,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'WDC 2022',
        slug: generateSlug('WDC 2022'),
        date: '2022-08-19T00:00:00.000Z',
        img: '/img/events/wdc_2022.jpg',
      },
    ],
  });
}
