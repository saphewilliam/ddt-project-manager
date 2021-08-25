/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import seedTeams from './Team/seed';
import seedUsers from './User/seed';
import seedMembers from './Member/seed';
import seedSessions from './Session/seed';

export async function flush(prisma: PrismaClient): Promise<void> {
  console.log('Flushing db...');
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});
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
}
