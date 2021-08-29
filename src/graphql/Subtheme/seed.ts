import { PrismaClient } from '@prisma/client';

export default async function seedSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.subtheme.createMany({
    data: [
      {
        // id: '',
        name: 'Peter Pan',
        color: '',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 0,
      },
      {
        // id: '',
        name: "The Emperor's New Clothes",
        color: '',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 1,
      },
      {
        // id: '',
        name: 'Beauty and the Beast',
        color: '',
        eventId: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        order: 2,
      },
      {
        name: 'Discovery',
        color: '',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 0,
      },
      {
        name: 'Gaining fame',
        color: '',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 1,
      },
      {
        name: 'Downfall',
        color: '',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 2,
      },
      {
        name: 'Recovery',
        color: '',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 3,
      },
      {
        name: 'Payoff',
        color: '',
        eventId: '7794c798-60e5-466f-8332-0853cbb41c1f',
        order: 4,
      },
    ],
  });
}
