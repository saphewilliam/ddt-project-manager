-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_subthemeId_fkey";

-- DropForeignKey
ALTER TABLE "Subtheme" DROP CONSTRAINT "Subtheme_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Subtheme" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("subthemeId") REFERENCES "Subtheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
