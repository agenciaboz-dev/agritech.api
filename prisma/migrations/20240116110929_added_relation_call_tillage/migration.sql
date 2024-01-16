/*
  Warnings:

  - A unique constraint covering the columns `[callId]` on the table `Tillage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Tillage` ADD COLUMN `callId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tillage_callId_key` ON `Tillage`(`callId`);

-- AddForeignKey
ALTER TABLE `Tillage` ADD CONSTRAINT `Tillage_callId_fkey` FOREIGN KEY (`callId`) REFERENCES `Call`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
