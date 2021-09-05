import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStoneLists(prisma: PrismaClient): Promise<void> {
  await prisma.stoneList.createMany({
    data: [
      {
        // DonDomino
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
        stoneId: idMap.stones.ROOD_DO_B,
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
      {
        // William
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
    ],
  });
}
