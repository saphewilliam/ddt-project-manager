import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedAttributes(prisma: PrismaClient): Promise<void> {
  await prisma.attribute.createMany({
    data: [
      {
        id: idMap.attributes.MOUSE_TRAP,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Mouse trap',
        namePlural: 'Mouse traps',
      },
      {
        id: idMap.attributes.WALL_HOOK,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Wall hook',
        namePlural: 'Wall hooks',
      },
      {
        id: idMap.attributes.STAIRCASE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Staircase',
        namePlural: 'Staircases',
      },
      {
        id: idMap.attributes.BRIDGE_LARGE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Large bridge',
        namePlural: 'Large bridges',
      },
      {
        id: idMap.attributes.BRIDGE_SMALL,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Small bridge',
        namePlural: 'Small bridges',
      },
      {
        id: idMap.attributes.FALLWALL,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fallwall',
        namePlural: 'Fallwalls',
      },
      {
        id: idMap.attributes.MINI_FALLWALL,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Mini fallwall',
        namePlural: 'Mini fallwalls',
      },
      {
        id: idMap.attributes.DIRECTION_CHANGER,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Direction changer',
        namePlural: 'Direction changers',
      },
      {
        id: idMap.attributes.DUCT,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Duct/fieldstarter holder',
        namePlural: 'Ducts/fieldstarter holders',
      },
      {
        id: idMap.attributes.DIODE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Diode',
        namePlural: 'Diodes',
      },
      {
        id: idMap.attributes.CROSSING,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Crossing',
        namePlural: 'Crossings',
      },
      {
        id: idMap.attributes.FIELDSTARTER_5,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (5 stones)',
        namePlural: 'Fieldstarters (5 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_6,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (6 stones)',
        namePlural: 'Fieldstarters (6 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_7,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (7 stones)',
        namePlural: 'Fieldstarters (7 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_8,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (8 stones)',
        namePlural: 'Fieldstarters (8 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_9,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (9 stones)',
        namePlural: 'Fieldstarters (9 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_11,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (11 stones)',
        namePlural: 'Fieldstarters (11 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_12,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (12 stones)',
        namePlural: 'Fieldstarters (12 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_13,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (13 stones)',
        namePlural: 'Fieldstarters (13 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_14,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (14 stones)',
        namePlural: 'Fieldstarters (14 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_15,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (15 stones)',
        namePlural: 'Fieldstarters (15 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_16,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (16 stones)',
        namePlural: 'Fieldstarters (16 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_17,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (17 stones)',
        namePlural: 'Fieldstarters (17 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_18,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (18 stones)',
        namePlural: 'Fieldstarters (18 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_19,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (19 stones)',
        namePlural: 'Fieldstarters (19 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_20,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (20 stones)',
        namePlural: 'Fieldstarters (20 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_21,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (21 stones)',
        namePlural: 'Fieldstarters (21 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_22,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (22 stones)',
        namePlural: 'Fieldstarters (22 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_23,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (23 stones)',
        namePlural: 'Fieldstarters (23 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_24,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (24 stones)',
        namePlural: 'Fieldstarters (24 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_25,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (25 stones)',
        namePlural: 'Fieldstarters (25 stones)',
      },
    ],
  });
}
