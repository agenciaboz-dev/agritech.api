/*
  Warnings:

  - You are about to alter the column `salary` on the `Professional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Professional` MODIFY `salary` DOUBLE NULL;
