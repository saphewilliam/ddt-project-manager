/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import seedAttributes from './Attribute/seed';
// import seedAttributeInventory from './AttributeInventory/seed';
// import seedAttributesOnProjects from './AttributesOnProjectPart/seed';
// import seedEvents from './Event/seed';
// import seedMembers from './Member/seed';
// import seedProjects from './Project/seed';
// import seedProjectParts from './ProjectPart/seed';
// import seedSessions from './Session/seed';
// import seedStones from './Stone/seed';
// import seedStoneInventory from './StoneInventory/seed';
// import seedStonesOnProjects from './StonesOnProjectPart/seed';
// import seedStonesOnSubthemes from './StonesOnSubtheme/seed';
// import seedStoneTypes from './StoneType/seed';
// import seedSubthemes from './Subtheme/seed';
import seedTeams from './Team/seed';
// import seedUsers from './User/seed';

const prisma = new PrismaClient();

async function seed(prisma: PrismaClient): Promise<void> {
  console.log('Seeding Teams...');
  await seedTeams(prisma);

  // console.log('Seeding Users...');
  // await seedUsers(prisma);

  // console.log('Seeding Sessions...');
  // await seedSessions(prisma);

  // console.log('Seeding Members...');
  // await seedMembers(prisma);

  console.log('Seeding Attributes...');
  await seedAttributes(prisma);

  // console.log('Seeding Attribute Inventory...');
  // await seedAttributeInventory(prisma);

  // console.log('Seeding StoneTypes...');
  // await seedStoneTypes(prisma);

  // console.log('Seeding Stones...');
  // await seedStones(prisma);

  // console.log('Seeding Stone Inventory...');
  // await seedStoneInventory(prisma);

  // console.log('Seeding Events...');
  // await seedEvents(prisma);

  // console.log('Seeding Subthemes...');
  // await seedSubthemes(prisma);

  // console.log('Seeding Stones on Subthemes...');
  // await seedStonesOnSubthemes(prisma);

  // console.log('Seeding Projects...');
  // await seedProjects(prisma);

  // console.log('Seeding Project Parts...');
  // await seedProjectParts(prisma);

  // console.log('Seeding Stones on Projects...');
  // await seedStonesOnProjects(prisma);

  // console.log('Seeding Attributes on Projects...');
  // await seedAttributesOnProjects(prisma);
}

seed(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
