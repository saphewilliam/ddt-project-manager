import { PrismaClient } from '@prisma/client';

export default async function seedTeams(prisma: PrismaClient): Promise<void> {
  await prisma.team.createMany({
    data: [
      {
        id: '068eec80-9864-4e07-a0ba-e1a4cbb3902d',
        name: 'Dutch Domino Team',
        acronym: 'DDT',
      },
      {
        id: '0a6b4595-9031-4f97-87c3-652c06d11269',
        name: "William's Team",
      },
    ],
  });
}
