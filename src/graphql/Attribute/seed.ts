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
        id: idMap.attributes.BRIDGE_SMALL,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Bridge (small)',
        namePlural: 'Bridges (small)',
      },
      {
        id: idMap.attributes.BRIDGE_MEDIUM,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Bridge (medium)',
        namePlural: 'Bridges (medium)',
      },
      {
        id: idMap.attributes.BRIDGE_LARGE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Bridge (large)',
        namePlural: 'Bridges (large)',
      },
      {
        id: idMap.attributes.BRIDGE_BLOCK,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Bridge block',
        namePlural: 'Bridge blocks',
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
        id: idMap.attributes.DIRECTION_CHANGER_FOOT,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Direction changer foot',
        namePlural: 'Direction changer feet',
      },
      {
        id: idMap.attributes.DIRECTION_CHANGER_PLANK_SMALL,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Direction changer plank (small)',
        namePlural: 'Direction changer planks (small)',
      },
      {
        id: idMap.attributes.DIRECTION_CHANGER_PLANK_MEDIUM,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Direction changer plank (medium)',
        namePlural: 'Direction changer planks (medium)',
      },
      {
        id: idMap.attributes.DIRECTION_CHANGER_PLANK_LARGE,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Direction changer plank (large)',
        namePlural: 'Direction changer planks (large)',
      },
      {
        id: idMap.attributes.DUCT,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Duct / fieldstarter holder',
        namePlural: 'Ducts / fieldstarter holders',
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
        id: idMap.attributes.FIELDSTARTER_3,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (3 stones)',
        namePlural: 'Fieldstarters (3 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_4,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (4 stones)',
        namePlural: 'Fieldstarters (4 stones)',
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
        id: idMap.attributes.FIELDSTARTER_10,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (10 stones)',
        namePlural: 'Fieldstarters (10 stones)',
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
      {
        id: idMap.attributes.FIELDSTARTER_26,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (26 stones)',
        namePlural: 'Fieldstarters (26 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_27,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (27 stones)',
        namePlural: 'Fieldstarters (27 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_28,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (28 stones)',
        namePlural: 'Fieldstarters (28 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_29,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (29 stones)',
        namePlural: 'Fieldstarters (29 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_30,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (30 stones)',
        namePlural: 'Fieldstarters (30 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_31,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (31 stones)',
        namePlural: 'Fieldstarters (31 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_32,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (32 stones)',
        namePlural: 'Fieldstarters (32 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_33,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (33 stones)',
        namePlural: 'Fieldstarters (33 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_34,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (34 stones)',
        namePlural: 'Fieldstarters (34 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_35,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (35 stones)',
        namePlural: 'Fieldstarters (35 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_36,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (36 stones)',
        namePlural: 'Fieldstarters (36 stones)',
      },
      {
        id: idMap.attributes.FIELDSTARTER_37,
        teamId: idMap.teams.DUTCH_DOMINO_TEAM,
        name: 'Fieldstarter (37 stones)',
        namePlural: 'Fieldstarters (37 stones)',
      },
    ],
  });
}
