import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStoneLists(prisma: PrismaClient): Promise<void> {
  await prisma.stoneList.createMany({
    data: [
      // DonDomino
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.ROOD_DO_A,
        amount: 2000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.ROOD_DO_B,
        amount: 27000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.GEEL_DO_A,
        amount: 2000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.GEEL_DO_B,
        amount: 27000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.GROEN_DO_C,
        amount: 21000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.BLAUW_DO_B,
        amount: 40000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.PAARS_DO_A,
        amount: 45000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.ZWART_DO_A,
        amount: 1000,
      },
      {
        userId: idMap.users.DON_DOMINO,
        stoneId: idMap.stones.WIT_DO_A,
        amount: 1000,
      },
      // William Ford
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.ROOD_LP_D,
        amount: 792,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.GEEL_LP_B,
        amount: 1666,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.GROEN_LP_B,
        amount: 1636,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.GROEN_LP_C,
        amount: 730,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.TURQUOISE_LP_B,
        amount: 908,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.BLAUW_LP_A,
        amount: 1314,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.BLAUW_LP_D,
        amount: 897,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.IVOOR_LP_C,
        amount: 771,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.GRIJS_LP_A,
        amount: 595,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.ZWART_LP_A,
        amount: 908,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.WIT_LP_B,
        amount: 636,
      },
      {
        userId: idMap.users.WILLIAM_FORD,
        stoneId: idMap.stones.WIT_DO_A,
        amount: 324879,
      },
      // Bart Vriens
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.ROOD_LP_C,
        amount: 1114,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.ORANJE_LP_A,
        amount: 1016,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.GEEL_LP_A,
        amount: 2064,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.GEEL_LP_B,
        amount: 2199,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.GROEN_LP_D,
        amount: 2034,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.GROEN_LP_F,
        amount: 511,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.TURQUOISE_LP_A,
        amount: 1615,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.TURQUOISE_LP_B,
        amount: 1498,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.BLAUW_LP_A,
        amount: 1407,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.BLAUW_LP_E,
        amount: 2716,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.ROZE_LP_A,
        amount: 2545,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.ROZE_LP_E,
        amount: 916,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.IVOOR_LP_A,
        amount: 223,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.ZWART_LP_A,
        amount: 1060,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.WIT_LP_A,
        amount: 2413,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.WIT_LP_B,
        amount: 839,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.PAARS_DD_C,
        amount: 803,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.GROEN_DD_A,
        amount: 213,
      },
      {
        userId: idMap.users.BART_VRIENS,
        stoneId: idMap.stones.WIT_MD_C,
        amount: 500,
      },
    ],
  });
}
