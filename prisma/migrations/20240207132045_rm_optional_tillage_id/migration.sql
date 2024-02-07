/*
  Warnings:

  - Made the column `tillageId` on table `Talhao` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Talhao` DROP FOREIGN KEY `Talhao_tillageId_fkey`;

-- AlterTable
ALTER TABLE `Talhao` MODIFY `tillageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Talhao` ADD CONSTRAINT `Talhao_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
