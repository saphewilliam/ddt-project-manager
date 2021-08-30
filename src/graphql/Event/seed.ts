import { PrismaClient } from '@prisma/client';

export default async function seedEvents(prisma: PrismaClient): Promise<void> {
  await prisma.event.createMany({
    data: [
      {
        id: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        name: 'WDC 2021',
        slug: 'wdc-2021',
        date: '2021-08-01T00:00:00.000Z',
      },
      {
        id: '7794c798-60e5-466f-8332-0853cbb41c1f',
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        name: 'DDT 2019',
        slug: 'ddt-2019',
        date: '2019-08-25T00:00:00.000Z',
      },
      {
        id: '7b72e813-7aed-49ae-9d92-93c6f3797583',
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        name: 'VEXX',
        slug: 'vexx',
        date: '2020-08-07T00:00:00.000Z',
      },
    ],
  });
}
