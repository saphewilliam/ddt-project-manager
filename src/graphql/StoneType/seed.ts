import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';

export default async function seedStoneTypes(prisma: PrismaClient): Promise<void> {
  await prisma.stoneType.createMany({
    data: [
      {
        id: ids.stoneTypes.LAMPING,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Lamping Dominoes',
        description: 'Dominoes by the German supplier: "Maria Lamping"',
        order: 0,
      },
      {
        id: ids.stoneTypes.DON_DOMINO,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'DonDomino Dominoes',
        description: 'Dominoes by the Belgian supplier: "DonDomino"',
        order: 1,
      },
      {
        id: ids.stoneTypes.BULK,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Bulk Dominoes',
        description: 'Dominoes by the American supplier: "Bulk Dominoes"',
        order: 2,
      },
      {
        id: ids.stoneTypes.MR_DOMINO,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Mr Domino Dominoes',
        description: 'Dominoes that Robin Paul Weijers is still trying to sell',
        order: 3,
      },
      {
        id: ids.stoneTypes.DOMINO_DAY,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Domino Day Dominoes',
        description: 'Dominoes that were used in one of the Domino Day editions',
        order: 4,
      },
      {
        id: ids.stoneTypes.COLOR_CHANGING,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Color Changing Dominoes',
        description: 'Dominoes that are a different color after toppling than standing up',
        order: 5,
      },

      {
        id: ids.stoneTypes.OTHERS,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        name: 'Other Dominoes',
        description: 'All dominoes that are not in the aforementioned collections',
        order: 6,
      },
    ],
  });
}
