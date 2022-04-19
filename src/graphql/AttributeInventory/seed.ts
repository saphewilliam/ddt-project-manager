import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedAttributeInventory(prisma: PrismaClient): Promise<void> {
  await prisma.attributeInventory.createMany({
    data: [
      {
        attributeId: idMap.attributes.FIELDSTARTER_3,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_4,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_5,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_6,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_7,
        userId: idMap.users.DDT_ADMIN,
        amount: 7,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_8,
        userId: idMap.users.DDT_ADMIN,
        amount: 47,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_9,
        userId: idMap.users.DDT_ADMIN,
        amount: 23,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_10,
        userId: idMap.users.DDT_ADMIN,
        amount: 25,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_11,
        userId: idMap.users.DDT_ADMIN,
        amount: 33,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_12,
        userId: idMap.users.DDT_ADMIN,
        amount: 11,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_13,
        userId: idMap.users.DDT_ADMIN,
        amount: 9,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_14,
        userId: idMap.users.DDT_ADMIN,
        amount: 18,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_15,
        userId: idMap.users.DDT_ADMIN,
        amount: 12,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_16,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_17,
        userId: idMap.users.DDT_ADMIN,
        amount: 29,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_18,
        userId: idMap.users.DDT_ADMIN,
        amount: 15,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_19,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_20,
        userId: idMap.users.DDT_ADMIN,
        amount: 19,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_22,
        userId: idMap.users.DDT_ADMIN,
        amount: 7,
      },
      {
        attributeId: idMap.attributes.FIELDSTARTER_37,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        attributeId: idMap.attributes.DIRECTION_CHANGER_PLANK_MEDIUM,
        userId: idMap.users.DDT_ADMIN,
        amount: 210,
      },
      {
        attributeId: idMap.attributes.DIRECTION_CHANGER_PLANK_LARGE,
        userId: idMap.users.DDT_ADMIN,
        amount: 289,
      },
      {
        attributeId: idMap.attributes.DIRECTION_CHANGER_FOOT,
        userId: idMap.users.DDT_ADMIN,
        amount: 462,
      },
      {
        attributeId: idMap.attributes.BRIDGE_SMALL,
        userId: idMap.users.DDT_ADMIN,
        amount: 25,
      },
      {
        attributeId: idMap.attributes.BRIDGE_MEDIUM,
        userId: idMap.users.DDT_ADMIN,
        amount: 120,
      },
      {
        attributeId: idMap.attributes.BRIDGE_LARGE,
        userId: idMap.users.DDT_ADMIN,
        amount: 46,
      },
      {
        attributeId: idMap.attributes.STAIRCASE,
        userId: idMap.users.DDT_ADMIN,
        amount: 244,
      },
      {
        attributeId: idMap.attributes.BRIDGE_BLOCK,
        userId: idMap.users.DDT_ADMIN,
        amount: 24,
      },
    ],
  });
}
