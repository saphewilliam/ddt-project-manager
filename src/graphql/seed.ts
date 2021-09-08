/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import seedEvents from './Event/seed';
import seedMembers from './Member/seed';
import seedSessions from './Session/seed';
import seedStones from './Stone/seed';
import seedStoneLists from './StoneList/seed';
import seedStoneTypes from './StoneType/seed';
import seedSubthemes from './Subtheme/seed';
import seedTeams from './Team/seed';
import seedUsers from './User/seed';

const prisma = new PrismaClient();

async function flush(prisma: PrismaClient): Promise<void> {
  console.log('Flushing db...');
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.event.deleteMany({});
}

async function seed(prisma: PrismaClient): Promise<void> {
  console.log('Seeding Teams...');
  await seedTeams(prisma);

  console.log('Seeding Users...');
  await seedUsers(prisma);

  console.log('Seeding Sessions...');
  await seedSessions(prisma);

  console.log('Seeding Members...');
  await seedMembers(prisma);

  console.log('Seeding StoneTypes...');
  await seedStoneTypes(prisma);

  console.log('Seeding Stones...');
  await seedStones(prisma);

  console.log('Seeding StoneLists...');
  await seedStoneLists(prisma);

  console.log('Seeding Events...');
  await seedEvents(prisma);

  console.log('Seeding Subthemes...');
  await seedSubthemes(prisma);
}

async function main(): Promise<void> {
  await flush(prisma);
  await seed(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
