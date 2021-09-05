import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedTeams(prisma: PrismaClient): Promise<void> {
  await prisma.team.createMany({
    data: [
      {
        id: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Dutch Domino Team',
      },
      {
        id: idMap.teams.WILLIAM_FORD,
        name: "William's Team",
      },
      {
        id: idMap.teams.BAS_VEENHOVEN,
        name: "Bas's Team",
      },
    ],
  });
}
