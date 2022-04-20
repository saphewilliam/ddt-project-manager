/*
  Warnings:

  - You are about to drop the `AttributeList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoneList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttributeList" DROP CONSTRAINT "AttributeList_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "AttributeList" DROP CONSTRAINT "AttributeList_userId_fkey";

-- DropForeignKey
ALTER TABLE "StoneList" DROP CONSTRAINT "StoneList_stoneId_fkey";

-- DropForeignKey
ALTER TABLE "StoneList" DROP CONSTRAINT "StoneList_userId_fkey";

-- DropTable
DROP TABLE "AttributeList";

-- DropTable
DROP TABLE "StoneList";

-- CreateTable
CREATE TABLE "StoneInventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "stoneId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StoneInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeInventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AttributeInventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoneInventory" ADD CONSTRAINT "StoneInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneInventory" ADD CONSTRAINT "StoneInventory_stoneId_fkey" FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeInventory" ADD CONSTRAINT "AttributeInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeInventory" ADD CONSTRAINT "AttributeInventory_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
