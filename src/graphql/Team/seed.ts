import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';

export default async function seedTeams(prisma: PrismaClient): Promise<void> {
  await prisma.team.createMany({
    data: [
      {
        id: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Dutch Domino Team',
      },
      {
        id: ids.teams.WILLIAM_FORD,
        name: "William's Team",
      },
      {
        id: ids.teams.BAS_VEENHOVEN,
        name: "Bas's Team",
      },
    ],
  });
}
