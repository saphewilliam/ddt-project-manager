/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import seedEvents from './Event/seed';
import seedMembers from './Member/seed';
import seedSessions from './Session/seed';
import seedSubthemes from './Subtheme/seed';
import seedTeams from './Team/seed';
import seedUsers from './User/seed';

export async function flush(prisma: PrismaClient): Promise<void> {
  console.log('Flushing db...');
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.event.deleteMany({});
}

export async function seed(prisma: PrismaClient): Promise<void> {
  console.log('Seeding Teams...');
  await seedTeams(prisma);
  console.log('Seeding Users...');
  await seedUsers(prisma);
  console.log('Seeding Members...');
  await seedMembers(prisma);
  console.log('Seeding Sessions...');
  await seedSessions(prisma);
  console.log('Seeding Events...');
  await seedEvents(prisma);
  console.log('Seeding Subthemes...');
  await seedSubthemes(prisma);
}
