/*
  Warnings:

  - You are about to drop the column `code` on the `Stone` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Stone` table. All the data in the column will be lost.
  - Added the required column `alias` to the `Stone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hex` to the `Stone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stone" DROP COLUMN "code",
DROP COLUMN "color",
ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "alias2" TEXT,
ADD COLUMN     "hex" TEXT NOT NULL,
ADD COLUMN     "hex2" TEXT;
