import { PrismaClient } from '@prisma/client';
import seedTeams from './Team/seed';
import seedUsers from './User/seed';
import seedMembers from './Member/seed';

export async function flush(prisma: PrismaClient): Promise<void> {
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});
}

export async function seed(prisma: PrismaClient): Promise<void> {
  await seedTeams(prisma);
  await seedUsers(prisma);
  await seedMembers(prisma);
}
