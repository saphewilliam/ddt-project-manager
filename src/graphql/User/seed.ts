import { PrismaClient } from '@prisma/client';
import { idMap } from '@graphql/idMap';
import { hashPw } from '@lib/authHelpers';
import { generateSlug } from '@lib/util';

export default async function seedUsers(prisma: PrismaClient): Promise<void> {
  await prisma.user.createMany({
    data: [
      {
        id: idMap.users.DDT_ADMIN,
        firstName: 'DDT',
        lastName: 'Admin',
        displayName: 'DDT',
        slug: generateSlug('DDT'),
        email: 'info@dutchdominoteam.nl',
        password: await hashPw('Admin123'),
        isAdmin: true,
      },
      {
        id: idMap.users.WILLIAM_FORD,
        firstName: 'William',
        lastName: 'Ford',
        displayName: 'William F.',
        slug: generateSlug('William'),
        email: 'william.ford@telfort.nl',
        password: await hashPw('WilliamFord'),
        isAdmin: true,
      },
      {
        id: idMap.users.BAS_VEENHOVEN,
        firstName: 'Bas',
        lastName: 'Veenhoven',
        displayName: 'Bas V.',
        slug: generateSlug('Bas'),
        email: 'bas_veenhoven@hotmail.com',
        password: await hashPw('BasVeenhoven'),
        isAdmin: true,
      },
      {
        id: idMap.users.WASILJA_PETERSE,
        firstName: 'Wasilja',
        lastName: 'Peterse',
        displayName: 'Wasilja P.',
        slug: generateSlug('Wasilja'),
        email: 'wasilja_18@hotmail.com',
      },
      {
        id: idMap.users.BART_VRIENS,
        firstName: 'Bart',
        lastName: 'Vriens',
        displayName: 'Bart V.',
        slug: generateSlug('Bart'),
        email: 'bart_vriens@live.nl',
      },
      {
        id: idMap.users.PIM_VRIENS,
        firstName: 'Pim',
        lastName: 'Vriens',
        displayName: 'Pim V.',
        slug: generateSlug('Pim'),
        email: 'pim_vriens@hotmail.com',
      },
      {
        id: idMap.users.WIM_VAN_OTTERDIJK,
        firstName: 'Wim',
        lastName: 'van Otterdijk',
        displayName: 'Wim v O.',
        slug: generateSlug('Wim'),
        email: 'w.v.otterdijk@gmail.com',
      },
      {
        id: idMap.users.JAAP_VERSCHUREN,
        firstName: 'Jaap',
        lastName: 'Verschuren',
        displayName: 'Jaap V.',
        slug: generateSlug('Jaap'),
        email: 'jaap_verschuren@hotmail.com',
      },
      {
        id: idMap.users.DON_DOMINO,
        firstName: 'Don',
        lastName: 'Domino',
        displayName: 'DonDomino',
        slug: generateSlug('Don'),
        email: 'info@dondomino.eu',
      },
    ],
  });
}
