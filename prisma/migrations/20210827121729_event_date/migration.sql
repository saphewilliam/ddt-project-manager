/*
  Warnings:

  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Subtheme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subtheme" ADD COLUMN     "order" INTEGER NOT NULL;
