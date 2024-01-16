/*
  Warnings:

  - You are about to drop the column `callId` on the `Tillage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tillageId]` on the table `Call` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Tillage` DROP FOREIGN KEY `Tillage_callId_fkey`;

-- AlterTable
ALTER TABLE `Call` ADD COLUMN `tillageId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tillage` DROP COLUMN `callId`;

-- CreateIndex
CREATE UNIQUE INDEX `Call_tillageId_key` ON `Call`(`tillageId`);

-- AddForeignKey
ALTER TABLE `Call` ADD CONSTRAINT `Call_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
