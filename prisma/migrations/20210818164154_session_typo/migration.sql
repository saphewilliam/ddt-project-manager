/*
  Warnings:

  - You are about to drop the column `isPermanant` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "isPermanant",
ADD COLUMN     "isPermanent" BOOLEAN NOT NULL DEFAULT false;
