import { PrismaClient, ProjectStatus } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { generateSlug } from '@lib/util';

export default async function seedProjects(prisma: PrismaClient): Promise<void> {
  await prisma.project.createMany({
    data: [
      // WDC 2021
      {
        id: idMap.events.WDC_2021.INTRODUCTION.BOOK.id,
        name: 'Book',
        slug: generateSlug('Book'),
        number: 1,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.INTRODUCTION.id,
        supervisorId: idMap.users.WIM_VAN_OTTERDIJK,
      },
      {
        id: idMap.events.WDC_2021.INTRODUCTION.DON_DOMINO.id,
        name: 'Don Domino Sponsor Project',
        slug: generateSlug('DonDomino'),
        number: 2,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.INTRODUCTION.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.INTRODUCTION.SINNERS.id,
        name: 'Sinners Sponsor Project',
        slug: generateSlug('Sinners'),
        number: 3,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.INTRODUCTION.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.INTRO.id,
        name: 'Peter Pan Intro',
        slug: generateSlug('Peter Pan Intro'),
        number: 4,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.FLYING_LONDON.id,
        name: 'Flying over London',
        slug: generateSlug('Flying over London'),
        number: 5,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.NEVERLAND.id,
        name: 'Neverland',
        slug: generateSlug('Neverland'),
        number: 6,
        status: ProjectStatus.CANCELLED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.BART_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.TINKER_BELL.id,
        name: 'Tinker Bell',
        slug: generateSlug('Tinker Bell'),
        number: 7,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.TREASURE_MAP.id,
        name: 'Treasure Map',
        slug: generateSlug('Treasure Map'),
        number: 8,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.BART_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.LOST_BOYS.id,
        name: 'The Lost Boys',
        slug: generateSlug('The Lost Boys'),
        number: 9,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.FIGHT.id,
        name: 'Peter Pan vs. Captain Hook',
        slug: generateSlug('Peter Pan vs. Captain Hook'),
        number: 10,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.PETER_PAN.FLYING_SHIP.id,
        name: 'Flying Ship',
        slug: generateSlug('Flying Ship'),
        number: 11,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.PETER_PAN.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.INTRO.id,
        name: "Emperor's New Clothes Intro",
        slug: generateSlug("Emperor's New Clothes Intro"),
        number: 12,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.CITY.id,
        name: 'City',
        slug: generateSlug('City'),
        number: 13,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.DRESSER.id,
        name: 'Dresser with Clothes',
        slug: generateSlug('Dresser Clothes'),
        number: 14,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.WIM_VAN_OTTERDIJK,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.EMPEROR.id,
        name: 'Emperor',
        slug: generateSlug('Emperor'),
        number: 15,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.TOOLS.id,
        name: 'Tools',
        slug: generateSlug('Tools'),
        number: 16,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.PARADE.id,
        name: 'Parade',
        slug: generateSlug('Parade'),
        number: 17,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.EMPERORS_NEW_CLOTHES.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.INTRO.id,
        name: 'Beauty and the Beast Intro',
        slug: generateSlug('Beauty and the Beast Intro'),
        number: 18,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },

      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.STAINED_GLASS.id,
        name: 'Stained Glass Curse',
        slug: generateSlug('Stained Glass Curse'),
        number: 19,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.ROSE.id,
        name: 'Rose',
        slug: generateSlug('Rose'),
        number: 20,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.WIM_VAN_OTTERDIJK,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.JAIL.id,
        name: 'Jail Trilogy',
        slug: generateSlug('Father Captured in Dungeon'),
        number: 21,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.DINNER.id,
        name: 'Dinner',
        slug: generateSlug('Dinner'),
        number: 22,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.FIGHT.id,
        name: 'Beast Fight',
        slug: generateSlug('Beast Fight'),
        number: 23,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.BALLROOM.id,
        name: 'Ballroom',
        slug: generateSlug('Ballroom'),
        number: 24,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.WDC_2021.BEAUTY_AND_THE_BEAST.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },

      // 10 Years DDT
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.DDT_LOGO.id,
        name: 'DDT Logo',
        slug: generateSlug('DDT Logo'),
        number: 1,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.FIREWORKS.id,
        name: 'Fireworks',
        slug: generateSlug('Fireworks'),
        number: 2,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.TEN_YEARS.id,
        name: 'Ten Years Letters',
        slug: generateSlug('Ten Years Letters'),
        number: 3,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.PARTY_WALL.id,
        name: 'Party Wall',
        slug: generateSlug('Party Wall'),
        number: 4,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },
      {
        id: idMap.events.DDT_10_YEARS.PROJECT.FINAL.id,
        name: 'Ten Years DDT Field',
        slug: generateSlug('Ten Years DDT Field'),
        number: 5,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.DDT_10_YEARS.PROJECT.id,
        supervisorId: idMap.users.WASILJA_PETERSE,
      },

      // VEXX
      {
        id: idMap.events.VEXX.PROJECT.WIX_LOGO.id,
        name: 'WIX Logo',
        slug: generateSlug('Wix Logo'),
        number: 1,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.DOODLE.id,
        name: 'Doodle',
        slug: generateSlug('Doodle'),
        number: 2,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.CAMPBELL.id,
        name: "Campbell's Soup",
        slug: generateSlug("Campbell's Soup"),
        number: 3,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.MATISSE.id,
        name: 'Matisse - The Dance',
        slug: generateSlug('Matisse - The Dance'),
        number: 4,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.VAN_GOGH.id,
        name: 'Van Gogh',
        slug: generateSlug('Van Gogh'),
        number: 5,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.ELMO.id,
        name: 'Elmo',
        slug: generateSlug('Elmo'),
        number: 6,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
      {
        id: idMap.events.VEXX.PROJECT.SPONGEBOB.id,
        name: 'Spongebob',
        slug: generateSlug('Spongebob'),
        number: 7,
        status: ProjectStatus.COUNTED,
        subthemeId: idMap.events.VEXX.PROJECT.id,
        supervisorId: idMap.users.PIM_VRIENS,
      },
    ],
  });
}
