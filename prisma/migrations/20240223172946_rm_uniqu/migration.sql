/*
  Warnings:

  - Added the required column `tillageId` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Gallery` ADD COLUMN `tillageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
