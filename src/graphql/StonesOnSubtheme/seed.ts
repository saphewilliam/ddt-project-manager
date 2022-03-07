import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { generateSlug } from '@lib/util';

export default async function seedStonesOnSubthemes(prisma: PrismaClient): Promise<void> {
  await prisma.stonesOnSubtheme.createMany({
    data: [
      {
        stoneId: idMap.stones.BLAUW_BK_A,
        amount: 500,
        subthemeId: idMap.subthemes.PETER_PAN,
        userId: idMap.users.BAS_VEENHOVEN,
      },
      {
        stoneId: idMap.stones.BLAUW_BK_B,
        amount: 500,
        subthemeId: idMap.subthemes.PETER_PAN,
        userId: idMap.users.BAS_VEENHOVEN,
      },
      {
        stoneId: idMap.stones.BLAUW_BK_C,
        amount: 500,
        subthemeId: idMap.subthemes.PETER_PAN,
        userId: idMap.users.BAS_VEENHOVEN,
      },
      {
        stoneId: idMap.stones.PAARS_BK_A,
        amount: 500,
        subthemeId: idMap.subthemes.PETER_PAN,
        userId: idMap.users.BAS_VEENHOVEN,
      },
      {
        stoneId: idMap.stones.BLAUW_BK_B,
        amount: 500,
        subthemeId: idMap.subthemes.BEAUTY_AND_THE_BEAST,
        userId: idMap.users.BAS_VEENHOVEN,
      },
      {
        stoneId: idMap.stones.BLAUW_BK_C,
        amount: 500,
        subthemeId: idMap.subthemes.EMPERORS_NEW_CLOTHES,
        userId: idMap.users.BAS_VEENHOVEN,
      },
    ],
  });
}
