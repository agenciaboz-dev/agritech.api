/*
  Warnings:

  - You are about to drop the column `reportId` on the `Call` table. All the data in the column will be lost.
  - Added the required column `callId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Call` DROP FOREIGN KEY `Call_reportId_fkey`;

-- AlterTable
ALTER TABLE `Call` DROP COLUMN `reportId`;

-- AlterTable
ALTER TABLE `Object` MODIFY `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `Report` ADD COLUMN `callId` INTEGER NOT NULL,
    ADD COLUMN `close` VARCHAR(191) NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `Call`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
