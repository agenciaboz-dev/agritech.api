/*
  Warnings:

  - You are about to drop the column `stage` on the `call` table. All the data in the column will be lost.
  - You are about to drop the column `callId` on the `stage` table. All the data in the column will be lost.
  - Added the required column `reportId` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stage` DROP FOREIGN KEY `Stage_callId_fkey`;

-- AlterTable
ALTER TABLE `call` DROP COLUMN `stage`;

-- AlterTable
ALTER TABLE `report` ADD COLUMN `stage` ENUM('STAGE0', 'STAGE1', 'STAGE2', 'STAGE3', 'STAGE4') NOT NULL DEFAULT 'STAGE0';

-- AlterTable
ALTER TABLE `stage` DROP COLUMN `callId`,
    ADD COLUMN `reportId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
