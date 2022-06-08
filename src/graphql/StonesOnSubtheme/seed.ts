import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStonesOnSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.stonesOnSubtheme.createMany({
    data: [
      // WDC 2021
      {
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        stoneId: idMap.stones.GROEN_LP_D,
        userId: idMap.users.DDT_ADMIN,
        amount: 1000,
      },
      {
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        stoneId: idMap.stones.WIT_LP_A,
        userId: idMap.users.DDT_ADMIN,
        amount: 21000,
      },
      {
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        stoneId: idMap.stones.GROEN_DO_C,
        userId: idMap.users.DON_DOMINO,
        amount: 21000,
      },
      {
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        stoneId: idMap.stones.ROOD_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 27000,
      },
      {
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        stoneId: idMap.stones.GEEL_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 27000,
      },
      {
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        stoneId: idMap.stones.WIT_LP_B,
        userId: idMap.users.WIM_VAN_OTTERDIJK,
        amount: 3000,
      },
      {
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        stoneId: idMap.stones.BLAUW_DO_B,
        userId: idMap.users.DON_DOMINO,
        amount: 40000,
      },
      {
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        stoneId: idMap.stones.PAARS_DO_A,
        userId: idMap.users.DON_DOMINO,
        amount: 40000,
      },

      // DDT Ten Years
      {
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        stoneId: idMap.stones.BLAUW_LP_A,
        userId: idMap.users.DDT_ADMIN,
        amount: 8000,
      },
      {
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        stoneId: idMap.stones.ZWART_LP_A,
        userId: idMap.users.DDT_ADMIN,
        amount: 8000,
      },

      // Vexx
      {
        subthemeId: idMap.events.VEXX.PROJECT.id,
        stoneId: idMap.stones.GROEN_LP_D,
        userId: idMap.users.DDT_ADMIN,
        amount: 12000,
      },
      {
        subthemeId: idMap.events.VEXX.PROJECT.id,
        stoneId: idMap.stones.ZWART_LP_A,
        userId: idMap.users.DDT_ADMIN,
        amount: 12000,
      },
    ],
  });
}
