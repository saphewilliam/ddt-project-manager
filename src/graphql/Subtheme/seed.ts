import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { generateSlug } from '@lib/util';

export default async function seedSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.subtheme.createMany({
    data: [
      {
        id: idMap.events.WDC_2021.INTRODUCTION.id,
        name: 'Introduction',
        slug: generateSlug('Introduction'),
        color: '#BF5C22',
        eventId: idMap.events.WDC_2021.id,
        order: 0,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.id,
        name: 'Peter Pan',
        slug: generateSlug('Peter Pan'),
        color: '#488D40',
        eventId: idMap.events.WDC_2021.id,
        order: 1,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        name: "The Emperor's New Clothes",
        slug: generateSlug("The Emperor's New Clothes"),
        color: '#B80C00',
        eventId: idMap.events.WDC_2021.id,
        order: 2,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        name: 'Beauty and the Beast',
        slug: generateSlug('Beauty and the Beast'),
        color: '#9B1CBA',
        eventId: idMap.events.WDC_2021.id,
        order: 3,
      },
      {
        id: idMap.events.VEXX.PROJECT.id,
        name: 'Project',
        slug: generateSlug('Project'),
        color: '#40FFBF',
        eventId: idMap.events.VEXX.id,
        order: 0,
      },
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.id,
        name: 'Project',
        slug: generateSlug('Project'),
        color: '#FF9E54',
        eventId: idMap.events.DDT_10_YEARS.id,
        order: 0,
      },
      {
        id: idMap.events.DDT_2019.DISCOVERY.id,
        name: 'Discovery',
        slug: generateSlug('Discovery'),
        color: '#66CEEE',
        eventId: idMap.events.DDT_2019.id,
        order: 0,
      },
      {
        id: idMap.events.DDT_2019.FAME.id,
        name: 'Fame',
        slug: generateSlug('Fame'),
        color: '#E33782',
        eventId: idMap.events.DDT_2019.id,
        order: 1,
      },
      {
        id: idMap.events.DDT_2019.DOWNFALL.id,
        name: 'Downfall',
        slug: generateSlug('Downfall'),
        color: '#0A0E1F',
        eventId: idMap.events.DDT_2019.id,
        order: 2,
      },
      {
        id: idMap.events.DDT_2019.RECOVERY.id,
        name: 'Recovery',
        slug: generateSlug('Recovery'),
        color: '#FAC31D',
        eventId: idMap.events.DDT_2019.id,
        order: 3,
      },
      {
        id: idMap.events.DDT_2019.PAYOFF.id,
        name: 'Payoff',
        slug: generateSlug('Payoff'),
        color: '#188B1C',
        eventId: idMap.events.DDT_2019.id,
        order: 4,
      },
    ],
  });
}
