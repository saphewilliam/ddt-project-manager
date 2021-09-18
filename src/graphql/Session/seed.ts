import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedSessions(prisma: PrismaClient): Promise<void> {
  await prisma.session.createMany({
    data: [
      {
        userId: idMap.users.DDT_ADMIN,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        token: 'SrWVCfS29TZ6a4gsSFL8ZDVQdGAN2ygHDfno4IBUJCVcejC-fYbmXgthv_F3LvrV',
      },
    ],
  });
}
