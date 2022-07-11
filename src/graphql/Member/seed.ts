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
        role: Role.CAPTAIN,
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
        userId: idMap.users.WASILJA_PETERSE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.WASILJA_PETERSE,
        teamId: idMap.teams.WASILJA_PETERSE,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.BART_VRIENS,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.PIM_VRIENS,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.WIM_VAN_OTTERDIJK,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.JAAP_VERSCHUREN,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.DON_DOMINO,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.GUEST,
      },
      {
        userId: idMap.users.THOMAS_VAN_WELY,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.THOMAS_VAN_WELY,
        teamId: idMap.teams.THOMAS_VAN_WELY,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.THOMAS_BOSBOOM,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.WOUT_DUTOIT,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.WOUT_DUTOIT,
        teamId: idMap.teams.WOUT_DUTOIT,
        role: Role.CAPTAIN,
      },
      {
        userId: idMap.users.SEPPE_LESENNE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
      {
        userId: idMap.users.LISA_NEDERVEEN,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        role: Role.BUILDER,
      },
    ],
  });
}
