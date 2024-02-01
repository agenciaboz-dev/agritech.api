/*
  Warnings:

  - Made the column `finish` on table `Stage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Stage` MODIFY `finish` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TechReport` MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `init` VARCHAR(191) NOT NULL,
    MODIFY `finish` VARCHAR(191) NOT NULL;
