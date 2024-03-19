/*
  Warnings:

  - You are about to alter the column `dosage` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Material` MODIFY `dosage` VARCHAR(191) NOT NULL;
