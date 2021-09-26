/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function flush(prisma: PrismaClient): Promise<void> {
  console.log('Flushing db...');
  await prisma.user.deleteMany({});
  await prisma.team.deleteMany({});
}

flush(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
