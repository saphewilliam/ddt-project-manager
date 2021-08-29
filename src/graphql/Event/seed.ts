import { PrismaClient } from '@prisma/client';

export default async function seedEvents(prisma: PrismaClient): Promise<void> {
  await prisma.event.createMany({
    data: [
      {
        id: '87db2cfc-d4a9-406f-91ce-b73c1ee58c49',
        name: 'WDC 2021',
        slug: 'wdc-2021',
        date: '',
      },
      {
        id: '7794c798-60e5-466f-8332-0853cbb41c1f',
        name: 'DDT 2019',
        slug: 'ddt-2019',
        date: '',
      },
    ],
  });
}
