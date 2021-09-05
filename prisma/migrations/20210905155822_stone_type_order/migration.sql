/*
  Warnings:

  - Added the required column `order` to the `StoneType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoneType" ADD COLUMN     "order" INTEGER NOT NULL;
