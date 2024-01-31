/*
  Warnings:

  - Made the column `date` on table `Stage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `Stage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `finish` on table `Stage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Call` MODIFY `open` VARCHAR(191) NULL DEFAULT '',
    MODIFY `finish` VARCHAR(191) NULL DEFAULT '',
    MODIFY `init` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Stage` MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `start` VARCHAR(191) NOT NULL,
    MODIFY `finish` VARCHAR(191) NOT NULL;
