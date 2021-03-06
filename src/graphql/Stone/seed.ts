import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';

export default async function seedStones(prisma: PrismaClient): Promise<void> {
  await prisma.stone.createMany({
    data: [
      {
        id: idMap.stones.ROOD_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Rood LP-A',
        alias: 'Bordeaux',
        hex: '#9a0000',
        order: 0,
      },
      {
        id: idMap.stones.ROOD_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Rood LP-B',
        alias: 'Donkerrood',
        hex: '#bc0000',
        order: 1,
      },
      {
        id: idMap.stones.ROOD_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Rood LP-C',
        alias: 'Rood',
        hex: '#ff0000',
        order: 2,
      },
      {
        id: idMap.stones.ROOD_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Rood LP-D',
        alias: 'Rood (oud)',
        hex: '#ff2d2d',
        order: 3,
      },
      {
        id: idMap.stones.ROOD_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Rood LP-E',
        alias: 'Bordeaux (oud)',
        hex: '#000000',
        order: 4,
      },
      {
        id: idMap.stones.ORANJE_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-A',
        alias: 'Oranje',
        hex: '#e9621d',
        order: 5,
      },
      {
        id: idMap.stones.ORANJE_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-B',
        alias: 'Lichtoranje',
        hex: '#ff9801',
        order: 6,
      },
      {
        id: idMap.stones.ORANJE_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-C',
        alias: 'Middeltint',
        hex: '#eb5f16',
        description: 'Ligt tussen licht en donker in',
        order: 7,
      },
      {
        id: idMap.stones.ORANJE_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-D',
        alias: 'Dof donkeroranje',
        hex: '#cd5f2c',
        description: 'Restkleur (oude soort)',
        order: 8,
      },
      {
        id: idMap.stones.ORANJE_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-E',
        alias: 'Zandoranje',
        hex: '#dd7833',
        description: 'Restkleur (oude soort)',
        order: 9,
      },
      {
        id: idMap.stones.GEEL_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Geel LP-A',
        alias: 'Ma??sgeel',
        hex: '#fbd800',
        order: 10,
      },
      {
        id: idMap.stones.GEEL_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Geel LP-B',
        alias: 'Geel (glans)',
        hex: '#f7f700',
        order: 11,
      },
      {
        id: idMap.stones.GROEN_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-A',
        alias: 'Lichtgroen (oud)',
        hex: '#60c429',
        order: 12,
      },
      {
        id: idMap.stones.GROEN_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-B',
        alias: 'Lichtgroen (nieuw)',
        hex: '#12f62d',
        order: 13,
      },
      {
        id: idMap.stones.GROEN_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-C',
        alias: 'Groen (kleur onvast)',
        hex: '#00b050',
        order: 14,
      },
      {
        id: idMap.stones.GROEN_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-D',
        alias: 'Groen (nieuw)',
        hex: '#087a1e',
        order: 15,
      },
      {
        id: idMap.stones.GROEN_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-E',
        alias: 'Donkergroen (oud)',
        hex: '#065615',
        order: 16,
      },
      {
        id: idMap.stones.GROEN_LP_F,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Groen LP-F',
        alias: 'Transparantgroen',
        hex: '#027567',
        order: 17,
      },
      {
        id: idMap.stones.TURQUOISE_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Turquoise LP-A',
        alias: 'Mintgroen',
        hex: '#59d9b6',
        order: 18,
      },
      {
        id: idMap.stones.TURQUOISE_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Turquoise LP-B',
        alias: 'Turquoise',
        hex: '#06c8ba',
        order: 19,
      },
      {
        id: idMap.stones.TURQUOISE_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Turquoise LP-C',
        alias: 'Turquoise (oud)',
        hex: '#00b4a7',
        order: 20,
      },
      {
        id: idMap.stones.BLAUW_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Blauw LP-A',
        alias: 'Lichtblauw (nieuw)',
        hex: '#0094fc',
        order: 21,
      },
      {
        id: idMap.stones.BLAUW_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Blauw LP-B',
        alias: 'Lichtblauw (marmer)',
        hex: '#33abf2',
        order: 22,
      },
      {
        id: idMap.stones.BLAUW_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Blauw LP-C',
        alias: 'Lichtblauw (oud)',
        hex: '#33c2f2',
        order: 23,
      },
      {
        id: idMap.stones.BLAUW_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Blauw LP-D',
        alias: 'Blauw',
        hex: '#004be2',
        order: 24,
      },
      {
        id: idMap.stones.BLAUW_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Blauw LP-E',
        alias: 'Donkerblauw',
        hex: '#00297a',
        order: 25,
      },
      {
        id: idMap.stones.PAARS_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Paars LP-A',
        alias: 'Donkerviolet',
        hex: '#3c1f1e',
        order: 26,
      },
      {
        id: idMap.stones.PAARS_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Paars LP-B',
        alias: 'Lichtviolet',
        hex: '#9d2854',
        description: 'Nieuwe violet (Pim en Bart). Mogelijk lichtviolet ...',
        order: 27,
      },
      {
        id: idMap.stones.PAARS_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Paars LP-C',
        alias: 'Paars',
        hex: '#602f95',
        order: 28,
      },
      {
        id: idMap.stones.PAARS_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Paars LP-D',
        alias: 'Lila',
        hex: '#cc00cc',
        order: 29,
      },
      {
        id: idMap.stones.ROZE_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Roze LP-A',
        alias: 'Felroze',
        hex: '#ff3399',
        order: 30,
      },
      {
        id: idMap.stones.ROZE_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Roze LP-B',
        alias: 'Roze',
        hex: '#ff53a9',
        order: 31,
      },
      {
        id: idMap.stones.ROZE_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Roze LP-C',
        alias: 'Lichtroze',
        hex: '#ff99cc',
        order: 32,
      },
      {
        id: idMap.stones.ROZE_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Roze LP-D',
        alias: 'Altrosa',
        hex: '#d64d46',
        order: 33,
      },
      {
        id: idMap.stones.ROZE_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Roze LP-E',
        alias: 'Zalmroze',
        hex: '#de716c',
        order: 34,
      },
      {
        id: idMap.stones.IVOOR_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Ivoor LP-A',
        alias: 'Ivoor',
        hex: '#ffeab7',
        order: 35,
      },
      {
        id: idMap.stones.IVOOR_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Ivoor LP-B',
        alias: 'Witgoud',
        hex: '#cfcaa9',
        order: 36,
      },
      {
        id: idMap.stones.IVOOR_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Ivoor LP-C',
        alias: 'Piswit',
        hex: '#f3f3e1',
        order: 37,
      },
      {
        id: idMap.stones.BRUIN_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Bruin LP-A',
        alias: 'Bruin',
        hex: '#522a0f',
        order: 38,
      },
      {
        id: idMap.stones.BRUIN_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Bruin LP-B',
        alias: 'Lichtbruin',
        hex: '#5b4538',
        order: 39,
      },
      {
        id: idMap.stones.BRUIN_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Bruin LP-C',
        alias: 'Goud',
        hex: '#534221',
        order: 40,
      },
      {
        id: idMap.stones.BRUIN_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Bruin LP-D',
        alias: 'Okergeel',
        hex: '#977033',
        order: 41,
      },
      {
        id: idMap.stones.BRUIN_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Bruin LP-E',
        alias: 'Bruin mat',
        hex: '#000000',
        order: 42,
      },
      {
        id: idMap.stones.GRIJS_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Grijs LP-A',
        alias: 'Grijs',
        hex: '#8e8e8e',
        order: 43,
      },
      {
        id: idMap.stones.GRIJS_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Grijs LP-B',
        alias: 'Lichtgrijs',
        hex: '#bcbdb8',
        order: 44,
      },
      {
        id: idMap.stones.GRIJS_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Grijs LP-C',
        alias: 'Zilver',
        hex: '#7F7F7F',
        order: 45,
      },
      {
        id: idMap.stones.GRIJS_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Grijs LP-D',
        alias: 'Donkergrijs',
        hex: '#565656',
        order: 46,
      },
      {
        id: idMap.stones.ZWART_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Zwart LP-A',
        alias: 'Zwart',
        hex: '#000000',
        order: 47,
      },
      {
        id: idMap.stones.WIT_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Wit LP-A',
        alias: 'Wit',
        hex: '#ffffff',
        order: 48,
      },
      {
        id: idMap.stones.WIT_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Wit LP-B',
        alias: 'Transparant',
        hex: '#d8d8d8',
        order: 49,
      },
      {
        id: idMap.stones.BLAUW_DD_A,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Blauw DD-A',
        alias: 'Donkerblauw',
        hex: '#0b0670',
        order: 50,
      },
      {
        id: idMap.stones.PAARS_DD_A,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Paars DD-A',
        alias: 'Paars',
        hex: '#6c238d',
        order: 51,
      },
      {
        id: idMap.stones.PAARS_DD_B,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Paars DD-B',
        alias: 'Lila',
        hex: '#bc2a81',
        order: 52,
      },
      {
        id: idMap.stones.PAARS_DD_C,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Paars DD-C',
        alias: 'Mixpaars',
        hex: '#57007e',
        description: 'Pim en Bart rommelpaars',
        order: 53,
      },
      {
        id: idMap.stones.GRIJS_DD_A,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Grijs DD-A',
        alias: 'Donkergrijs',
        hex: '#565656',
        order: 54,
      },
      {
        id: idMap.stones.BLAUW_BK_A,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Blauw BK-A',
        alias: 'Ice',
        hex: '#b6dde8',
        order: 55,
      },
      {
        id: idMap.stones.BLAUW_BK_B,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Blauw BK-B',
        alias: 'Island Blue',
        hex: '#1e87e6',
        order: 56,
      },
      {
        id: idMap.stones.TURQUOISE_BK_A,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Turquoise BK-A',
        alias: 'Teal',
        hex: '#26c4aa',
        order: 57,
      },
      {
        id: idMap.stones.PAARS_BK_A,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Paars BK-A',
        alias: 'Indigo',
        hex: '#402f7d',
        order: 58,
      },
      {
        id: idMap.stones.ROOD_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Rood MD-A',
        alias: 'Bordeaux',
        hex: '#9a0000',
        order: 59,
      },
      {
        id: idMap.stones.ROOD_MD_B,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Rood MD-B',
        alias: 'Rood',
        hex: '#ff0000',
        order: 60,
      },
      {
        id: idMap.stones.ORANJE_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Oranje MD-A',
        alias: 'Oranje',
        hex: '#e9621d',
        order: 61,
      },
      {
        id: idMap.stones.GEEL_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Geel MD-A',
        alias: 'Geel',
        hex: '#ffff00',
        order: 62,
      },
      {
        id: idMap.stones.GROEN_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Groen MD-A',
        alias: 'Groen',
        hex: '#00b050',
        order: 63,
      },
      {
        id: idMap.stones.BLAUW_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Blauw MD-A',
        alias: 'Blauw',
        hex: '#004be2',
        order: 64,
      },
      {
        id: idMap.stones.PAARS_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Paars MD-A',
        alias: 'Paars',
        hex: '#602f95',
        order: 65,
      },
      {
        id: idMap.stones.PAARS_MD_B,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Paars MD-B',
        alias: 'Lila',
        hex: '#cc00cc',
        order: 66,
      },
      {
        id: idMap.stones.ROZE_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Roze MD-A',
        alias: 'Lichtroze',
        hex: '#ff99cc',
        order: 67,
      },
      {
        id: idMap.stones.WIT_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Wit MD-A',
        alias: 'Wit',
        hex: '#ffffff',
        order: 68,
      },
      {
        id: idMap.stones.WIT_MD_B,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Wit MD-B',
        alias: 'Transparant',
        hex: '#d8d8d8',
        order: 69,
      },
      {
        id: idMap.stones.WIT_MD_C,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Wit MD-C',
        alias: 'Minis wit',
        hex: '#ffffff',
        order: 70,
      },
      {
        id: idMap.stones.ZWART_MD_A,
        stoneTypeId: idMap.stoneTypes.MR_DOMINO,
        name: 'Zwart MD-A',
        alias: 'Zwart',
        hex: '#000000',
        order: 71,
      },
      {
        id: idMap.stones.MIX_OV_A,
        stoneTypeId: idMap.stoneTypes.OTHERS,
        name: 'Mix OV-A',
        alias: 'Mix Lamping (rest)',
        hex: '#ffffff',
        order: 72,
      },
      {
        id: idMap.stones.BLAUW_BK_C,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Blauw BK-C',
        alias: 'Navy Blue',
        hex: '#150e48',
        order: 73,
      },
      {
        id: idMap.stones.ROOD_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Rood CC-A',
        alias: 'Donkerrood',
        alias2: 'Rood',
        hex: '#ff0000',
        order: 74,
      },
      {
        id: idMap.stones.ROZE_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Roze CC-A',
        alias: 'Roze',
        alias2: 'Paars',
        hex: '#6c238d',
        order: 75,
      },
      {
        id: idMap.stones.GEEL_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Geel CC-A',
        alias: 'Geel',
        alias2: 'Rood',
        hex: '#ff0000',
        order: 76,
      },
      {
        id: idMap.stones.GEEL_CC_B,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Geel CC-B',
        alias: 'Geel',
        alias2: 'Lichtgroen',
        hex: '#60c429',
        order: 77,
      },
      {
        id: idMap.stones.GEEL_CC_C,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Geel CC-C',
        alias: 'Geel',
        alias2: 'Lichtblauw',
        hex: '#33c2f2',
        order: 78,
      },
      {
        id: idMap.stones.GROEN_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Groen CC-A',
        alias: 'Groen',
        alias2: 'Rood',
        hex: '#ff0000',
        order: 79,
      },
      {
        id: idMap.stones.GROEN_CC_B,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Groen CC-B',
        alias: 'Donkergroen',
        alias2: 'Wit',
        hex: '#ffffff',
        order: 80,
      },
      {
        id: idMap.stones.MIX_LP_A,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Mix LP-A',
        alias: 'Diversen Mix',
        hex: '#000000',
        order: 81,
      },
      {
        id: idMap.stones.MIX_LP_B,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Mix LP-B',
        alias: 'Groen Mix',
        hex: '#96ffb3',
        order: 82,
      },
      {
        id: idMap.stones.MIX_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Mix LP-C',
        alias: 'Oranje Mix',
        hex: '#ffe396',
        order: 83,
      },
      {
        id: idMap.stones.MIX_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Mix LP-D',
        alias: 'Blauw Mix',
        hex: '#96c0ff',
        order: 84,
      },
      {
        id: idMap.stones.MIX_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Mix CC-A',
        alias: 'CC Diversen Mix',
        hex: '#000000',
        order: 85,
      },
      {
        id: idMap.stones.GEEL_LP_C,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Geel LP-C',
        alias: 'Geel (mat)',
        hex: '#ffff29',
        order: 86,
      },
      {
        id: idMap.stones.ORANJE_LP_F,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Oranje LP-F',
        alias: 'Oranje (glans)',
        hex: '#000000',
        order: 87,
      },
      {
        id: idMap.stones.IVOOR_LP_D,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Ivoor LP-D',
        alias: 'Kaki',
        hex: '#e8c690',
        order: 88,
      },
      {
        id: idMap.stones.PAARS_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Paars LP-E',
        alias: 'Paars (glans)',
        hex: '#511359',
        order: 89,
      },
      {
        id: idMap.stones.ZWART_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-A',
        alias: 'Zwart',
        alias2: 'Rood',
        hex: '#000000',
        order: 90,
      },
      {
        id: idMap.stones.ZWART_CC_B,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-B',
        alias: 'Zwart',
        alias2: 'Geel',
        hex: '#000000',
        order: 91,
      },
      {
        id: idMap.stones.ZWART_CC_C,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-C',
        alias: 'Zwart',
        alias2: 'Oranje',
        hex: '#000000',
        order: 92,
      },
      {
        id: idMap.stones.ZWART_CC_D,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-D',
        alias: 'Zwart',
        alias2: 'Bruin',
        hex: '#000000',
        order: 93,
      },
      {
        id: idMap.stones.ZWART_CC_E,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-E',
        alias: 'Zwart',
        alias2: 'Blauw',
        hex: '#000000',
        order: 94,
      },
      {
        id: idMap.stones.ZWART_CC_F,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-F',
        alias: 'Zwart',
        alias2: 'Bordeaux',
        hex: '#000000',
        order: 95,
      },
      {
        id: idMap.stones.ZWART_CC_G,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-G',
        alias: 'Zwart',
        alias2: 'Wit',
        hex: '#000000',
        order: 96,
      },
      {
        id: idMap.stones.ZWART_CC_H,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Zwart CC-H',
        alias: 'Zwart',
        alias2: 'Wit',
        hex: '#000000',
        order: 97,
      },
      {
        id: idMap.stones.WIT_CC_A,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Wit CC-A',
        alias: 'Wit',
        alias2: 'Rood',
        hex: '#000000',
        order: 98,
      },
      {
        id: idMap.stones.WIT_CC_B,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Wit CC-B',
        alias: 'Wit',
        alias2: 'Zwart',
        hex: '#000000',
        order: 99,
      },
      {
        id: idMap.stones.ROOD_CC_B,
        stoneTypeId: idMap.stoneTypes.COLOR_CHANGING,
        name: 'Rood CC-B',
        alias: 'Rood',
        alias2: 'Wit',
        hex: '#000000',
        order: 100,
      },
      {
        id: idMap.stones.GROEN_DD_A,
        stoneTypeId: idMap.stoneTypes.DOMINO_DAY,
        name: 'Groen DD-A',
        alias: 'Lichtgroen',
        hex: '#25f571',
        order: 101,
      },
      {
        id: idMap.stones.MIX_LP_E,
        stoneTypeId: idMap.stoneTypes.LAMPING,
        name: 'Mix LP-E',
        alias: 'Productiefouten',
        hex: '#000000',
        order: 102,
      },
      {
        id: idMap.stones.ROOD_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Rood DO-A',
        alias: 'Donkerrood',
        hex: '#8d313e',
        description: 'Bordeaux van lamping is donkerder',
        order: 103,
      },
      {
        id: idMap.stones.ROOD_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Rood DO-B',
        alias: 'Rood',
        hex: '#b02b22',
        order: 104,
      },
      {
        id: idMap.stones.ORANJE_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Oranje DO-A',
        alias: 'Fluo Oranje',
        hex: '#fb6034',
        description: 'Lijkt op Oranje LP-A',
        order: 105,
      },
      {
        id: idMap.stones.ORANJE_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Oranje DO-B',
        alias: 'Oranje',
        hex: '#de6129',
        order: 106,
      },
      {
        id: idMap.stones.GEEL_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Geel DO-A',
        alias: 'Ma??sgeel',
        hex: '#fcd343',
        order: 107,
      },
      {
        id: idMap.stones.GEEL_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Geel DO-B',
        alias: 'Dof Geel',
        hex: '#fdff78',
        order: 108,
      },
      {
        id: idMap.stones.GROEN_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Groen DO-A',
        alias: 'Fluo Lichtgroen',
        hex: '#09e53d',
        order: 109,
      },
      {
        id: idMap.stones.GROEN_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Groen DO-B',
        alias: 'Lichtgroen',
        hex: '#41a750',
        order: 110,
      },
      {
        id: idMap.stones.GROEN_DO_C,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Groen DO-C',
        alias: 'Donkergroen',
        hex: '#21865c',
        order: 111,
      },
      {
        id: idMap.stones.BLAUW_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Blauw DO-A',
        alias: 'Dof Lichtblauw',
        hex: '#5c86ae',
        order: 112,
      },
      {
        id: idMap.stones.BLAUW_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Blauw DO-B',
        alias: 'Donkerblauw',
        hex: '#0e3570',
        order: 113,
      },
      {
        id: idMap.stones.PAARS_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Paars DO-A',
        alias: 'Paars',
        hex: '#785889',
        order: 114,
      },
      {
        id: idMap.stones.PAARS_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Paars DO-B',
        alias: 'Pastelviolet',
        hex: '#c1bce2',
        order: 115,
      },
      {
        id: idMap.stones.PAARS_DO_C,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Paars DO-C',
        alias: 'Fuchsia',
        hex: '#a32772',
        order: 116,
      },
      {
        id: idMap.stones.ROZE_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Roze DO-A',
        alias: 'Fluo Roze',
        hex: '#e63480',
        order: 117,
      },
      {
        id: idMap.stones.ROZE_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Roze DO-B',
        alias: 'Roze',
        hex: '#ff99cc',
        order: 118,
      },
      {
        id: idMap.stones.BRUIN_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Bruin DO-A',
        alias: 'Goud',
        hex: '#918765',
        order: 119,
      },
      {
        id: idMap.stones.BRUIN_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Bruin DO-B',
        alias: 'Donkergrijs',
        hex: '#393735',
        order: 120,
      },
      {
        id: idMap.stones.ZWART_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Zwart DO-A',
        alias: 'Zwart',
        hex: '#000000',
        order: 121,
      },
      {
        id: idMap.stones.GRIJS_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Grijs DO-A',
        alias: 'Zilver',
        hex: '#757d7f',
        order: 122,
      },
      {
        id: idMap.stones.GRIJS_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Grijs DO-B',
        alias: 'Grijs',
        hex: '#8e9ca8',
        order: 123,
      },
      {
        id: idMap.stones.WIT_DO_A,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Wit DO-A',
        alias: 'Wit',
        hex: '#ffffff',
        order: 124,
      },
      {
        id: idMap.stones.WIT_DO_B,
        stoneTypeId: idMap.stoneTypes.DON_DOMINO,
        name: 'Wit DO-B',
        alias: 'Transparant',
        hex: '#d8d8d8',
        order: 125,
      },
      {
        id: idMap.stones.WIT_BK_A,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Wit BK-A',
        alias: 'Clear',
        hex: '#d9d9d9',
        order: 126,
      },
      {
        id: idMap.stones.WIT_BK_B,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Wit BK-B',
        alias: 'Clear Jade',
        hex: '#01673e',
        order: 127,
      },
      {
        id: idMap.stones.WIT_BK_C,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Wit BK-C',
        alias: 'Clear Teal',
        hex: '#7cf0da',
        order: 128,
      },
      {
        id: idMap.stones.WIT_BK_D,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Wit BK-D',
        alias: 'Clear Blue',
        hex: '#2323cf',
        order: 129,
      },
      {
        id: idMap.stones.WIT_BK_E,
        stoneTypeId: idMap.stoneTypes.BULK,
        name: 'Wit BK-E',
        alias: 'Clear Purple',
        hex: '#810166',
        order: 130,
      },
    ],
  });
}
