/*
  Warnings:

  - You are about to drop the `AttributesOnProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StonesOnProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttributesOnProject" DROP CONSTRAINT "AttributesOnProject_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "AttributesOnProject" DROP CONSTRAINT "AttributesOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "AttributesOnProject" DROP CONSTRAINT "AttributesOnProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "StonesOnProject" DROP CONSTRAINT "StonesOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "StonesOnProject" DROP CONSTRAINT "StonesOnProject_stoneId_fkey";

-- DropForeignKey
ALTER TABLE "StonesOnProject" DROP CONSTRAINT "StonesOnProject_userId_fkey";

-- DropTable
DROP TABLE "AttributesOnProject";

-- DropTable
DROP TABLE "StonesOnProject";

-- CreateTable
CREATE TABLE "StonesOnProjectPart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "stoneId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectPartId" TEXT NOT NULL,

    CONSTRAINT "StonesOnProjectPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributesOnProjectPart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectPartId" TEXT NOT NULL,

    CONSTRAINT "AttributesOnProjectPart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StonesOnProjectPart" ADD CONSTRAINT "StonesOnProjectPart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProjectPart" ADD CONSTRAINT "StonesOnProjectPart_projectPartId_fkey" FOREIGN KEY ("projectPartId") REFERENCES "ProjectPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProjectPart" ADD CONSTRAINT "StonesOnProjectPart_stoneId_fkey" FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProjectPart" ADD CONSTRAINT "AttributesOnProjectPart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProjectPart" ADD CONSTRAINT "AttributesOnProjectPart_projectPartId_fkey" FOREIGN KEY ("projectPartId") REFERENCES "ProjectPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProjectPart" ADD CONSTRAINT "AttributesOnProjectPart_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
