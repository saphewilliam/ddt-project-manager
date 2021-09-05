import { PrismaClient } from '@prisma/client';
import { flush, seed } from '@graphql/seed';

const prisma = new PrismaClient();

async function main() {
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
