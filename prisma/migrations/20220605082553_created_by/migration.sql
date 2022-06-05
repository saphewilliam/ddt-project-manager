-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdById" TEXT;

-- AlterTable
ALTER TABLE "ProjectHistory" ALTER COLUMN "oldValue" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
