import { PrismaClient, Role } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedMembers(prisma: PrismaClient): Promise<void> {
  await prisma.member.createMany({
    data: [
      {
        userId: idMap.users.DDT_ADMIN,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.GUEST,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        teamId: idMap.teams.WILLIAM_FORD,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.BAS_VEENHOVEN,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.BAS_VEENHOVEN,
        teamId: idMap.teams.BAS_VEENHOVEN,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.DON_DOMINO,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.GUEST,
      },
      {
        userId: idMap.users.BART_VRIENS,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
    ],
  });
}
