/*
  Warnings:

  - You are about to alter the column `removed` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `applied` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `returned` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Material` MODIFY `talhao` VARCHAR(191) NOT NULL,
    MODIFY `product` VARCHAR(191) NOT NULL,
    MODIFY `removed` DOUBLE NOT NULL,
    MODIFY `applied` DOUBLE NOT NULL,
    MODIFY `returned` DOUBLE NOT NULL;
