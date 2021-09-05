import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStoneTypes(prisma: PrismaClient): Promise<void> {
  await prisma.stoneType.createMany({
    data: [
      {
        id: idMap.stoneTypes.LAMPING,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Lamping Dominoes',
        description: 'Dominoes by the German supplier: "Maria Lamping"',
        order: 0,
      },
      {
        id: idMap.stoneTypes.DON_DOMINO,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'DonDomino Dominoes',
        description: 'Dominoes by the Belgian supplier: "DonDomino"',
        order: 1,
      },
      {
        id: idMap.stoneTypes.BULK,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Bulk Dominoes',
        description: 'Dominoes by the American supplier: "Bulk Dominoes"',
        order: 2,
      },
      {
        id: idMap.stoneTypes.MR_DOMINO,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Mr Domino Dominoes',
        description: 'Dominoes that Robin Paul Weijers is still trying to sell',
        order: 3,
      },
      {
        id: idMap.stoneTypes.DOMINO_DAY,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Domino Day Dominoes',
        description: 'Dominoes that were used in one of the Domino Day editions',
        order: 4,
      },
      {
        id: idMap.stoneTypes.COLOR_CHANGING,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Color Changing Dominoes',
        description: 'Dominoes that are a different color after toppling than standing up',
        order: 5,
      },

      {
        id: idMap.stoneTypes.OTHERS,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Other Dominoes',
        description: 'All dominoes that are not in the aforementioned collections',
        order: 6,
      },
    ],
  });
}
