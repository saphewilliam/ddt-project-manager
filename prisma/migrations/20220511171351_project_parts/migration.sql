/*
  Warnings:

  - You are about to drop the column `subNumber` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttributesOnProject" DROP CONSTRAINT "AttributesOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "StonesOnProject" DROP CONSTRAINT "StonesOnProject_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "subNumber",
DROP COLUMN "type",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StoneType" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ProjectPart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "number" INTEGER NOT NULL,
    "type" "ProjectType" NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoneInventoryHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "stoneId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StoneInventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeInventoryHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AttributeInventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPart_slug_key" ON "ProjectPart"("slug");

-- AddForeignKey
ALTER TABLE "ProjectPart" ADD CONSTRAINT "ProjectPart_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StonesOnProject" ADD CONSTRAINT "StonesOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneInventoryHistory" ADD CONSTRAINT "StoneInventoryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoneInventoryHistory" ADD CONSTRAINT "StoneInventoryHistory_stoneId_fkey" FOREIGN KEY ("stoneId") REFERENCES "Stone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProject" ADD CONSTRAINT "AttributesOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeInventoryHistory" ADD CONSTRAINT "AttributeInventoryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeInventoryHistory" ADD CONSTRAINT "AttributeInventoryHistory_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
