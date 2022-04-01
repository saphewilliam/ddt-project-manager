import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStonesOnSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.stonesOnSubtheme.createMany({
    data: [
      {
        subthemeId: idMap.subthemes.PETER_PAN,
        stoneId: idMap.stones.GROEN_LP_D,
        userId: idMap.users.DDT_ADMIN,
        amount: 1000,
      },
      {
        subthemeId: idMap.subthemes.PETER_PAN,
        stoneId: idMap.stones.WIT_LP_A,
        userId: idMap.users.DDT_ADMIN,
        amount: 21000,
      },
      {
        subthemeId: idMap.subthemes.PETER_PAN,
        stoneId: idMap.stones.GROEN_DO_C,
        userId: idMap.users.DON_DOMINO,
        amount: 21000,
      },
      {
        subthemeId: idMap.subthemes.EMPERORS_NEW_CLOTHES,
        stoneId: idMap.stones.ROOD_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 27000,
      },
      {
        subthemeId: idMap.subthemes.EMPERORS_NEW_CLOTHES,
        stoneId: idMap.stones.GEEL_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 27000,
      },
      {
        subthemeId: idMap.subthemes.BEAUTY_AND_THE_BEAST,
        stoneId: idMap.stones.WIT_LP_B,
        userId: idMap.users.WIM_VAN_OTTERDIJK,
        amount: 3000,
      },
      {
        subthemeId: idMap.subthemes.BEAUTY_AND_THE_BEAST,
        stoneId: idMap.stones.BLAUW_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 40000,
      },
      {
        subthemeId: idMap.subthemes.BEAUTY_AND_THE_BEAST,
        stoneId: idMap.stones.PAARS_DO_A,
        userId: idMap.users.DON_DOMINO,
        amount: 40000,
      },
    ],
  });
}
