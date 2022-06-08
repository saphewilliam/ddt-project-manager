import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedAttributesOnProjects(prisma: PrismaClient): Promise<void> {
  await prisma.attributesOnProjectPart.createMany({
    data: [
      {
        projectPartId: idMap.events.WDC_2021.INTRODUCTION.DON_DOMINO.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_10,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.FLYING_LONDON.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_14,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TINKER_BELL.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_8,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TINKER_BELL.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_10,
        userId: idMap.users.DDT_ADMIN,
        amount: 4,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TINKER_BELL.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_11,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TINKER_BELL.FIELD,
        attributeId: idMap.attributes.FIELDSTARTER_17,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TREASURE_MAP.MERMAIDS,
        attributeId: idMap.attributes.FIELDSTARTER_14,
        userId: idMap.users.DDT_ADMIN,
        amount: 4,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TREASURE_MAP.MERMAIDS,
        attributeId: idMap.attributes.FIELDSTARTER_15,
        userId: idMap.users.DDT_ADMIN,
        amount: 5,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TREASURE_MAP.SKULL_ISLAND,
        attributeId: idMap.attributes.MOUSE_TRAP,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectPartId: idMap.events.WDC_2021.PETER_PAN.TREASURE_MAP.SKULL_ISLAND,
        attributeId: idMap.attributes.WALL_HOOK,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
    ],
  });
}
