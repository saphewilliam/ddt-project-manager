-- AlterEnum
ALTER TYPE "ProjectStatus" ADD VALUE 'COUNTED';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "supervisorId" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the column `amount` on the `StatsOnProject` table. All the data in the column will be lost.
  - Added the required column `value` to the `StatsOnProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StatsOnProject" DROP COLUMN "amount",
ADD COLUMN     "value" TEXT NOT NULL;
