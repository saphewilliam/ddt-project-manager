import { PrismaClient, Role } from '@prisma/client';
import { ids } from '@graphql/ids';

export default async function seedMembers(prisma: PrismaClient): Promise<void> {
  await prisma.member.createMany({
    data: [
      {
        userId: ids.users.DDT_ADMIN,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: ids.users.WILLIAM_FORD,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        role: Role.GUEST,
      },
      {
        userId: ids.users.WILLIAM_FORD,
        teamId: ids.teams.WILLIAM_FORD,
        role: Role.CAPTAIN,
      },
      {
        userId: ids.users.BAS_VEENHOVEN,
        teamId: ids.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: ids.users.BAS_VEENHOVEN,
        teamId: ids.teams.BAS_VEENHOVEN,
        role: Role.CAPTAIN,
      },
    ],
  });
}
