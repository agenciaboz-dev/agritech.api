/*
  Warnings:

  - Added the required column `tillageId` to the `Talhao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Talhao` ADD COLUMN `tillageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Talhao` ADD CONSTRAINT `Talhao_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
