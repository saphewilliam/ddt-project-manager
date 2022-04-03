/*
  Warnings:

  - Added the required column `namePlural` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "namePlural" TEXT NOT NULL;
