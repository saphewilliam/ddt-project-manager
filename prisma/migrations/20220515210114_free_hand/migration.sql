/*
  Warnings:

  - The values [HANDSET] on the enum `ProjectType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectType_new" AS ENUM ('FIELD_L1', 'FIELD_L2', 'FIELD_M50', 'FIELD_FLAT', 'FIELD_CROSS_L1', 'FIELD_CROSS_L2', 'FIELD_CROSS_M50', 'FIELD_CIRCLE', 'WALL_X', 'WALL_S', 'WALL_T', 'WALL_SPEED', 'WALL_CUBE', 'WALL_OCTO', 'FALLWALL', 'SPIRAL', 'STRUCTURE', 'FREE_HAND', 'DECOR', 'OTHER');
ALTER TABLE "ProjectPart" ALTER COLUMN "type" TYPE "ProjectType_new" USING ("type"::text::"ProjectType_new");
ALTER TYPE "ProjectType" RENAME TO "ProjectType_old";
ALTER TYPE "ProjectType_new" RENAME TO "ProjectType";
DROP TYPE "ProjectType_old";
COMMIT;
