import { PrismaClient, Role } from '@prisma/client';

export default async function seedMembers(prisma: PrismaClient): Promise<void> {
  await prisma.member.createMany({
    data: [
      {
        // William - DDT
        role: Role.CAPTAIN,
        teamId: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        userId: '80c03794-073c-4ca2-a9de-e0c12f569c2f',
      },
      {
        // William - Team
        role: Role.CAPTAIN,
        teamId: '0a6b4595-9031-4f97-87c3-652c06d11269',
        userId: '80c03794-073c-4ca2-a9de-e0c12f569c2f',
      },
    ],
  });
}
