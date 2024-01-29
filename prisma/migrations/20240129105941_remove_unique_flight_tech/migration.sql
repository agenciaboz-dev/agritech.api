/*
  Warnings:

  - Added the required column `techReportId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Flight` ADD COLUMN `techReportId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_techReportId_fkey` FOREIGN KEY (`techReportId`) REFERENCES `TechReport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
