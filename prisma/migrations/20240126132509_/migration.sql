/*
  Warnings:

  - You are about to alter the column `areaMap` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Operation` MODIFY `areaMap` INTEGER NOT NULL;
