/*
  Warnings:

  - Added the required column `tillageId` to the `Coordinate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Coordinate` ADD COLUMN `tillageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Coordinate` ADD CONSTRAINT `Coordinate_tillageId_fkey` FOREIGN KEY (`tillageId`) REFERENCES `Tillage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
