import { PrismaClient } from '@prisma/client';

export default async function seedSessions(prisma: PrismaClient): Promise<void> {
  await prisma.session.createMany({
    data: [
      {
        // DDT Admin - DDT - permanent
        expiresAt: null,
        token: '99584a51d94805e65b3f51ff36e614d5f8acb9e07e65911c9e98ffd1c2d2a948',
        userId: '4ffded20-d5f8-41b4-ae5b-60fa8445cc1e',
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
      },
    ],
  });
}
