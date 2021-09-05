import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';
import { generateSlug } from '@lib/util';

export default async function seedEvents(prisma: PrismaClient): Promise<void> {
  await prisma.event.createMany({
    data: [
      {
        id: ids.events.WDC_2021,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'WDC 2021',
        slug: generateSlug('WDC 2021'),
        date: '2021-08-01T00:00:00.000Z',
      },
      {
        id: ids.events.DDT_2019,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'DDT 2019',
        slug: generateSlug('DDT 2019'),
        date: '2019-08-25T00:00:00.000Z',
      },
      {
        id: ids.events.VEXX,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'VEXX',
        slug: generateSlug('VEXX'),
        date: '2020-08-07T00:00:00.000Z',
      },
    ],
  });
}
