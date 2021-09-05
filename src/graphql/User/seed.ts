import { PrismaClient } from '@prisma/client';
import { ids } from '@graphql/ids';
import { hashPw } from '@lib/authHelpers';
import { generateSlug } from '@lib/util';

export default async function seedUsers(prisma: PrismaClient): Promise<void> {
  await prisma.user.createMany({
    data: [
      {
        id: ids.users.DDT_ADMIN,
        firstName: 'DDT',
        lastName: 'Admin',
        displayName: 'DDT',
        slug: generateSlug('DDT'),
        email: 'info@dutchdominoteam.nl',
        password: await hashPw('Admin123'),
        isAdmin: true,
      },
      {
        id: ids.users.WILLIAM_FORD,
        firstName: 'William',
        lastName: 'Ford',
        displayName: 'William F.',
        slug: generateSlug('William F.'),
        email: 'william.ford@telfort.nl',
        password: await hashPw('WilliamFord'),
        isAdmin: true,
      },
      {
        id: ids.users.BAS_VEENHOVEN,
        firstName: 'Bas',
        lastName: 'Veenhoven',
        displayName: 'Bas V.',
        slug: generateSlug('Bas V.'),
        email: 'bas_veenhoven@hotmail.com',
        password: await hashPw('BasVeenhoven'),
        isAdmin: true,
      },
      {
        id: ids.users.WASILJA_PETERSE,
        firstName: 'Wasilja',
        lastName: 'Peterse',
        displayName: 'Wasilja P.',
        slug: generateSlug('Wasilja P.'),
        email: 'wasilja_18@hotmail.com',
      },
      {
        id: ids.users.BART_VRIENS,
        firstName: 'Bart',
        lastName: 'Vriens',
        displayName: 'Bart V.',
        slug: generateSlug('Bart V.'),
        email: 'bart_vriens@live.nl',
      },
      {
        id: ids.users.PIM_VRIENS,
        firstName: 'Pim',
        lastName: 'Vriens',
        displayName: 'Pim V.',
        slug: generateSlug('Pim V.'),
        email: 'pim_vriens@hotmail.com',
      },
      {
        id: ids.users.WIM_VAN_OTTERDIJK,
        firstName: 'Wim',
        lastName: 'van Otterdijk',
        displayName: 'Wim v O.',
        slug: generateSlug('Wim v O.'),
        email: 'w.v.otterdijk@gmail.com',
      },
      {
        id: ids.users.JAAP_VERSCHUREN,
        firstName: 'Jaap',
        lastName: 'Verschuren',
        displayName: 'Jaap V.',
        slug: generateSlug('Jaap V.'),
        email: 'jaap_verschuren@hotmail.com',
      },
    ],
  });
}
