import { hashPw } from '@lib/authHelpers';
import { PrismaClient } from '@prisma/client';

export default async function seedUsers(prisma: PrismaClient): Promise<void> {
  await prisma.user.createMany({
    data: [
      {
        id: '4ffded20-d5f8-41b4-ae5b-60fa8445cc1e',
        firstName: 'DDT',
        lastName: 'Admin',
        displayName: 'DDT',
        email: 'info@dutchdominoteam.nl',
        password: await hashPw('Admin123'),
        isAdmin: true,
      },
      {
        id: '80c03794-073c-4ca2-a9de-e0c12f569c2f',
        firstName: 'William',
        lastName: 'Ford',
        displayName: 'William F.',
        email: 'william.ford@telfort.nl',
        password: await hashPw('WilliamFord'),
        isAdmin: true,
      },
      {
        id: '8aa6b936-9a98-41d7-9752-0fef6ca7b51a',
        firstName: 'Bas',
        lastName: 'Veenhoven',
        displayName: 'Bas V.',
        email: 'bas_veenhoven@hotmail.com',
      },
      {
        id: '8c8b138f-5395-4d92-a1a3-473d15507a20',
        firstName: 'Wasilja',
        lastName: 'Peterse',
        displayName: 'Wasilja P.',
        email: 'wasilja_18@hotmail.com',
      },
      {
        id: '8fdb6f91-1894-46cd-89e7-4484f5b4d66c',
        firstName: 'Bart',
        lastName: 'Vriens',
        displayName: 'Bart V.',
        email: 'bart_vriens@live.nl',
      },
      {
        id: 'bdd045f2-5fdd-43f0-958c-61ceb332b383',
        firstName: 'Pim',
        lastName: 'Vriens',
        displayName: 'Pim V.',
        email: 'pim_vriens@hotmail.com',
      },
      {
        id: 'db618c52-6159-421d-85c2-89441c768b54',
        firstName: 'Wim',
        lastName: 'van Otterdijk',
        displayName: 'Wim v O.',
        email: 'w.v.otterdijk@gmail.com',
      },
      {
        id: 'e6eb7892-2e2b-4d68-88da-a82a430459ad',
        firstName: 'Jaap',
        lastName: 'Verschuren',
        displayName: 'Jaap V.',
        email: 'jaap_verschuren@hotmail.com',
      },
    ],
  });
}
