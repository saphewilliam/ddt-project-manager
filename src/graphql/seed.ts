/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import seedAttributes from './Attribute/seed';
import seedAttributeLists from './AttributeList/seed';
import seedEvents from './Event/seed';
import seedMembers from './Member/seed';
import seedProjects from './Project/seed';
import seedSessions from './Session/seed';
import seedStones from './Stone/seed';
import seedStoneLists from './StoneList/seed';
import seedStonesOnProjects from './StonesOnProject/seed';
import seedStonesOnSubthemes from './StonesOnSubtheme/seed';
import seedStoneTypes from './StoneType/seed';
import seedSubthemes from './Subtheme/seed';
import seedTeams from './Team/seed';
import seedUsers from './User/seed';

const prisma = new PrismaClient();

async function seed(prisma: PrismaClient): Promise<void> {
  console.log('Seeding Teams...');
  await seedTeams(prisma);

  console.log('Seeding Users...');
  await seedUsers(prisma);

  console.log('Seeding Sessions...');
  await seedSessions(prisma);

  console.log('Seeding Members...');
  await seedMembers(prisma);

  console.log('Seeding Attributes...');
  await seedAttributes(prisma);

  console.log('Seeding AttributeLists...');
  await seedAttributeLists(prisma);

  console.log('Seeding StoneTypes...');
  await seedStoneTypes(prisma);

  console.log('Seeding Stones...');
  await seedStones(prisma);

  console.log('Seeding StoneLists...');
  await seedStoneLists(prisma);

  console.log('Seeding Events...');
  await seedEvents(prisma);

  console.log('Seeding Subthemes...');
  await seedSubthemes(prisma);

  console.log('Seeding Stones on Subthemes...');
  await seedStonesOnSubthemes(prisma);

  console.log('Seeding Projects...');
  await seedProjects(prisma);

  console.log('Seeindg Stones on Projects...');
  await seedStonesOnProjects(prisma);
}

seed(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
