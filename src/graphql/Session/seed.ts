import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';

export default async function seedSessions(prisma: PrismaClient): Promise<void> {
  await prisma.session.createMany({
    data: [
      {
        userId: ids.users.DDT_ADMIN,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        token: '99584a51d94805e65b3f51ff36e614d5f8acb9e07e65911c9e98ffd1c2d2a948',
      },
    ],
  });
}
