/*
  Warnings:

  - You are about to alter the column `stage` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `Report` MODIFY `stage` INTEGER NOT NULL DEFAULT 0;
