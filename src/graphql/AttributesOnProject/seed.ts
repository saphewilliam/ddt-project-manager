import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedAttributesOnProjects(prisma: PrismaClient): Promise<void> {
  await prisma.attributesOnProject.createMany({
    data: [
      {
        projectId: idMap.projects.WDC_2021_DON_DOMINO,
        attributeId: idMap.attributes.FIELDSTARTER_10,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_FLYING_LONDON,
        attributeId: idMap.attributes.FIELDSTARTER_14,
        userId: idMap.users.DDT_ADMIN,
        amount: 8,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_TINKER_BELL,
        attributeId: idMap.attributes.FIELDSTARTER_8,
        userId: idMap.users.DDT_ADMIN,
        amount: 3,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_TINKER_BELL,
        attributeId: idMap.attributes.FIELDSTARTER_10,
        userId: idMap.users.DDT_ADMIN,
        amount: 4,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_TINKER_BELL,
        attributeId: idMap.attributes.FIELDSTARTER_11,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_TINKER_BELL,
        attributeId: idMap.attributes.FIELDSTARTER_17,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_MERMAIDS,
        attributeId: idMap.attributes.FIELDSTARTER_14,
        userId: idMap.users.DDT_ADMIN,
        amount: 4,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_MERMAIDS,
        attributeId: idMap.attributes.FIELDSTARTER_15,
        userId: idMap.users.DDT_ADMIN,
        amount: 5,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_SKULL_ISLAND,
        attributeId: idMap.attributes.MOUSE_TRAP,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
      {
        projectId: idMap.projects.WDC_2021_PP_SKULL_ISLAND,
        attributeId: idMap.attributes.WALL_HOOK,
        userId: idMap.users.DDT_ADMIN,
        amount: 1,
      },
    ],
  });
}
