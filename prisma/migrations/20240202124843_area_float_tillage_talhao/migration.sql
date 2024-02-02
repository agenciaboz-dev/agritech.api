/*
  Warnings:

  - You are about to alter the column `area` on the `Talhao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `area` on the `Tillage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Talhao` MODIFY `area` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Tillage` MODIFY `area` DOUBLE NOT NULL;
