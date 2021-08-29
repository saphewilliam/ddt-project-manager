/*
  Warnings:

  - You are about to drop the column `colorId` on the `StoneList` table. All the data in the column will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttributeToProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stoneId` to the `StoneList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ProjectType" ADD VALUE 'FIELD_M50';

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_teamId_fkey";

-- DropForeignKey
ALTER TABLE "StoneList" DROP CONSTRAINT "StoneList_colorId_fkey";

-- DropForeignKey
ALTER TABLE "_AttributeToProject" DROP CONSTRAINT "_AttributeToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttributeToProject" DROP CONSTRAINT "_AttributeToProject_B_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "supervisorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StoneList" DROP COLUMN "colorId",
ADD COLUMN     "stoneId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "_AttributeToProject";

-- CreateTable
CREATE TABLE "StoneType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stone" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stoneTypeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StonesOnProject" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "stoneId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributesOnProject" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneType" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stone" ADD FOREIGN KEY ("stoneTypeId") REFERENCES "StoneType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneList" ADD FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProject" ADD FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProject" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProject" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProject" ADD FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProject" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProject" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
