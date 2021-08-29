/*
  Warnings:

  - Added the required column `teamId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subNumber` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('CANCELLED', 'STARTING', 'PLANNING', 'PLANNED', 'BUILDING', 'BUILT');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('FIELD_L1', 'FIELD_L2', 'FIELD_CROSS_L2', 'FIELD_FLAT', 'FIELD_CIRCLE', 'WALL_X', 'WALL_S', 'WALL_T', 'WALL_SPEED', 'WALL_CUBE', 'WALL_OCTO', 'FALLWALL', 'SPIRAL', 'STRUCTURE', 'HANDSET', 'DECOR', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL,
ADD COLUMN     "subNumber" INTEGER NOT NULL,
ADD COLUMN     "supervisorId" TEXT NOT NULL,
ADD COLUMN     "type" "ProjectType" NOT NULL;

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoneList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "colorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttributeToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToProject_AB_unique" ON "_AttributeToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToProject_B_index" ON "_AttributeToProject"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("subthemeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneList" ADD FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneList" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeList" ADD FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeList" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProject" ADD FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
