-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey1";

-- AddForeignKey
ALTER TABLE "Member" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
