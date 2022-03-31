import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { generateSlug } from '@lib/util';

export default async function seedSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.subtheme.createMany({
    data: [
      {
        id: idMap.subthemes.INTRODUCTION,
        name: 'Introduction',
        slug: generateSlug('Introduction'),
        color: '#BF5C22',
        eventId: idMap.events.WDC_2021,
        order: 0,
      },
      {
        id: idMap.subthemes.PETER_PAN,
        name: 'Peter Pan',
        slug: generateSlug('Peter Pan'),
        color: '#488D40',
        eventId: idMap.events.WDC_2021,
        order: 1,
      },
      {
        id: idMap.subthemes.EMPERORS_NEW_CLOTHES,
        name: "The Emperor's New Clothes",
        slug: generateSlug("The Emperor's New Clothes"),
        color: '#B80C00',
        eventId: idMap.events.WDC_2021,
        order: 2,
      },
      {
        id: idMap.subthemes.BEAUTY_AND_THE_BEAST,
        name: 'Beauty and the Beast',
        slug: generateSlug('Beauty and the Beast'),
        color: '#9B1CBA',
        eventId: idMap.events.WDC_2021,
        order: 3,
      },
      {
        id: idMap.subthemes.VEXX_PROJECT,
        name: 'Project',
        slug: generateSlug('Project'),
        color: '#40FFBF',
        eventId: idMap.events.VEXX,
        order: 0,
      },
      {
        id: idMap.subthemes.DDT_10_YEARS_PROJECT,
        name: 'Project',
        slug: generateSlug('Project'),
        color: '#FF9E54',
        eventId: idMap.events.DDT_10_YEARS,
        order: 0,
      },
      {
        id: idMap.subthemes.DISCOVERY,
        name: 'Discovery',
        slug: generateSlug('Discovery'),
        color: '#66CEEE',
        eventId: idMap.events.DDT_2019,
        order: 0,
      },
      {
        id: idMap.subthemes.FAME,
        name: 'Fame',
        slug: generateSlug('Fame'),
        color: '#E33782',
        eventId: idMap.events.DDT_2019,
        order: 1,
      },
      {
        id: idMap.subthemes.DOWNFALL,
        name: 'Downfall',
        slug: generateSlug('Downfall'),
        color: '#0A0E1F',
        eventId: idMap.events.DDT_2019,
        order: 2,
      },
      {
        id: idMap.subthemes.RECOVERY,
        name: 'Recovery',
        slug: generateSlug('Recovery'),
        color: '#FAC31D',
        eventId: idMap.events.DDT_2019,
        order: 3,
      },
      {
        id: idMap.subthemes.PAYOFF,
        name: 'Payoff',
        slug: generateSlug('Payoff'),
        color: '#188B1C',
        eventId: idMap.events.DDT_2019,
        order: 4,
      },
    ],
  });
}
