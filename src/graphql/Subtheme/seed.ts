import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';
import { generateSlug } from '@lib/util';

export default async function seedSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.subtheme.createMany({
    data: [
      {
        id: ids.subthemes.INTRODUCTION,
        name: 'Introduction',
        slug: generateSlug('Introduction'),
        color: '#BF5C22',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 0,
      },
      {
        id: ids.subthemes.PETER_PAN,
        name: 'Peter Pan',
        slug: generateSlug('Peter Pan'),
        color: '#488D40',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 1,
      },
      {
        id: ids.subthemes.EMPERORS_NEW_CLOTHES,
        name: "The Emperor's New Clothes",
        slug: generateSlug("The Emperor's New Clothes"),
        color: '#B80C00',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 2,
      },
      {
        id: ids.subthemes.BEAUTY_AND_THE_BEAST,
        name: 'Beauty and the Beast',
        slug: generateSlug('Beauty and the Beast'),
        color: '#9B1CBA',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 3,
      },
      {
        id: ids.subthemes.DISCOVERY,
        name: 'Discovery',
        slug: generateSlug('Discovery'),
        color: '#66CEEE',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 0,
      },
      {
        id: ids.subthemes.FAME,
        name: 'Fame',
        slug: generateSlug('Fame'),
        color: '#E33782',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 1,
      },
      {
        id: ids.subthemes.DOWNFALL,
        name: 'Downfall',
        slug: generateSlug('Downfall'),
        color: '#0A0E1F',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 2,
      },
      {
        id: ids.subthemes.RECOVERY,
        name: 'Recovery',
        slug: generateSlug('Recovery'),
        color: '#FAC31D',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 3,
      },
      {
        id: ids.subthemes.PAYOFF,
        name: 'Payoff',
        slug: generateSlug('Payoff'),
        color: '#188B1C',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 4,
      },
    ],
  });
}
