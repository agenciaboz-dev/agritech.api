/*
  Warnings:

  - Made the column `producerId` on table `Tillage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Tillage` DROP FOREIGN KEY `Tillage_producerId_fkey`;

-- AlterTable
ALTER TABLE `Tillage` MODIFY `producerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tillage` ADD CONSTRAINT `Tillage_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `Producer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
