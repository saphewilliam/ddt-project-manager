import { PrismaClient, Role } from '@prisma/client';

export default async function seedMembers(prisma: PrismaClient): Promise<void> {
  await prisma.member.createMany({
    data: [
      {
        // DDTAdmin - DDT
        role: Role.CAPTAIN,
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        userId: '4ffded20-d5f8-41b4-ae5b-60fa8445cc1e',
      },
      {
        // William - DDT
        role: Role.GUEST,
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        userId: '80c03794-073c-4ca2-a9de-e0c12f569c2f',
      },
      {
        // William - Team
        role: Role.CAPTAIN,
        teamId: '0a6b4595-9031-4f97-87c3-652c06d11269',
        userId: '80c03794-073c-4ca2-a9de-e0c12f569c2f',
      },
      {
        // Bas - DDT
        role: Role.BUILDER,
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        userId: '8aa6b936-9a98-41d7-9752-0fef6ca7b51a',
      },
      {
        // Bas - Team
        role: Role.CAPTAIN,
        teamId: '0d39db0a-600f-4f1c-a6b2-3ea2c9354ac8',
        userId: '8aa6b936-9a98-41d7-9752-0fef6ca7b51a',
      },
    ],
  });
}
