/*
  Warnings:

  - You are about to drop the column `isPermanent` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "isPermanent",
ADD COLUMN     "expiresAt" TIMESTAMP(3);
