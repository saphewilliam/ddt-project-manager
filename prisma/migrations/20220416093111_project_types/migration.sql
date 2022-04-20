-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProjectType" ADD VALUE 'FIELD_CROSS_L1';
ALTER TYPE "ProjectType" ADD VALUE 'FIELD_CROSS_M50';
