/*
  Warnings:

  - You are about to drop the column `commments` on the `Tillage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tillage` DROP COLUMN `commments`,
    ADD COLUMN `comments` VARCHAR(191) NULL;
