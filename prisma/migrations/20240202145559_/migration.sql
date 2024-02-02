/*
  Warnings:

  - You are about to drop the column `callId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_callId_fkey`;

-- AlterTable
ALTER TABLE `Call` ADD COLUMN `reportId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Report` DROP COLUMN `callId`;

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
