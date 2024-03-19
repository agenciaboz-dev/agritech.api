/*
  Warnings:

  - You are about to alter the column `total` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `removed` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `applied` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `returned` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to drop the column `unit` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `dosage` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Material` MODIFY `total` VARCHAR(191) NOT NULL,
    MODIFY `removed` VARCHAR(191) NOT NULL,
    MODIFY `applied` VARCHAR(191) NOT NULL,
    MODIFY `returned` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `unit`,
    MODIFY `dosage` VARCHAR(191) NOT NULL;
